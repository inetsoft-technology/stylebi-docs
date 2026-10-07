"""Run the documentation checks and write a Markdown report.

Usage:
  python tools/doc-checks/run.py --docs <docs checkout> --product <stylebi checkout>
         [--docs-branch main] [--label "docs main vs product v1.1.x"] [--out report.md]

<docs checkout> is the folder that contains InetSoftUserDocumentation/.
<stylebi checkout> needs core/src/main/java/inetsoft/graph and community-examples/.

The checks are report-only: the exit code is 0 unless a check crashes.
"""
import argparse
import collections
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import check_calc       # noqa: E402
import check_chartapi   # noqa: E402
import check_examples   # noqa: E402
from common import is_excepted, load_exceptions   # noqa: E402

CHECKS = [check_chartapi, check_calc, check_examples]


def render(results, label, docs_branch, rules):
    lines = [f"# Doc checks: {label}", ""]
    total = 0
    summary = ["| Check | Verified | Findings | Excepted |", "|---|---:|---:|---:|"]
    body = []
    for r in results:
        open_f = [f for f in r.findings if not is_excepted(f, rules, docs_branch)]
        excepted = len(r.findings) - len(open_f)
        total += len(open_f)
        summary.append(f"| {r.title} | {r.checked} | {len(open_f)} | {excepted} |")
        body.append(f"## {r.title}")
        body.extend(f"- {n}" for n in r.notes)
        if not open_f:
            body.append("")
            body.append("No findings.")
        by_cat = collections.defaultdict(list)
        for f in open_f:
            by_cat[f.category or "findings"].append(f)
        for cat, items in sorted(by_cat.items()):
            body.append("")
            body.append(f"**{cat}** ({len(items)})")
            body.append("")
            for f in sorted(items, key=lambda x: (x.where, x.message)):
                body.append(f"- `{f.where}`: {f.message}  _(key: `{f.key}`)_")
        body.append("")
    lines += summary + ["", f"**Open findings: {total}**", ""] + body
    lines += ["---", "To silence a reviewed finding, add `check | branch-or-* | key  # reason` "
              "to `tools/doc-checks/exceptions.txt`."]
    return "\n".join(lines) + "\n", total


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs", required=True)
    ap.add_argument("--product", required=True)
    ap.add_argument("--docs-branch", default="main")
    ap.add_argument("--label", default=None)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()
    label = args.label or f"docs {args.docs_branch}"
    rules = load_exceptions(os.path.join(os.path.dirname(os.path.abspath(__file__)), "exceptions.txt"))
    results = [c.run(args.docs, args.product) for c in CHECKS]
    report, total = render(results, label, args.docs_branch, rules)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(report)
    else:
        sys.stdout.write(report)
    print(f"{label}: {total} open findings", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
