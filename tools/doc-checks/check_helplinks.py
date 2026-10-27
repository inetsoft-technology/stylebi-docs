"""Help-link check: the product's Help buttons reach the right documentation.

Each Help button in the product opens the docs with `#cshid=<ID>`, and
playbook/antora-router.yml maps each ID to a page (and optionally a section
anchor). This check verifies, in both directions:
- every route points at a page that exists, and at an anchor that exists on
  that page (or in a partial it includes);
- every help ID the product uses has a route.

Product help IDs are collected from web/projects (Portal and Enterprise
Manager): @ContextHelp({link: "X"}) annotations, cshid / helpLink /
helpLinkKey / emHelpLink template attributes, assignments and getters, and
"#cshid=X" URLs. An ID built at run time ('CreatingDataSet' + name) is
checked as a prefix: some route must start with it.

The publish build uses the router file of whichever branch triggered it for
every docs version, so all docs branches should carry the same router. On an
older branch, routes to pages added in later versions are expected (the
build skips them for that version); except them with a `missing-page:*` rule.
"""
import os
import re

from common import CheckResult, Finding, modules_dir, read_text

ROUTER = os.path.join("playbook", "antora-router.yml")
COMPONENT = "InetSoftUserDocumentation"
ROUTE_RE = re.compile(r"^\s+(\w+):\s*(\S+)\s*$")
TARGET_RE = re.compile(r"^" + COMPONENT + r":(\w+):([^#\s]+?\.adoc)(?:#(\S+))?$")

# Anchor forms: [[id]] [[id,label]] [#id] [#id.role] [id=id] [id="id"] anchor:id[]
ANCHOR_RES = [
    re.compile(r"\[\[([A-Za-z_][\w:.-]*)"),
    re.compile(r"\[#([A-Za-z_][\w:-]*)"),
    re.compile(r"\[(?:[^\]\n]*,)?\s*id\s*=\s*\"?([A-Za-z_][\w:-]*)"),
    re.compile(r"\banchor:([A-Za-z_][\w:-]*)\["),
]
INCLUDE_RE = re.compile(r"^include::([^\[\n]+)\[", re.M)
HEADING_RE = re.compile(r"^={2,6}\s+(.+?)\s*$", re.M)

WEB_ROOT = os.path.join("web", "projects")
HELP_NAMES = r"(?:cshid|helpLink|helpLinkKey|emHelpLink)"
# <tag [cshid]="'X' + y"> / helpLink="X"
HTML_ATTR_RE = re.compile(r"(\[)?\b" + HELP_NAMES + r"\]?\s*=\s*\"([^\"]*)\"")
CONTEXT_HELP_RE = re.compile(r"@ContextHelp\s*\(\s*\{([^}]*)\}")
TS_ASSIGN_RE = re.compile(r"\b" + HELP_NAMES + r"\s*(?::\s*string)?\s*[=:]\s*([^;\n]+(?:\n\s*[?:][^;\n]+)*)")
TS_GETTER_RE = re.compile(r"\bget\s+" + HELP_NAMES + r"\s*\(\)\s*(?::\s*string)?\s*\{")
CSHID_URL_RE = re.compile(r"#cshid=([A-Za-z]\w*)")
LITERAL_RE = re.compile(r"[\"']([A-Za-z]\w*)[\"']\s*(\+)?")
LINK_PROP_RE = re.compile(r"\blink\s*:\s*[\"']([A-Za-z]\w*)[\"']")
DEFAULT_IDS = {"EM"}      # added by HelpController for EM pages with no @ContextHelp


def load_routes(docs_root):
    path = os.path.join(docs_root, ROUTER)
    if not os.path.exists(path):
        return None
    routes = {}
    in_routes = False
    for line in read_text(path).split("\n"):
        if line.startswith("routes:"):
            in_routes = True
            continue
        if in_routes:
            m = ROUTE_RE.match(line)
            if m:
                routes[m.group(1)] = m.group(2)
    return routes


def auto_id(title):
    """Asciidoctor's default section id: _lower_case_words."""
    title = re.sub(r"<[^>]+>|[{}`*_]", "", title).lower()
    return "_" + re.sub(r"[^\w]+", "_", title).strip("_")


class AnchorIndex:
    """Anchors defined in a page, following includes."""

    def __init__(self, docs_root):
        self.base = modules_dir(docs_root)
        self.cache = {}

    def resolve(self, target, module, current_dir):
        if "$" in target:
            spec, rel = target.split("$", 1)
            parts = spec.split(":")
            family = parts[-1]
            mod = parts[-2] if len(parts) > 1 else module
            folder = {"partial": "partials", "page": "pages", "example": "examples"}.get(family)
            if not folder:
                return None, None
            return os.path.join(self.base, mod, folder, rel), mod
        return os.path.normpath(os.path.join(current_dir, target)), module

    def anchors(self, path, module, depth=0):
        if path in self.cache:
            return self.cache[path]
        ids = set()
        self.cache[path] = ids
        if depth > 10 or not os.path.exists(path):
            return ids
        text = read_text(path)
        for rx in ANCHOR_RES:
            ids.update(rx.findall(text))
        ids.update(auto_id(t) for t in HEADING_RE.findall(text))
        for target in INCLUDE_RE.findall(text):
            if "{" in target:
                continue
            inc, mod = self.resolve(target.strip(), module, os.path.dirname(path))
            if inc:
                ids |= self.anchors(inc, mod, depth + 1)
        return ids


def literals(expr):
    """(id, is_prefix) for each string literal in a TS/template expression."""
    return [(m.group(1), bool(m.group(2))) for m in LITERAL_RE.finditer(expr)]


def getter_body(src, start):
    depth, i = 1, start
    while i < len(src) and depth:
        depth += {"{": 1, "}": -1}.get(src[i], 0)
        i += 1
    return src[start:i]


def load_product_ids(product_root):
    """Map help id -> (first file using it, is_prefix)."""
    root = os.path.join(product_root, WEB_ROOT)
    if not os.path.isdir(root):
        return None
    ids = {i: ("(HelpController default)", False) for i in DEFAULT_IDS}

    def add(found, rel):
        for name, prefix in found:
            ids.setdefault(name, (rel, prefix))

    for dirpath, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in ("node_modules", "mocks", "testing")]
        for f in files:
            if ".spec." in f or "test-helpers" in f or not f.endswith((".ts", ".html")):
                continue
            full = os.path.join(dirpath, f)
            rel = os.path.relpath(full, product_root).replace(os.sep, "/")
            src = read_text(full)
            if f.endswith(".html"):
                for bound, value in HTML_ATTR_RE.findall(src):
                    if bound:
                        add(literals(value), rel)
                    elif re.fullmatch(r"[A-Za-z]\w*", value):
                        add([(value, False)], rel)
                continue
            for body in CONTEXT_HELP_RE.findall(src):
                add([(n, False) for n in LINK_PROP_RE.findall(body)], rel)
            for expr in TS_ASSIGN_RE.findall(src):
                add(literals(expr), rel)
            for m in TS_GETTER_RE.finditer(src):
                body = getter_body(src, m.end())
                for ret in re.findall(r"\breturn\s+([^;]+);", body):
                    add(literals(ret), rel)
            add([(n, False) for n in CSHID_URL_RE.findall(src)], rel)
    return ids


def run(docs_root, product_root):
    result = CheckResult("helplinks", "Product Help buttons vs. help routes (antora-router.yml)")
    routes = load_routes(docs_root)
    if routes is None:
        result.notes.append(f"{ROUTER} not found; check skipped.")
        return result
    result.notes.append(f"{len(routes)} help routes in {ROUTER.replace(os.sep, '/')}.")
    index = AnchorIndex(docs_root)
    base = modules_dir(docs_root)
    router_rel = ROUTER.replace(os.sep, "/")
    for key, target in sorted(routes.items()):
        m = TARGET_RE.match(target)
        if not m:
            result.findings.append(Finding("helplinks", f"route:{key}", router_rel,
                f"route `{key}` has an unrecognized target `{target}`", "route target"))
            continue
        module, page, anchor = m.groups()
        path = os.path.join(base, module, "pages", page)
        if not os.path.exists(path):
            result.findings.append(Finding("helplinks", f"missing-page:{key}", router_rel,
                f"route `{key}` points to `{module}:{page}`, which does not exist", "route target"))
        elif anchor and anchor not in index.anchors(path, module):
            result.findings.append(Finding("helplinks", f"anchor:{key}", router_rel,
                f"route `{key}` points to anchor `#{anchor}`, which is not on `{module}:{page}`",
                "route target"))
        else:
            result.checked += 1

    used = load_product_ids(product_root)
    if used is None:
        result.notes.append("Product web source not found; product help IDs not checked.")
        return result
    result.notes.append(f"{len(used)} help IDs used by the product.")
    for name, (where, prefix) in sorted(used.items()):
        ok = any(k.startswith(name) for k in routes) if prefix else name in routes
        if ok:
            result.checked += 1
        else:
            what = f"help IDs starting with `{name}`" if prefix else f"help ID `{name}`"
            result.findings.append(Finding("helplinks", f"id:{name}", where,
                f"the product uses {what}, but no help route matches", "product help ID"))
    return result
