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
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/ShapeFormSetPoint1^host-org', specificationContext.currentIteration.name)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('ShapeFormSetPoint1', 'ShapeFormSetPoint1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()
   }
   
   def 'TestCase-ShapeFormSetPoint2' () {
      given:
      // Import the viewsheet under assets when needed
      VSScriptTest.importAssets("ShapeFormSetPoint2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/ShapeFormSetPoint2^host-org', specificationContext.currentIteration.name)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('ShapeFormSetPoint2', 'ShapeFormSetPoint2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()
	}
	
	def 'TestCase-AddChartDecoration1' () {
      given:
      VSScriptTest.importAssets("AddChartDecoration1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AddChartDecoration1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AddChartDecoration1', 'AddChartDecoration1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()  
	}
	
	def 'TestCase-AddChartDecoration2' () {
      given:
      VSScriptTest.importAssets("AddChartDecoration2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AddChartDecoration2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AddChartDecoration2', 'AddChartDecoration2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }

   def 'TestCase-AddChartDecoration3' () {
      given:
      VSScriptTest.importAssets("AddChartDecoration3.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AddChartDecoration3^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AddChartDecoration3', 'AddChartDecoration3.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }


   static VSScriptTest vsScriptTest
}