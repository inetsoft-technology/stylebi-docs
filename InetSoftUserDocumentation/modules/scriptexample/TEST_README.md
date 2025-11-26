# Script Example Test Guide

## Directory Overview

- `assets`: Holds dashboard assets referenced by the automated tests.
- `partials`: Contains the script samples.
- `commons`: Provides the reusable core test code and builds the jar that the execution suites depend on.
- `vsscript`: Hosts the concrete test cases plus any suite-level configuration and runners.

## Test Execution Workflow

1. `.\mvnw.cmd clean`  
   Removes previous build outputs to ensure the next steps run against a fresh workspace.
2. `.\mvnw.cmd package -pl commons`  
   Builds the shared `commons` module and produces the jar consumed by the suites.
3. `.\mvnw.cmd test -pl vsscript`  
   Executes the tests using the freshly built artifacts.

After the test suite finishes, any images exported by the applied scripts and the corresponding script exception details are written to `vsscript/target/test-classes/exportData` for inspection.

Run the commands from the `modules/scriptexample` root so Maven picks up the correct multi-module project configuration.

## Adding a New Case

1. Create a new Spock spec under `vsscript/src/test/groovy/.../cases/` (see `Viewsheet_Spec.groovy` for a template).
2. Call `VSScriptTest.initHome()` inside `setupSpec()` so each spec runs in an isolated workspace.
3. Import any required assets using `ActionEventsUtil` before running the script.
4. Instantiate `VSScriptTest` with the viewsheet identifier and `caseName` derived from `specificationContext.currentIteration.name`.
5. Invoke `printVS(scriptName, jsFilePath, handler, assemblyNames)` to execute the script, then finish with `compareImage()` to assert the exported result.

### `printVS` Arguments

- `scriptName`: Logical name of the test run; also used as the exported image prefix.
- `jsFilePath`: Relative path to the JavaScript snippet inside `partials`, e.g., `background.js`.
- `handler`: Script hook you want to trigger (such as `ONREFRESH`, `ONINIT`, or a specific assembly name).
- `assemblyNames`: `String[]` listing the assemblies that should be exported; pass `null` to export the entire viewsheet.