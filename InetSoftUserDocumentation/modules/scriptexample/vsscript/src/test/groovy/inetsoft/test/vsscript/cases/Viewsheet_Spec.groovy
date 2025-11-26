package inetsoft.test.vsscript.cases

import inetsoft.test.core.ActionEventsUtil
import inetsoft.test.modules.VSScriptTest
import spock.lang.Ignore
import spock.lang.Specification

class Viewsheet_Spec extends Specification {
   def setupSpec() {
      VSScriptTest.initHome(this.class.getName())
   }

   def 'TestCase-background' () {
      // Import the viewsheet under assets when needed
      ActionEventsUtil actionEventsUtil = new ActionEventsUtil()
      String path = VSScriptTest.getAssetsFilePath("chart.zip")
      actionEventsUtil.importAssetsFile(path)

      given:
      caseName = specificationContext.currentIteration.name

      when:
      vsScriptTest = new VSScriptTest('1^128^__NULL__^chart', caseName)
      // printVS(scriptName, jsFilePath, handler, assemblyNames)
      // jsFilePath: relative path to JS file in partials directory (e.g., "background.js")
      // handler: the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
      vsScriptTest.printVS('background', 'background.js', 'Chart1', ['Chart1'] as String[])
      then:
      vsScriptTest.compareImage()

   }

   static VSScriptTest vsScriptTest
   String caseName
}
