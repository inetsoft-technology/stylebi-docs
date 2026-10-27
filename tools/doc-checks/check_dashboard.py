"""Dashboard Scripting check (name level).

Verifies that the names documented on dashboardscript reference pages, and the
component properties used in script examples anywhere in the docs (for
example `Chart1.tooltipVisible`), are names the product exposes to scripts.

Names are compared exactly (case-sensitive), because the product's script
property maps are case-sensitive: `Chart1.toolTipVisible` silently does
nothing when the property is `tooltipVisible`.

This is a name-level check: it confirms the name exists in the product's
scripting layer, not that it is available on that particular component. The
product registers names in several ways, and all of them are collected:
- addProperty("x", ...), addFunctionProperty(..., "x", ...) and similar calls
- globalscope.put("x", ...) / put("x", ...) / putMember("x", ...) for global functions and objects
- string constants (static final String X = "x")
- public methods, and JavaBean properties (getX/isX/setX -> x) of the
  scripting classes and of the viewsheet model/descriptor classes
"""
import os
import re

from common import CheckResult, Finding, iter_adoc, page_title, read_text, strip_java_comments

SOURCE_DIRS = [
    os.path.join("core", "src", "main", "java", "inetsoft", "report", "script"),
    os.path.join("core", "src", "main", "java", "inetsoft", "util", "script"),
    os.path.join("core", "src", "main", "java", "inetsoft", "uql", "viewsheet"),
]
REGISTER_CALL_RE = re.compile(r"\b(?:add(?:Property|FunctionProperty|Function|Functions|Properties)\w*|put\w*)\(([^;]{0,300})")
STRING_LITERAL_RE = re.compile(r'"([A-Za-z_]\w*)"')
EQUALS_RE = re.compile(r'"([A-Za-z_]\w*)"\s*\.\s*equals(?:IgnoreCase)?\(|\.equals(?:IgnoreCase)?\(\s*"([A-Za-z_]\w*)"\s*\)')
CONSTANT_RE = re.compile(r'\bstatic\s+final\s+String\s+\w+\s*=\s*"([A-Za-z_]\w*)"')
FILE_EXTENSIONS = {"js", "png", "jpg", "jpeg", "gif", "svg", "otf", "ttf", "adoc", "html", "css",
                   "csv", "xls", "xlsx", "zip", "pdf", "json", "xml", "txt"}
PUBLIC_METHOD_RE = re.compile(r"\bpublic\s+(?:(?:static|final|synchronized|abstract)\s+)*[\w.<>\[\],?\s]+?\s+(\w+)\s*\(")
BEAN_RE = re.compile(r"^(?:get|is|set)([A-Z]\w*)$")

TITLE_RE = re.compile(r"^(?:[\w\[\]'\"]+\.)*([A-Za-z_]\w*)\s*(\(.*\))?\s*$")
# Component instances in examples: Chart1.x, TableView1.x, SelectionList2.x, ...
USAGE_RE = re.compile(r"\b((?:[A-Z][A-Za-z]*?)\d+)\.([A-Za-z_]\w*)\b")
CODE_BLOCK_RE = re.compile(r"^\[source[^\]]*\]\n(?:----\n(.*?)\n----|((?:[^\n]+\n?)+))", re.M | re.S)


def load_names(product_root):
    names = set()
    found = False
    for rel in SOURCE_DIRS:
        root = os.path.join(product_root, rel)
        if not os.path.isdir(root):
            continue
        found = True
        for dirpath, _, files in os.walk(root):
            for f in files:
                if not f.endswith(".java"):
                    continue
                src = strip_java_comments(read_text(os.path.join(dirpath, f)))
                for m in REGISTER_CALL_RE.finditer(src):
                    names.update(STRING_LITERAL_RE.findall(m.group(1)))
                for a, b in EQUALS_RE.findall(src):
                    names.add(a or b)
                names.update(CONSTANT_RE.findall(src))
                for meth in PUBLIC_METHOD_RE.findall(src):
                    names.add(meth)
                    b = BEAN_RE.match(meth)
                    if b:
                        prop = b.group(1)
                        names.add(prop[0].lower() + prop[1:])
    return names if found else None


def code_blocks(text):
    for m in CODE_BLOCK_RE.finditer(text):
        yield m.group(1) or m.group(2) or ""


def run(docs_root, product_root):
    result = CheckResult("dashboard", "Dashboard Scripting names vs. product scripting layer")
    names = load_names(product_root)
    if names is None:
        result.notes.append("Product scripting source not found; check skipped.")
        return result
    result.notes.append(f"{len(names)} names exposed by the product's scripting layer.")
    overview = 0
    seen = set()
    for rel, text in iter_adoc(docs_root):
        if rel.startswith("dashboardscript/pages/"):
            title = page_title(text) or ""
            m = TITLE_RE.match(title)
            head = title.split("(")[0]
            if not m or " " in head or re.fullmatch(r"[A-Z]\w*", head):
                overview += 1             # component/overview pages, e.g. "Chart"
            elif m.group(1) in names:
                result.checked += 1
            else:
                result.findings.append(Finding("dashboard", f"page:{os.path.basename(rel)}", rel,
                    f"reference page `{title}`: `{m.group(1)}` is not a name the product exposes",
                    "reference page"))
        for block in code_blocks(text):
            # skip include::/image:: macro lines, whose file names look like Name1.js
            block = "\n".join(line for line in block.split("\n") if "::" not in line)
            for obj, prop in USAGE_RE.findall(block):
                if prop in FILE_EXTENSIONS:
                    continue
                key = f"usage:{prop}"
                if prop in names:
                    result.checked += 1
                elif (key, rel) not in seen:
                    seen.add((key, rel))
                    result.findings.append(Finding("dashboard", key, rel,
                        f"example uses `{obj}.{prop}`, but `{prop}` is not a name the product exposes",
                        "property used in an example"))
    result.notes.append(f"{overview} component/overview pages skipped.")
    return result
