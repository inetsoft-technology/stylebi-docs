"""CALC check: every CALC.<function> the docs document or call must exist in the
product's CALC library.

The product builds CALC from the public methods declared on six classes in
inetsoft.util.script (CalcDateTime, CalcFinancial, CalcLogic, CalcMath,
CalcStat, CalcTextData); each method is exposed under its lower-case name,
plus the aliases int (integer) and char (character). Lookup is
case-insensitive.
"""
import os
import re

from common import CheckResult, Finding, iter_adoc, page_title, read_text, strip_java_comments

SCRIPT_SRC = os.path.join("core", "src", "main", "java", "inetsoft", "util", "script")
CALC_CLASSES = ["CalcDateTime", "CalcFinancial", "CalcLogic", "CalcMath", "CalcStat", "CalcTextData"]
ALIASES = {"integer": "int", "character": "char"}
PUBLIC_METHOD_RE = re.compile(
    r"\bpublic\s+(?:(?:static|final|synchronized)\s+)*[\w.<>\[\],?\s]+?\s+(\w+)\s*\(")
CALC_TITLE_RE = re.compile(r"^CALC\.(\w+)\s*(\(.*\))?\s*$")
CALC_CALL_RE = re.compile(r"\bCALC\.(\w+)\s*\(")


def load_functions(product_root):
    names = set()
    for cls in CALC_CLASSES:
        path = os.path.join(product_root, SCRIPT_SRC, cls + ".java")
        if not os.path.exists(path):
            return None
        src = strip_java_comments(read_text(path))
        for name in PUBLIC_METHOD_RE.findall(src):
            if name == cls:          # constructor
                continue
            names.add(name.lower())
            if name.lower() in ALIASES:
                names.add(ALIASES[name.lower()])
    return names


def run(docs_root, product_root):
    result = CheckResult("calc", "CALC functions vs. product CALC library")
    functions = load_functions(product_root)
    if functions is None:
        result.notes.append("Product CALC source not found; check skipped.")
        return result
    result.notes.append(f"{len(functions)} CALC functions in the product.")
    documented = set()
    seen = set()
    for rel, text in iter_adoc(docs_root):
        if rel.startswith("commonscript/pages/"):
            title = page_title(text) or ""
            m = CALC_TITLE_RE.match(title)
            if m:
                name = m.group(1).lower()
                documented.add(name)
                if name in functions:
                    result.checked += 1
                else:
                    result.findings.append(Finding("calc", f"page:{os.path.basename(rel)}", rel,
                        f"reference page `{title}`: `{name}` is not a CALC function", "reference page"))
        for name in sorted({n.lower() for n in CALC_CALL_RE.findall(text)}):
            key = f"call:{name}"
            if name in functions:
                result.checked += 1
            elif (key, rel) not in seen:
                seen.add((key, rel))
                result.findings.append(Finding("calc", key, rel,
                    f"calls `CALC.{name}()`, which is not a CALC function", "call in an example"))
    for full, alias in ALIASES.items():          # int/char document integer/character
        if alias in documented:
            documented.add(full)
    undocumented = sorted(functions - documented)
    if undocumented:
        result.notes.append(f"{len(undocumented)} CALC functions have no reference page "
                            f"(coverage gap, informational): " + ", ".join(undocumented))
    return result
