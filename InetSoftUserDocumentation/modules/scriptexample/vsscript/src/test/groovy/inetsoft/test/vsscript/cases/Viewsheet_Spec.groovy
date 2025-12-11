package inetsoft.test.vsscript.cases

import inetsoft.test.modules.VSScriptTest
import spock.lang.Ignore
import spock.lang.Specification

class Viewsheet_Spec extends Specification {
   def setupSpec() {
      VSScriptTest.initHome(this.class.getName())
   }

   def 'TestCase-AccessChartData' () {
      given:
      // Import the viewsheet under assets when needed
      VSScriptTest.importAssets("AccessChartData.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AccessChartData', specificationContext.currentIteration.name)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('AccessChartData', 'AccessChartDataExp.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()

   }

   def 'TestCase-ShapeFormSetPoint1' () {
      given:
      // Import the viewsheet under assets when needed
      VSScriptTest.importAssets("ShapeFormSetPoint1.zip")

      when:
      vsScriptTest = new VSScriptTest('1%5E128%5E__NULL__%5EDocScriptExamples/ShapeFormSetPoint1%5Ehost-org', specificationContext.currentIteration.name)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('ShapeFormSetPoint1', 'ShapeFormSetPoint1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()

   }

   static VSScriptTest vsScriptTest
}