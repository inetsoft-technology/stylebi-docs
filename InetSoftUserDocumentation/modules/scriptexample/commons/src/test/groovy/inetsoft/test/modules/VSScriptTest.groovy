package inetsoft.test.modules

import inetsoft.report.composition.RuntimeViewsheet
import inetsoft.sree.security.SRPrincipal
import inetsoft.uql.viewsheet.FileFormatInfo
import inetsoft.uql.viewsheet.VSAssembly
import inetsoft.uql.viewsheet.VSBookmark
import inetsoft.uql.viewsheet.VSBookmarkInfo
import inetsoft.uql.viewsheet.Viewsheet
import inetsoft.uql.viewsheet.internal.VSAssemblyInfo
import inetsoft.util.ConfigurationContext
import inetsoft.util.DataSpace
import inetsoft.util.ThreadContext
import inetsoft.util.script.ScriptException
import inetsoft.web.viewsheet.service.ExportResponse

import inetsoft.test.core.ActionEventsUtil
import inetsoft.test.core.CompareUtil
import inetsoft.test.core.ControllersResource
import inetsoft.test.core.RuntimeViewsheetResource
import inetsoft.test.core.TUtil
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

class VSScriptTest {
   VSScriptTest(String asset_id, String caseName) {
      this.asset_id = asset_id
      this.caseName = caseName
   }

   /**
    * init sree home
    * @return
    */
   static initHome(String suiteName) {
      System.err.print("=========sree.home=====" + System.getProperty("sree.home"))
      def arrs = suiteName.split('.vsscript')
      this.suiteName = arrs.size() == 1? null : arrs[1].replace('.', '/')
      ConfigurationContext.getContext().setHome(System.getProperty("sree.home"))
   }

   def printVS(def bks, def assemblies) {
      printVS(null, bks, null, null, assemblies)
   }

   /**
    * printVS with JS file path and handler
    * @param scriptName name of the script
    * @param jsFilePath relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
    * @param handler the HANDLER value (e.g., "ONREFRESH", "ONINIT", or assembly name)
    * @param assemblyNames names of assemblies to show
    */
   def printVS(String scriptName, String jsFilePath, String handler, def assemblyNames) {
      String jsContent = readJsFile(jsFilePath)
      def testData = [[HANDLER: handler, COMMAND: jsContent]]
      printVS(null, null, scriptName, testData, assemblyNames)
   }

   /**
    *
    * @param suffix
    * @param params
    * @param bks default is '(Home)'
    * @param type
    * @return
    */
   def printVS(Map<String, String[]> params, String[] bks, String scriptName, def testData, def assemblyNames) {
      SRPrincipal principal = TUtil.createPrincipal('admin', ['Everyone', 'Administrator'] as String[], new String[0])
      DataSpace.getDataSpace()
      controllers.initControllers()
      ThreadContext.setContextPrincipal(principal)
      viewsheetResource = new RuntimeViewsheetResource(actionEventsUtil.createOpenViewsheetEvent(params, asset_id), controllers)
      viewsheetResource.initRuntimeVS(principal)
      RuntimeViewsheet runtimeViewsheet = viewsheetResource.getRuntimeViewsheet(principal)
      Viewsheet viewsheet = runtimeViewsheet.getViewsheet()

      //set script
      testData.each {
         def handler = it.HANDLER
         def command = it.COMMAND

         if('ONINIT'.equals(handler)) {
            viewsheet.getViewsheetInfo().setOnInit(command)
         }
         else if ('ONREFRESH'.equals(handler)) {
            viewsheet.getViewsheetInfo().setOnLoad(command)
         }
         else {
            VSAssembly vsAssembly = (VSAssembly)viewsheet.getAssembly(handler)
            vsAssembly.getVSAssemblyInfo().setScript(command)
         }
         viewsheetResource.refreshViewsheet(principal)
      }

      //hide other assembly
      if (assemblyNames != null) {
         viewsheet.getAssemblies().each { it ->
            if (!(it.getName() in assemblyNames)) {
               VSAssemblyInfo assemblyInfo = (VSAssemblyInfo)it.getInfo()
               //assemblyInfo.setVisible('hide')
               assemblyInfo.setScript("visible='hide'")
            }
         }
      }
      //for calctable, if set script, the script didn't save to home bookmark, so add it
      runtimeViewsheet.addBookmark(VSBookmark.HOME_BOOKMARK, VSBookmarkInfo.ALLSHARE, principal.getUser().getUserIdentity(), false)

      scriptName = scriptName?: 'VS'
      bks = bks?:['(Home)'] as String[]
      File outFile = createFile(scriptName)
      OutputStream out

      try {
         out = new FileOutputStream(outFile)
         viewsheetResource.exportVS(FileFormatInfo.EXPORT_TYPE_PNG, true,
                 false, false, false, false,
                 bks, false, false,null, new ExportResponse(out), principal)
      } catch (ScriptException scriptException) {
         if(outFile.exists()) {
            outFile.delete()
         }
         writeScriptExceptionDetails(outFile, scriptException)
         throw scriptException
      } finally {
         if(out != null) {
            out.close()
         }
      }
   }

   /**
    * Read JS file content from partials directory
    * @param jsFilePath relative path to JS file in partials directory (e.g., "AccessChartDataExp.js")
    * @return JS file content as string
    */
   def readJsFile(String jsFilePath) {
      // Normalize the path: add "partials/" prefix since jsFilePath doesn't start with it
      String normalizedPath = "partials/${jsFilePath}"
      
      // Try to get resource from classpath using the normalized path
      def resource = this.class.getClassLoader().getResource(normalizedPath)
      if (resource == null) {
         // Try to locate based on project structure
         // partials directory is at: InetSoftUserDocumentation/modules/scriptexample/partials/
         try {
            def expectDataResource = this.class.getResource('/expectData')
            if (expectDataResource != null) {
               // Use toURI() for better cross-platform compatibility
               def expectDataFile = new File(expectDataResource.toURI())

               def searchDir = expectDataFile.isDirectory() ? expectDataFile : expectDataFile.getParentFile()
               
               // Search upward from expectData until we find a directory containing "partials"
               // This works regardless of whether we're in src/test/resources or target/test-classes
               int maxLevels = 10 // Prevent infinite loops
               int level = 0
               while (searchDir != null && level < maxLevels) {
                  def partialsDir = new File(searchDir, "partials")
                  if (partialsDir.exists() && partialsDir.isDirectory()) {
                     // jsFilePath is already the filename without "partials/" prefix
                     def partialsFile = new File(partialsDir, jsFilePath)
                     if (partialsFile.exists()) {
                        return partialsFile.text
                     }
                     // If exact file not found, list available files for debugging
                     def availableFiles = partialsDir.listFiles()?.collect { it.name }
                     if (availableFiles != null && !availableFiles.isEmpty()) {
                        System.err.println("JS file '${jsFilePath}' not found in ${partialsDir.getAbsolutePath()}. Available files: ${availableFiles.join(', ')}")
                     }
                  }
                  def parent = searchDir.getParentFile()
                  if (parent == null || parent.equals(searchDir)) {
                     break
                  }
                  searchDir = parent
                  level++
               }
            }
         } catch (Exception e) {
            System.err.println("Error searching for JS file: ${e.message}")
            e.printStackTrace()
         }
         throw new FileNotFoundException("JS file not found: ${jsFilePath}")
      }
      
      // Read file content
      def file
      try {
         file = new File(resource.toURI())
      } catch (Exception e) {
         // If URI conversion fails, try using InputStream
         def inputStream = resource.openStream()
         return inputStream.text
      }
      return file.text
   }

   /**
    * to create the export file
    * @param asset_id
    * @param type
    * @param idx
    * @param map
    * @return
    */
   def createFile(String scriptName) {
      String resourcePath = new File(this.class.getResource('/expectData').getPath()).getParent()
      String fileName = resourcePath + '/exportData' + suiteName
      File tempFile = new File(fileName + File.separator  + caseName  + '_' + scriptName + '.png')

      if(!tempFile.getParentFile().exists()) {
         tempFile.getParentFile().mkdirs()
      } else if(tempFile.exists()){
         tempFile.delete()
      }
      return tempFile
   }

   /**
    * Persist script exception details when export fails so the failure can be inspected later.
    */
   private void writeScriptExceptionDetails(File imageFile, ScriptException exception) {
      try {
         File txtFile = new File(imageFile.getParentFile(),
                 imageFile.getName().replaceFirst(/\.png$/, '_ScriptException.txt'))
         def stackTraceWriter = new StringWriter()
         exception.printStackTrace(new PrintWriter(stackTraceWriter))

         txtFile.withWriter('UTF-8') { writer ->
            writer.println("Script export failed for ${imageFile.getName()}")
            writer.println("Timestamp: ${new Date()}")
            writer.println("Viewsheet: ${caseName}")
            writer.println("Message: ${exception.getMessage()}")
            writer.println()
            writer.println(stackTraceWriter.toString())
         }
      } catch (IOException ioException) {
         System.err.println("Unable to write script exception log: ${ioException.message}")
      }
   }

   /**
    * Get assets file path from classpath or project structure
    * @param fileName name of the asset file (e.g., "AccessChartData.zip")
    * @return file path as string
    */
   static def getAssetsFilePath(String fileName) {
      // Try to get resource from classpath first
      def resource = VSScriptTest.class.getClassLoader().getResource("assets/${fileName}")
      if (resource != null) {
         // Convert URL to file path
         try {
            return new File(resource.toURI()).getAbsolutePath()
         } catch (Exception e) {
            // If URI conversion fails, try using getPath() and handle URL encoding
            String resourcePath = resource.getPath()
            if (System.properties['os.name'].toString().toLowerCase().contains('windows')) {
               // On Windows, remove leading "/" if present
               if (resourcePath.startsWith('/')) {
                  resourcePath = resourcePath.substring(1)
               }
            }
            return resourcePath
         }
      }
      
      // If not found in classpath, try to locate based on project structure
      // assets directory is at: InetSoftUserDocumentation/modules/scriptexample/assets/
      try {
         def expectDataResource = VSScriptTest.class.getResource('/expectData')
         if (expectDataResource != null) {
            // Use toURI() for better cross-platform compatibility
            def expectDataFile = new File(expectDataResource.toURI())
            
            // expectData might be a file or directory, handle both cases
            def searchDir = expectDataFile.isDirectory() ? expectDataFile : expectDataFile.getParentFile()
            
            // Search upward from expectData until we find a directory containing "assets"
            // This works regardless of whether we're in src/test/resources or target/test-classes
            int maxLevels = 10 // Prevent infinite loops
            int level = 0
            while (searchDir != null && level < maxLevels) {
               def assetsDir = new File(searchDir, "assets")
               if (assetsDir.exists() && assetsDir.isDirectory()) {
                  def assetsFile = new File(assetsDir, fileName)
                  if (assetsFile.exists()) {
                     return assetsFile.getAbsolutePath()
                  }
               }
               def parent = searchDir.getParentFile()
               if (parent == null || parent.equals(searchDir)) {
                  break
               }
               searchDir = parent
               level++
            }
         }
      } catch (Exception e) {
         // Ignore and try next approach
      }
      
      throw new FileNotFoundException("Assets file not found: ${fileName}")
   }

   /**
    * compare all image file
    */
   void compareImage() {
      compareImage(null)
   }

   /**
    * compare the image files
    * @param fls image names
    */
   void compareImage(String[] fls) {
      compareUtil.CompareFileByFeature(fls, suiteName, 'PNG')
   }

   static String asset_id, suiteName, caseName
   RuntimeViewsheetResource viewsheetResource
   ControllersResource controllers = new ControllersResource()
   ActionEventsUtil actionEventsUtil = new ActionEventsUtil()
   CompareUtil compareUtil = new CompareUtil()
}
