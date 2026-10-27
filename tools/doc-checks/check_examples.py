"""Example-asset check: example Data Worksheets, Dashboards, runQuery() paths,
and .query data block names used in the docs must exist in the product's
community-examples/examples.zip.
"""
import os
import re
import zipfile

from common import CheckResult, Finding, iter_adoc

EXAMPLES_ZIP = os.path.join("community-examples", "examples.zip")

# 'X' Data Worksheet ... menu:Data Worksheet[Examples]  (and Dashboard / Sample Queries)
NAMED_ASSET_RE = re.compile(
    r"[‘'`]+([A-Za-z][\w &-]{0,40}?)[’'`]+\s+(Data Worksheet|Dashboard)\b[^.\n]{0,60}?"
    r"(?:menu:(Data Worksheet|Dashboard)\[(Examples|Sample Queries)\]|‘Examples’ folder|Examples folder)")
RUNQUERY_RE = re.compile(r"runQuery\(\s*['\"]ws:global:([^'\"]+)['\"]")
QUERY_BLOCK_RE = re.compile(r"\b\w+1\.query\s*=\s*['\"]([^'\"]+)['\"]")


def load_examples(product_root):
    """Return {'Data Worksheet': {path,...}, 'Dashboard': {path,...}}, block names."""
    path = os.path.join(product_root, EXAMPLES_ZIP)
    if not os.path.exists(path):
        return None, None
    assets = {"Data Worksheet": set(), "Dashboard": set()}
    blocks = set()
    with zipfile.ZipFile(path) as z:
        for n in z.namelist():
            kind = ("Data Worksheet" if n.startswith("WORKSHEET_")
                    else "Dashboard" if n.startswith("VIEWSHEET_") else None)
            if not kind:
                continue
            parts = [p for p in n.split("^")[4:] if p not in ("_", "__NULL__", "host-org")]
            assets[kind].add("/".join(parts))
            if kind == "Data Worksheet":
                xml = z.read(n).decode("utf-8", "ignore")
                blocks.update(re.findall(r"<assemblyInfo[^>]*>\s*<name><!\[CDATA\[([^\]]+)\]\]>", xml))
    return assets, blocks


def run(docs_root, product_root):
    result = CheckResult("examples", "Example assets named in the docs vs. product examples.zip")
    assets, blocks = load_examples(product_root)
    if assets is None:
        result.notes.append("Product examples.zip not found; check skipped.")
        return result
    result.notes.append(f"examples.zip: {len(assets['Data Worksheet'])} Data Worksheets, "
                        f"{len(assets['Dashboard'])} Dashboards, {len(blocks)} data blocks.")
    seen = set()
    for rel, text in iter_adoc(docs_root):
        for m in NAMED_ASSET_RE.finditer(text):
            name, kind, folder = m.group(1).strip(), m.group(2), m.group(4) or "Examples"
            path = f"{folder}/{name}"
            key = f"{kind}:{path}"
            if path in assets[kind]:
                result.checked += 1
            elif (key, rel) not in seen:
                seen.add((key, rel))
                result.findings.append(Finding("examples", key, rel,
                    f"{kind} `{path}` is not in examples.zip", "named asset"))
        for m in RUNQUERY_RE.finditer(text):
            path = m.group(1)
            key = f"runQuery:{path}"
            if path in assets["Data Worksheet"]:
                result.checked += 1
            elif (key, rel) not in seen:
                seen.add((key, rel))
                result.findings.append(Finding("examples", key, rel,
                    f"runQuery path `ws:global:{path}` is not a Data Worksheet in examples.zip",
                    "runQuery path"))
        for m in QUERY_BLOCK_RE.finditer(text):
            block = m.group(1)
            key = f"query:{block}"
            if block in blocks:
                result.checked += 1
            elif (key, rel) not in seen:
                seen.add((key, rel))
                result.findings.append(Finding("examples", key, rel,
                    f"data block `{block}` (set with .query) is not in any example Data Worksheet",
                    "query block"))
    return result
