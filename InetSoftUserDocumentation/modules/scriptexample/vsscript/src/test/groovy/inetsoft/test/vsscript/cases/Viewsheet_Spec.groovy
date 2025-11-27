package inetsoft.test.vsscript.cases

import inetsoft.test.modules.VSScriptTest
import spock.lang.Ignore
import spock.lang.Specification

class Viewsheet_Spec extends Specification {
   def setupSpec() {
      VSScriptTest.initHome(this.class.getName())
   }

   def 'TestCase-background' () {
      given:
      // Import the viewsheet under assets when needed
      VSScriptTest.importAssets("chart.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^chart', specificationContext.currentIteration.name)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "background.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('background', 'background.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()

   }

   static VSScriptTest vsScriptTest
}