# Script Example Test Guide

## Directory Overview

- `assets`: Holds dashboard assets referenced by the automated tests.
- `partials`: Contains the script samples.
- `commons`: Provides the reusable core test code and builds the jar that the execution suites depend on.
- `vsscript`: Hosts the concrete test cases plus any suite-level configuration and runners.

## Initial Setup
You will need a GitHub account and a [classic personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) in order to access the Maven repository. When creating the classic personal access token, the `read:packages` scope will need to be enabled. You do not need any special permissions to access the Maven repository, but GitHub [requires](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry#installing-a-package) an account to access public Package repositories.

Create or update the `~/.m2/settings.xml` file (`C:\Users\USERNAME\.m2\settings.xml` on Windows) with the following contents, replacing `YOUR_GITHUB_USERNAME` and `YOUR_GITHUB_PASSWORD` with your GitHub username and personal access token, respectively:

```xml
<settings>
  <servers>
    <server>
      <id>gh-stylebi</id>
      <username>YOUR_GITHUB_USERNAME</username>
      <password>YOUR_GITHUB_ACCESS_TOKEN</password>
    </server>
  </servers>
</settings>
```

## Test Execution Workflow

0. Update `pom.xml`  
   Set the `root.dir` property to the absolute path of your local `modules/scriptexample` directory (for example, `E:\stylebi-docs\InetSoftUserDocumentation\modules\scriptexample`) so the tests can locate assets and resources.
1. `.\mvnw.cmd clean`  
   Removes previous build outputs to ensure the next steps run against a fresh workspace.
2. `.\mvnw.cmd package -pl commons`  
   Builds the shared `commons` module and produces the jar consumed by the suites.
3. Update license key in `vsscript/license.properties`  
   Modify the `inetsoft.license.key` property to point to a valid license key.
4. `.\mvnw.cmd test -pl vsscript`  
   Executes the tests using the freshly built artifacts.

After the test suite finishes, any images exported by the applied scripts and the corresponding script exception details are written to `vsscript/target/test-classes/exportData` for inspection.

Run the commands from the `modules/scriptexample` root so Maven picks up the correct multi-module project configuration.

## Step-by-Step Guide: Adding a New Test Case

This section provides a complete walkthrough for creating a new test case from scratch.

### Step 1: Prepare Your Dashboard (Viewsheet)

1. **Create or open your Dashboard in the Style Intelligence product**
   - The Dashboard can be any viewsheet you want to test
   - It should contain the assemblies (charts, tables, etc.) that your script will modify

2. **Export the Dashboard as a ZIP file**
   - In the product, export your viewsheet/dashboard as a ZIP file
   - This ZIP file will be imported into the test environment

3. **Place the ZIP file in the `assets` folder**
   - Copy your exported ZIP file to: `modules/scriptexample/assets/`
   - Example: `modules/scriptexample/assets/myDashboard.zip`

### Step 2: Create Your JavaScript Script

1. **Write your JavaScript code**
   - This is the script that will be applied to your dashboard during testing
   - Example: `background = java.awt.Color.PINK;`

2. **Save the script in the `partials` folder**
   - Create a new `.js` file in: `modules/scriptexample/partials/`
   - Example: `modules/scriptexample/partials/myScript.js`
   - The filename will be referenced in your test case

### Step 3: Create the Test Case

1. **Open or create a Spock specification file**
   - Location: `vsscript/src/test/groovy/inetsoft/test/vsscript/cases/`
   - You can add to an existing file (like `Viewsheet_Spec.groovy`) or create a new one

2. **Add a test method following this template:**

```groovy
def 'TestCase-your-test-name' () {
   // Step 3a: Import your dashboard ZIP file
   VSScriptTest.importAssets("myDashboard.zip")

   given:

   when:
   // Step 3b: Create VSScriptTest instance
   // The first parameter is the viewsheet identifier (you'll need to find this)
   // The second parameter is the case name
   vsScriptTest = new VSScriptTest('1^128^__NULL__^myDashboard',
           specificationContext.currentIteration.name)
   
   // Step 3c: Execute the script
   // Parameters: scriptName, jsFilePath, handler, assemblyNames
   vsScriptTest.printVS('myScript', 'myScript.js', 'Chart1', ['Chart1'] as String[])
   
   then:
   // Step 3d: Compare the exported image with expected result
   vsScriptTest.compareImage()
}
```

3. **Key details for the test method:**
   - **Viewsheet identifier**: The first parameter of `VSScriptTest` constructor. This is typically in the format `'1^128^__NULL__^dashboardName'`. You may need to check the imported dashboard or use a default like `'1^128^__NULL__^chart'`.
   - **Script name**: The first parameter of `printVS()` - this is a logical name for your test (e.g., `'myScript'`)
   - **JS file path**: The second parameter - the filename in `partials` folder (e.g., `'myScript.js'`)
   - **Handler**: The third parameter - this is the script hook:
     - Use `'ONREFRESH'` for refresh scripts
     - Use `'ONINIT'` for initialization scripts
     - Use an assembly name (e.g., `'Chart1'`) for assembly-specific scripts
   - **Assembly names**: The fourth parameter - an array of assembly names to export, or `null` to export the entire viewsheet

### Step 4: Run the Test and Verify Output

1. **Execute the test** (from `modules/scriptexample` directory):
   ```cmd
   .\mvnw.cmd clean
   .\mvnw.cmd package -pl commons
   .\mvnw.cmd test -pl vsscript
   ```

2. **Check the exported output**
   - After running, check: `vsscript/target/test-classes/exportData/`
   - Look for images with names like: `TestCase-your-test-name_myScript.png`
   - Verify that the exported image shows the expected result (e.g., background color changed, chart modified, etc.)

3. **Review any exceptions**
   - If the script throws an exception, details will be in the `exportData` directory
   - Check the test output in the console for error messages

### Step 5: Add Expected Output for Comparison

1. **Copy the verified exported image**
   - From: `vsscript/target/test-classes/exportData/cases/YourSpecName/TestCase-your-test-name_myScript.png`
   - To: `vsscript/src/test/resources/expectData/cases/YourSpecName/TestCase-your-test-name_myScript.png`

2. **Create the directory structure if needed**
   - The path should match: `vsscript/src/test/resources/expectData/cases/[YourSpecName]/[ImageFileName].png`
   - Example: `vsscript/src/test/resources/expectData/cases/Viewsheet_Spec/TestCase-background_background.png`

3. **Future test runs will automatically compare**
   - Once the expected image is in place, subsequent test runs will compare the exported image with the expected one
   - The test will pass if images match, or fail with a diff image if they don't

### Alternative: Using Default Environment

If you don't want to import a dashboard in each test case:

1. **Prepare your environment in the product**
   - Import your viewsheet into the product
   - Configure it as needed

2. **Create a backup**
   - Export the environment backup (storage.zip)
   - Replace: `vsscript/src/test/resources/config/storage.zip`

3. **Your test case can skip the import step**
   - The default environment will be restored automatically
   - You can omit the `VSScriptTest.importAssets()` call

## Quick Reference: `printVS` Arguments

- `scriptName`: Logical name of the test run; also used as the exported image prefix.
- `jsFilePath`: Relative path to the JavaScript snippet inside `partials`, e.g., `background.js`.
- `handler`: Script hook you want to trigger:
  - `'ONREFRESH'` - for refresh event scripts
  - `'ONINIT'` - for initialization scripts
  - Assembly name (e.g., `'Chart1'`) - for assembly-specific scripts
- `assemblyNames`: `String[]` listing the assemblies that should be exported; pass `null` to export the entire viewsheet.

## Example: Complete Test Case

See `vsscript/src/test/groovy/inetsoft/test/vsscript/cases/Viewsheet_Spec.groovy` for a working example that:
- Imports `AccessChartData.zip` from the assets folder
- Applies `AccessChartDataExp.js` script to `Chart1` assembly
- Exports and compares the result