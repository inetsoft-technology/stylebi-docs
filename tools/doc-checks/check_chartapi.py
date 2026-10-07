"""Chart API check: every chartAPI reference page title should name a real
class (and method/constant) in the product's inetsoft.graph source.

Page titles look like 'AxisSpec.setFontFrame(frame)', 'GShape.ImageShape',
or 'Chart.CHART_CANDLE'. A member counts as present if it is declared on the
named class or on any of its superclasses/interfaces.
"""
import os
import re

from common import CheckResult, Finding, iter_adoc, page_title, read_text, strip_java_comments

GRAPH_SRC = os.path.join("core", "src", "main", "java", "inetsoft", "graph")

CLASS_RE = re.compile(
    r"\b(class|interface|enum)\s+(\w+)(?:\s*<[^{]*?>)?\s*"
    r"(?:extends\s+([\w.<>,\s]+?))?\s*(?:implements\s+([\w.<>,\s]+?))?\s*\{")
PUBLIC_METHOD_RE = re.compile(
    r"\bpublic\s+(?:(?:static|final|synchronized|abstract|default|native)\s+)*"
    r"(?:<[^>]+>\s*)?[\w.<>\[\],?\s]+?\s+(\w+)\s*\(")
INTERFACE_METHOD_RE = re.compile(
    r"^\s+(?:(?:public|default|static|abstract)\s+)*(?:<[^>]+>\s*)?"
    r"[\w.<>\[\],?]+(?:\s*\[\])*\s+(\w+)\s*\([^;{)]*\)\s*(?:throws\s+[\w.,\s]+)?[;{]",
    re.M)
CONSTANT_RE = re.compile(r"\bpublic\s+static\s+final\s+[\w.<>\[\]]+\s+(\w+)\s*=")
CONSTRUCTOR_RE = r"\bpublic\s+{name}\s*\("


def _names(spec):
    return [s.strip().split("<")[0].split(".")[-1] for s in (spec or "").split(",") if s.strip()]


def load_classes(product_root):
    """Map simple class name -> {'sup': set, 'members': set}."""
    classes = {}
    root = os.path.join(product_root, GRAPH_SRC)
    for dirpath, _, files in os.walk(root):
        for name in files:
            if not name.endswith(".java"):
                continue
            src = strip_java_comments(read_text(os.path.join(dirpath, name)))
            for m in CLASS_RE.finditer(src):
                kind, cname = m.group(1), m.group(2)
                c = classes.setdefault(cname, {"sup": set(), "members": set()})
                c["sup"].update(_names(m.group(3)) + _names(m.group(4)))
                # Members are collected per file; nested classes share their
                # file's members, which can only hide (not invent) findings.
                c["members"].update(PUBLIC_METHOD_RE.findall(src))
                c["members"].update(CONSTANT_RE.findall(src))
                if kind == "interface":
                    c["members"].update(INTERFACE_METHOD_RE.findall(src))
                if re.search(CONSTRUCTOR_RE.format(name=re.escape(cname)), src):
                    c["members"].add(cname)
    return classes


def all_members(classes, name, seen=None):
    seen = seen if seen is not None else set()
    if name in seen or name not in classes:
        return set()
    seen.add(name)
    out = set(classes[name]["members"])
    for parent in classes[name]["sup"]:
        out |= all_members(classes, parent, seen)
    return out


TITLE_RE = re.compile(r"^(?:[A-Z]\w*\.)?([A-Z]\w*)(?:\.(\w+))?\s*(\([^)]*\))?(?:\[\w+\])?\s*$")


def run(docs_root, product_root):
    result = CheckResult("chartapi", "Chart API names vs. product chart classes (inetsoft.graph)")
    classes = load_classes(product_root)
    if not classes:
        result.notes.append("No product chart classes found; check skipped.")
        return result
    result.notes.append(f"{len(classes)} product classes loaded.")
    concept = 0
    for rel, text in iter_adoc(docs_root, "chartAPI"):
        if "/pages/" not in rel:
            continue
        title = page_title(text)
        if not title:
            continue
        m = TITLE_RE.match(title)
        if not m:
            concept += 1          # tutorial/concept pages, e.g. "Chart Annotation"
            continue
        cls, member = m.group(1), m.group(2)
        page = os.path.basename(rel)
        if cls not in classes:
            result.findings.append(Finding("chartapi", page, rel,
                f"`{title}`: class `{cls}` is not in the product", "class not found"))
        elif member and member not in all_members(classes, cls):
            result.findings.append(Finding("chartapi", page, rel,
                f"`{title}`: `{member}` is not on `{cls}` or its parent classes", "member not found"))
        else:
            result.checked += 1
    result.notes.append(f"{concept} concept/tutorial pages skipped (titles are not API names).")
    return result
