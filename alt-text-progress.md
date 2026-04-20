# ALT Text Project — Progress Log

## Project Goal
Add ALT text to all images in the InetSoft User Documentation AsciiDoc files.
Repo root: `C:\src\stylebi-docs\InetSoftUserDocumentation`

---

## Key Reference Files
- **Button lookup**: `C:\src\stylebi-docs\button_lookup.json` — 346 entries mapping `{buttonXxx}` attribute names to plain-text labels (e.g. `buttonNewFolder` → `New Folder`)
- **Style model**: `modules\user\pages\OrganizeDataSources.adoc` — the gold-standard example for ALT text style
- **Button snippets**: `modules\ROOT\partials\buttonSnippets.adoc` — source of button definitions (uses Unicode curly quotes \u2018/\u2019)

## ALT Text Style Rules
- Short, action-focused phrase (4–8 words) from the paragraph immediately preceding the image
- Resolve `{buttonXxx}` via button_lookup.json → plain text label (e.g. "New Folder button")
- Resolve `btn:[Label]` → plain text (e.g. "OK")
- Lowercase, no trailing period
- Examples: `alt="press New Folder button"`, `alt="press More Options and select Edit"`, `alt="create new folder"`

---

## Completed Work

### 1. buttonSnippets.adoc
- File: `modules\ROOT\partials\buttonSnippets.adoc`
- Added `alt="..."` to all 354 button image macros (e.g. `image:ROOT:buttons/creation.svg[alt="Create",role=button]`)
- **Edge cases left for manual fix** (14 lines with no quoted text):
  - Lines 45, 68, 69, 75, 124, 125, 163, 164, 165, 166, 167, 178, 179, 186
  - Line 15: 4 images share `alt="Type"` — may need distinct alt per icon
  - Line 233: uses straight double quotes `"check"` — may want to capitalize

### 2. Data Source Connection Pages (130 files)
- Location: `modules\user\pages\` — all the individual data source connector pages (42Matters.adoc, ActiveCampaign.adoc, MySQL.adoc, etc.)
- Model file: `modules\user\pages\42Matters.adoc`
- Pattern applied to each file:
  - **Setup image** (first image): `alt="{Data Source Name} data source definition screen"`
  - **Success image** (after `{buttonCheckIcon}` line): `alt="connection successful icon"`
  - **Error image** (after `{buttonError}` line): `alt="connection error icon"`
- Note: Some files (e.g. ApacheHive.adoc) only have 2 images — no separate error image

### 3. User Module — Remaining Pages (28 files)
- All files in `modules\user\pages\` and `modules\user\partials\` with missing ALT text
- Used AI agents (4 parallel) to read context and generate ALT text
- **Result: 0 images missing ALT text in the entire user module**
- Files updated included: EditConnection, AddAdditionalConnection, AddVPM*, Configure*, CreateLogicalModel, EditLogicalModel, CreatePhysicalView, EditPhysicalView, CreateVPMCondition, CreateVPMHiddenColumn, CreateNewVPM, BookmarkDashboard, DeployDashboard, ScheduleDashboard, ManageRepository, OpenUserPortal, ProfileDashboard, UseDashboard, ExtendLogicalModel, ExtendPhysicalView, NeedDataModel, TestVPM, and partials

---

## Remaining Work (Not Yet Started)

Run this script to get a current count of missing ALT text by module:

```python
import re
from pathlib import Path

root = Path('C:/src/stylebi-docs/InetSoftUserDocumentation/modules')
by_module = {}

for f in sorted(root.rglob('*.adoc')):
    text = f.read_text(encoding='utf-8')
    count = sum(
        1 for line in text.splitlines()
        if re.match(r'^\s*image:', line) and 'alt=' not in line
    )
    if count:
        module = f.relative_to(root).parts[0]
        by_module[module] = by_module.get(module, 0) + count

for module, count in sorted(by_module.items()):
    print(f'{module}: {count} missing')
```

### Modules to do (as of end of session):
- `viewsheet` — unknown count
- `dataworksheet` — unknown count
- `viewsheetscript` — unknown count
- `commonscript` — unknown count
- `administration` — unknown count
- `chartAPI` — unknown count
- (and any others found by the script above)

---

## How to Continue
1. Run the audit script above to see current missing counts per module
2. Pick a module
3. Run the AI agent approach used for the user module (4 parallel agents, batching files)
4. Verify with: `python3 -c "import re; from pathlib import Path; root=Path('...module path...'); missing=[l for f in root.rglob('*.adoc') for i,l in enumerate(f.read_text(encoding='utf-8').splitlines(),1) if re.match(r'^\s*image:',l) and 'alt=' not in l]; print(len(missing))"`
