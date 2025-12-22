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
      VSScriptTest.importAssets("AccessChartDataExp.zip")

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
   
   def 'TestCase-AreaElement1' () {
      given:
      VSScriptTest.importAssets("AreaElement1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AreaElement1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AreaElement1', 'AreaElement1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }
   
   def 'TestCase-AxisSpecSetAbbreviate1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetAbbreviate1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetAbbreviate1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetAbbreviate1', 'AxisSpecSetAbbreviate1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }
   
   def 'TestCase-AxisSpecSetAbbreviate2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetAbbreviate2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetAbbreviate2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetAbbreviate2', 'AxisSpecSetAbbreviate2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }   

   def 'TestCase-AxisSpecSetAxisStyle1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetAxisStyle1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetAxisStyle1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetAxisStyle1', 'AxisSpecSetAxisStyle1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }   
   
   def 'TestCase-AxisSpecSetAxisStyle2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetAxisStyle2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetAxisStyle2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetAxisStyle2', 'AxisSpecSetAxisStyle2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }      

   def 'TestCase-AxisSpecSetGridAsShape1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridAsShape1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridAsShape1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridAsShape1', 'AxisSpecSetGridAsShape1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }   

   def 'TestCase-AxisSpecSetGridColor1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridColor1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridColor1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridColor1', 'AxisSpecSetGridColor1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }   
   
   def 'TestCase-AxisSpecSetGridColor2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridColor2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridColor2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridColor2', 'AxisSpecSetGridColor2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }     

   def 'TestCase-AxisSpecSetGridOnTop1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridOnTop1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridOnTop1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridOnTop1', 'AxisSpecSetGridOnTop1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }      
   
   def 'TestCase-AxisSpecSetGridOnTop2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridOnTop2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridOnTop2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridOnTop2', 'AxisSpecSetGridOnTop2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }    

   def 'TestCase-AxisSpecSetGridStyle1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridStyle1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridStyle1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridStyle1', 'AxisSpecSetGridStyle1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }       

   def 'TestCase-AxisSpecSetGridStyle2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetGridStyle2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetGridStyle2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetGridStyle2', 'AxisSpecSetGridStyle2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }           
   
   def 'TestCase-AxisSpecSetInPlot1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetInPlot1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetInPlot1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetInPlot1', 'AxisSpecSetInPlot1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }    

   def 'TestCase-AxisSpecSetInPlot2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetInPlot2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetInPlot2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetInPlot2', 'AxisSpecSetInPlot2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }     
   
   def 'TestCase-AxisSpecSetLabelGap1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetLabelGap1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetLabelGap1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetLabelGap1', 'AxisSpecSetLabelGap1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }        
   
   def 'TestCase-AxisSpecSetLabelGap2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetLabelGap2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetLabelGap2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetLabelGap2', 'AxisSpecSetLabelGap2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }           
   
   def 'TestCase-AxisSpecSetLabelVisible1' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetLabelVisible1.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetLabelVisible1^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetLabelVisible1', 'AxisSpecSetLabelVisible1.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }    
   
   def 'TestCase-AxisSpecSetLabelVisible2' () {
      given:
      VSScriptTest.importAssets("AxisSpecSetLabelVisible2.zip")

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^DocScriptExamples/AxisSpecSetLabelVisible2^host-org', specificationContext.currentIteration.name)
      vsScriptTest.printVS('AxisSpecSetLabelVisible2', 'AxisSpecSetLabelVisible2.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()    
   }      
   
   static VSScriptTest vsScriptTest
}