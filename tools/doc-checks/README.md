# Doc checks

Automated checks that compare the documentation with the StyleBI product
source. They report problems such as API pages that name a method the product
does not have, or examples that use a Data Worksheet that is not in
`examples.zip`.

The checks are **report-only**. They never block publishing. (Broken xrefs,
includes, and images are caught separately, by the Antora build in
`publish.yml`, which does fail.)

## Where to see results

The **Doc checks (report only)** workflow (`.github/workflows/doc-checks.yml`)
runs on every push to `main` that changes the docs, every Monday, and on demand
(Actions tab > Doc checks > Run workflow). Each run checks all four docs
branches. Open the run and read its **Summary** page; each branch's report is
also attached as an artifact.

Each docs branch is compared with its own product branch:

| Docs branch | Product branch (`inetsoft-technology/stylebi`) |
|---|---|
| `main` (1.1) | `v1.1.x` |
| `v1.2` | `main` |
| `v1.0` | `v1.0.x` |
| `epic-74519` | `epic-74519` |

Update this table, and the matrix in `doc-checks.yml`, when branches change
(for example, when 1.2 is released and docs `main` becomes 1.2).

## Checks

| Check | What it verifies |
|---|---|
| `chartapi` | Every Chart API page title (`Class.method(...)`) names a class in the product's `inetsoft.graph` source, and a method or constant on that class or one of its parent classes. |
| `calc` | Every `CALC.<function>` reference page and every `CALC.x(...)` call in the docs names a function in the product's CALC library (`inetsoft.util.script` CalcDateTime, CalcFinancial, CalcLogic, CalcMath, CalcStat, CalcTextData). Also lists, for information, CALC functions that have no reference page. |
| `dashboard` | Every Dashboard Scripting reference page title, and every component property used in an example (`Chart1.tooltipVisible`), is a name the product exposes to scripts (`inetsoft.report.script`, `inetsoft.util.script`, `inetsoft.uql.viewsheet`). Names are compared case-sensitively, because a miscased property silently does nothing. Name-level only: it does not verify that the name applies to that particular component. |
| `examples` | Example Data Worksheets and Dashboards that the docs place in Examples or Sample Queries, `runQuery('ws:global:...')` paths, and `.query = '...'` data block names all exist in the product's `community-examples/examples.zip`. |

## Handling a finding

1. Fix the docs (or report a product problem), **or**
2. If the finding is correct as written (for example, a syntax template or a
   hypothetical name), add a line to `exceptions.txt`:

   ```
   check | docs-branch-or-* | key   # reason
   ```

   The key is printed with each finding in the report.

## Running locally

The checks need only Python 3 (standard library). Point them at a docs
checkout and a product checkout (a sparse checkout of
`core/src/main/java/inetsoft/graph`, `core/src/main/java/inetsoft/report/script`,
`core/src/main/java/inetsoft/uql/viewsheet`, `core/src/main/java/inetsoft/util/script`,
and `community-examples` is enough):

```
python tools/doc-checks/run.py --docs . --product ../stylebi --docs-branch main
```

## Adding a check

Add a `check_<name>.py` module with a `run(docs_root, product_root)` function
that returns a `CheckResult` (see `common.py`), add it to `CHECKS` in `run.py`,
extend the product sparse checkout in `doc-checks.yml` if it needs more source,
and describe it in the table above.
