# stylebi-docs

Source for the StyleBI documentation, built with Antora and published to
GitHub Pages (https://inetsoft-technology.github.io/stylebi-docs/).

## Branches

Each docs branch has the same name as the StyleBI product branch it describes.

| Docs branch | Product branch | Docs version | Published? |
|---|---|---|---|
| `main` | `main` (next release, in development) | 2.1.0 | No (build check only) |
| `v2.0.x` | `v2.0.x` | 2.0.1 | Yes (latest) |
| `v1.1.x` | `v1.1.x` | 1.1.0 | Yes |
| `v1.0.x` | `v1.0.x` | 1.0.0 | No (archived) |
| `epic-74519` | `epic-74519` | 2.1.0 | No (build check only) |

Document new features on `main`. Fix things readers already have on each
release branch where the fix is true.

A publish builds every published version using the playbook on the branch
that triggered it, so keep everything under `playbook/` identical on all
branches.

## When the product releases

The product's Help buttons open `InetSoftUserDocumentation/<product version>/index.html`,
so the docs version must match the release on release day.

**Patch release of 2.0 (for example 2.0.2):**

1. On `v2.0.x`, set `version:` in `InetSoftUserDocumentation/antora.yml` to the new number.
2. On every branch, in `playbook/antora-playbook.yml`, point all older patch
   numbers at the new one under `version-alias-extension.js`, for example
   `'2.0.0': '2.0.2'` and `'2.0.1': '2.0.2'`. Their Help buttons then forward to the current docs.

**1.1 patch releases:** no change. The 1.1 product opens `1.1.0` for every 1.1.x release.

**New minor or major release (for example 2.1.0):**

1. Create docs `v2.1.x` from docs `main`, and set its `version:` to the release
   number, without `prerelease`.
2. On every branch, add `v2.1.x` to `branches:` in `playbook/antora-playbook.yml`
   and to the `push` branches in `.github/workflows/publish.yml`.
3. Add the pair to the matrix in `.github/workflows/doc-checks.yml` and the table in `tools/doc-checks/README.md`.
4. On `main`, set `version:` to the next release.
