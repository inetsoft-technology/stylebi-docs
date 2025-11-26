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
