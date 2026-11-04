"""AI-readiness check: how well the docs convert into chunks for the AI assistant.

The assistant converts each AsciiDoc page to Markdown (downdoc, with the `ai`
attribute set and partials inlined into every page that includes them), splits
it into chunks by heading, and retrieves chunks by vector search. The model
sees only the retrieved chunks. This check estimates what that conversion
produces and reports patterns that hurt retrieval. It does not need the product
source; the product folder argument is ignored.

The thresholds below come from the assistant developers' description of the
loader (2026-11-03) and may change. Sizes are estimates from the AsciiDoc text
(about 4 characters per token); the real Markdown differs a little.

Findings, by category:
  no H2 (one big chunk)     page has no H2 and is one chunk of over about 1,200 tokens
  large section             an H2 section is over about 1,200 tokens (and has no H3)
  step numbering            a [start=N] does not follow the steps before it
  repeated partial          a large partial is inlined into many pages
  missing AI summary        page has no ifdef::ai[] block
  long AI summary           summary is repeated in every chunk, so keep it short
  ifndef::ai closed wrong   ifndef::ai[] closed with endif::ai[] (downdoc drops the rest)
  include with lines/tag    include the converter cannot resolve
"""
import os
import re

from common import CheckResult, Finding, modules_dir, read_text

# Loader thresholds (bytes of converted text) and warning levels.
SPLIT_BYTES = 3072
SPLIT_BYTES_LARGE = 5120
LARGE_MODULES = {"chartAPI", "commonscript", "viewsheetscript", "serverproperties"}
CHUNK_TOKENS_WARN = 1200
SUMMARY_CHARS_WARN = 1200
REPEAT_PAGES = 50          # a partial included in this many pages ...
REPEAT_BYTES = 1000        # ... and at least this big in the AI build is reported
SKIP_MODULES = {"ROOT"}    # the loader skips ROOT pages and every partial

INCLUDE_RE = re.compile(r"^include::(?:(?P<mod>[\w.-]+):)?partial\$(?P<name>[^\[]+)\[(?P<attrs>[^\]]*)\]\s*$")
ANY_INCLUDE_RE = re.compile(r"^include::[^\[]+\[(?P<attrs>[^\]]*)\]\s*$")
COND_RE = re.compile(r"^(ifdef|ifndef|endif)::([^\[]*)\[\]\s*$")
DELIM_RE = re.compile(r"^(={4,}|-{4,}|\*{4,}|\.{4,}|_{4,}|\+{4,}|/{4,}|`{3,}|\|===)$")
NO_NEST = ("----", "....", "////", "++++")
H2_RE = re.compile(r"^== \S")
H3_RE = re.compile(r"^=== \S")
ITEM_RE = re.compile(r"^\. \S")
START_RE = re.compile(r"^\[start=(\d+)\]\s*$")


def load_partials(modules):
    """{(module, name): text} for every partial."""
    partials = {}
    for mod in sorted(os.listdir(modules)):
        pdir = os.path.join(modules, mod, "partials")
        if not os.path.isdir(pdir):
            continue
        for dirpath, _, files in os.walk(pdir):
            for f in files:
                if f.endswith(".adoc"):
                    full = os.path.join(dirpath, f)
                    name = os.path.relpath(full, pdir).replace(os.sep, "/")
                    partials[(mod, name)] = read_text(full)
    return partials


def expand(text, module, partials, ai, used, depth=0):
    """Inline partials the way the assistant's converter does, for the AI build
    (ai=True) or the human build (ai=False). Partials used are added to `used`."""
    out = []
    skip = 0                      # nesting depth inside a block that is excluded
    for line in text.split("\n"):
        s = line.strip()
        cond = COND_RE.match(s)
        if skip:
            if cond:
                if cond.group(1) in ("ifdef", "ifndef"):
                    skip += 1
                else:
                    skip -= 1
            continue
        if cond:
            kind, name = cond.group(1), cond.group(2)
            # ifdef::ai is kept only in the AI build; ifndef::ai only in the human build.
            if name == "ai" and ((kind == "ifdef" and not ai) or (kind == "ifndef" and ai)):
                skip = 1
            continue                 # conditional marker lines are never part of the text
        m = INCLUDE_RE.match(s)
        if m and not m.group("attrs") and depth < 8:
            name = m.group("name")
            if name == "buttonSnippets.adoc":
                continue             # the converter strips this include
            mod = m.group("mod") or module
            body = partials.get((mod, name))
            if body is not None:
                used.add((mod, name))
                out.append(expand(body, mod, partials, ai, used, depth + 1))
                continue
        out.append(line)
    return "\n".join(out)


def scan_blocks(text):
    """Yield (line, in_block) for each line, tracking delimited blocks."""
    stack = []
    for line in text.split("\n"):
        s = line.rstrip()
        if DELIM_RE.match(s):
            if stack and s == stack[-1]:
                stack.pop()
                yield line, True
                continue
            if not (stack and stack[-1] in NO_NEST):
                stack.append(s)
                yield line, True
                continue
        yield line, bool(stack)


def sections(text):
    """Split into (intro, [(h2 title, body)], has_h3 list) using top-level H2s."""
    intro, secs, cur = [], [], None
    for line, in_block in scan_blocks(text):
        if not in_block and H2_RE.match(line):
            cur = [line[3:].strip(), [line], False]
            secs.append(cur)
            continue
        if cur is None:
            intro.append(line)
        else:
            if not in_block and H3_RE.match(line):
                cur[2] = True
            cur[1].append(line)
    return "\n".join(intro), [(t, "\n".join(b), h3) for t, b, h3 in secs]


def step_findings(text):
    """Check each [start=N] against the numbered steps before it (human build)."""
    problems = []
    prev = 0                     # number of the last numbered step seen
    first_in_section = True
    pending = None
    for line, in_block in scan_blocks(text):
        if in_block:
            continue
        if line.startswith("=") and re.match(r"^={1,6} \S", line):
            first_in_section = True
            pending = None
            continue
        m = START_RE.match(line.strip())
        if m:
            pending = int(m.group(1))
            continue
        if ITEM_RE.match(line):
            if first_in_section:
                if pending is not None:
                    if prev > 0 and pending != prev + 1:
                        problems.append((pending, prev))
                    prev = pending
                else:
                    prev = 1
                first_in_section = False
            else:
                prev += 1
            pending = None
    return problems


def ai_summary(text):
    m = re.search(r"^ifdef::ai\[\]\n(.*?)^endif::ai\[\]", text, re.S | re.M)
    return m.group(1).strip() if m else None


def conditional_problems(text):
    """ifndef::ai[] closed with endif::ai[] (downdoc then drops the rest of the file)."""
    stack = []
    bad = 0
    for line in text.split("\n"):
        m = COND_RE.match(line.strip())
        if not m:
            continue
        kind, name = m.group(1), m.group(2)
        if kind == "endif":
            if stack:
                opened = stack.pop()
                if opened == ("ifndef", "ai") and name == "ai":
                    bad += 1
        else:
            stack.append((kind, name))
    return bad


def run(docs_root, product_root):
    result = CheckResult("ai", "AI-readiness (how the assistant will chunk the docs)")
    modules = modules_dir(docs_root)
    if not os.path.isdir(modules):
        result.notes.append("Docs modules folder not found; check skipped.")
        return result
    partials = load_partials(modules)
    usage = {}                   # partial -> number of pages that pull it into the AI build
    pages = 0
    chunks = 0
    biggest = (0, "")

    def add(key, where, message, category):
        result.findings.append(Finding("ai", key, where, message, category))

    # Whole-file checks that apply to partials too.
    for (mod, name), text in sorted(partials.items()):
        rel = f"{mod}/partials/{name}"
        if conditional_problems(text):
            add(f"ifndef-endif:{rel}", rel,
                "`ifndef::ai[]` is closed with `endif::ai[]`; close it with `endif::[]`",
                "ifndef::ai closed wrong")

    for mod in sorted(os.listdir(modules)):
        if mod in SKIP_MODULES:
            continue
        pdir = os.path.join(modules, mod, "pages")
        if not os.path.isdir(pdir):
            continue
        for dirpath, _, files in os.walk(pdir):
            for f in sorted(files):
                if not f.endswith(".adoc"):
                    continue
                full = os.path.join(dirpath, f)
                rel = os.path.relpath(full, modules).replace(os.sep, "/")
                raw = read_text(full)
                pages += 1

                # Raw-text checks.
                for line in raw.split("\n"):
                    m = ANY_INCLUDE_RE.match(line.strip())
                    if m and re.search(r"\b(lines|tags?)=", m.group("attrs")):
                        add(f"include-attrs:{rel}", rel,
                            f"`{line.strip()}`: the assistant's converter only resolves includes "
                            "with empty brackets, so this one is left unresolved",
                            "include with lines/tag")
                        break
                if conditional_problems(raw):
                    add(f"ifndef-endif:{rel}", rel,
                        "`ifndef::ai[]` is closed with `endif::ai[]`; close it with `endif::[]`",
                        "ifndef::ai closed wrong")
                summary = ai_summary(raw)
                if summary is None:
                    add(f"no-summary:{rel}", rel, "no `ifdef::ai[]` summary block", "missing AI summary")
                elif len(summary) > SUMMARY_CHARS_WARN:
                    add(f"long-summary:{rel}", rel,
                        f"AI summary is {len(summary)} characters and is repeated in every chunk",
                        "long AI summary")

                # Human build: step numbering.
                human = expand(raw, mod, partials, ai=False, used=set())
                for start, prev in step_findings(human):
                    add(f"steps:{rel}:{start}", rel,
                        f"`[start={start}]` follows step {prev}; expected `[start={prev + 1}]`",
                        "step numbering")

                # AI build: chunk sizes.
                used = set()
                ai_text = expand(raw, mod, partials, ai=True, used=used)
                for key in used:
                    usage[key] = usage.get(key, 0) + 1
                intro, secs = sections(ai_text)
                size = len(ai_text.encode("utf-8"))
                threshold = SPLIT_BYTES_LARGE if mod in LARGE_MODULES else SPLIT_BYTES
                if not secs:
                    chunks += 1
                    tokens = size // 4
                    if tokens > biggest[0]:
                        biggest = (tokens, rel)
                    if size >= threshold and tokens > CHUNK_TOKENS_WARN:
                        add(f"no-h2:{rel}", rel,
                            f"about {tokens} tokens ({size // 1024} KB) with no H2, so it is indexed as one chunk",
                            "no H2 (one big chunk)")
                else:
                    split = size >= threshold
                    for title, body, has_h3 in secs:
                        chunks += 1
                        tokens = (len((intro + "\n" + body).encode("utf-8"))) // 4
                        if tokens > biggest[0]:
                            biggest = (tokens, f"{rel} (section '{title}')")
                        if split and tokens > CHUNK_TOKENS_WARN and not has_h3:
                            add(f"large-section:{rel}:{title}", rel,
                                f"section '{title}' is about {tokens} tokens including the page intro",
                                "large section")

    # Large partials pulled into many pages.
    for (mod, name), count in sorted(usage.items(), key=lambda kv: -kv[1]):
        if count < REPEAT_PAGES:
            continue
        if re.search(r"^ifndef::ai\[\]", partials[(mod, name)], re.M):
            continue                 # already hidden from the AI build with a short summary
        body = expand(partials[(mod, name)], mod, partials, ai=True, used=set())
        size = len(body.encode("utf-8"))
        if size >= REPEAT_BYTES:
            add(f"repeated:{mod}/{name}", f"{mod}/partials/{name}",
                f"inlined into {count} pages in the AI build, about {size // 4} tokens each "
                f"(about {count * size // 1024} KB in total). Consider `ifndef::ai[]` with a short "
                "`ifdef::ai[]` summary if the content is indexed once elsewhere",
                "repeated partial")

    result.checked = pages
    result.notes.append(f"{pages} pages checked (ROOT pages and partials are not indexed by the "
                        f"assistant); about {chunks} chunks after splitting by H2.")
    if biggest[0]:
        result.notes.append(f"Largest estimated chunk: about {biggest[0]} tokens ({biggest[1]}).")
    result.notes.append("Thresholds follow the developers' loader description of 2026-11-03 "
                        "(split pages of 3 KB or more by H2; 5 KB for chartAPI, commonscript, "
                        "viewsheetscript, serverproperties).")
    return result
