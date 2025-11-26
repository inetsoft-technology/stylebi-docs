package inetsoft.test.core

import com.github.romankh3.image.comparison.ImageComparison
import com.github.romankh3.image.comparison.ImageComparisonUtil
import com.github.romankh3.image.comparison.model.ImageComparisonResult
import com.github.romankh3.image.comparison.model.ImageComparisonState

import javax.imageio.ImageIO
import java.awt.*
import java.awt.image.BufferedImage
import java.util.List

class CompareUtil {

   /**
    *  https://github.com/romankh3/image-comparison
    *  use plugin to compare tow Image and print the diff image
    * @param resFile
    * @return
    */

   def PNGCompare(String resFile) {
      PNGCompare(resFile, 0.001)
   }

   def PNGCompare(String resFile, def allowedPixelPercent) {
      String[] temp = resFile.split('exportData')
      def status = [:]

      BufferedImage expectImage = ImageComparisonUtil.readImageFromResources('expectData' + temp[1])
      BufferedImage resImage = ImageComparisonUtil.readImageFromResources('exportData' + temp[1])

      ImageComparison imageComparison = new ImageComparison(expectImage, resImage)
      imageComparison.setAllowingPercentOfDifferentPixels(allowedPixelPercent)
      ImageComparisonResult comparisonResult = imageComparison.compareImages()

      println '===diff percent=====' + comparisonResult.getDifferencePercent()

      def compareState = comparisonResult.getImageComparisonState()

      if (compareState== ImageComparisonState.SIZE_MISMATCH) {
         status.put('false', 'FAILED! The PNG size is Different! See ' + resFile)
         return status
      }
      else if (compareState == ImageComparisonState.MISMATCH) {
         String diffPath = resFile.replaceAll('.png', '_diff.png')
         BufferedImage resultImage = comparisonResult.getResult()
         mergePNG(resultImage, expectImage, diffPath)
         resImage.flush()
         status.put('false', 'FAILED! Please check diff file:\n' + diffPath)
         return status
      }
      else if (compareState == ImageComparisonState.MATCH) {
         status.put('true', 'PASSED!')
         return status
      }
      else {
         status.put('false', 'FAILED! Unknow reasons.')
         return status
      }
   }

   /**
    * merge PNG
    * @param tmpPNG
    * @param exp
    * @param diffPath
    * @return
    */
   private mergePNG(BufferedImage resultImage, BufferedImage expImage, String diffPath) {
      def tmpWidth, tmpHeight
      tmpHeight = resultImage.getHeight()
      tmpWidth = resultImage.getWidth()

      BufferedImage combined = new BufferedImage(tmpWidth, tmpHeight + expImage.getHeight() + 10, BufferedImage.TYPE_INT_ARGB)
      Graphics g = combined.getGraphics()
      g.drawImage(resultImage, 0, 0, null)
      g.drawImage(expImage, 0, tmpHeight + 5, null)
      resultImage.flush()
      expImage.flush()

      ImageIO.write(combined, 'png', new File(diffPath))
      combined.flush()
   }

   /**
    * compare two txt file
    * @param expFile
    * @param resFile
    */
   def FileCompare(String resFile) {
      FileCompare(resFile, null, false)
   }

   def FileCompare(String resFile, Boolean isHTML) {
      FileCompare(resFile, null, isHTML)
   }

   def FileCompare(String resFile, String charset, Boolean isHTML) {
      def status = [:]

      String expFile = resFile.replace('exportData', 'expectData')
      if (!new File(expFile).exists() || !new File(resFile).exists()) {
         status.put('false', "Compare Failed, Expect or Result File [" + expFile +
                 "] not found!" )
         return status
      }
      else {
         List resList, expList
         if (charset != null) {
            resList = new File(resFile).readLines(charset)
            expList = new File(expFile).readLines(charset)
         }
         else {
            resList = new File(resFile).readLines()
            expList = new File(expFile).readLines()
         }
         if(isHTML) {
            def classPattern1 = ".c[0-9]* \\{"
            def classPattern2 = "class='c[0-9]*'"
            resList = resList.eachWithIndex { String it, int idx ->
               if(it.split(classPattern1).size() > 1 ||
                       it.split(classPattern2).size()) {
                  resList[idx] = it.replaceAll(classPattern1, " {").replaceAll(classPattern2, "class=''")
               }
            }
            expList = expList.eachWithIndex { String it, int idx ->
               if(it.split(classPattern1).size() > 1 ||
                       it.split(classPattern2).size()) {
                  expList[idx] = it.replaceAll(classPattern1, " {").replaceAll(classPattern2, "class=''")
               }
            }
         }

         if ((resList == null || resList.size() < 0) && expList != null) {
            status.put('false', "Compare Failed, Result File[ \n" + resFile + "] " +
                    "is empty, but Expect File[\n" + expFile + "] is not empty!")
            return status
         }
         else if (expList == null || expList.size() < 0) {
            status.put('false', "Compare Failed, Expect File [ \n" + expFile + "] is empty!")
            return status
         }
         else if (expList.size() != resList.size()) {
            status.put('false', "Compare Failed, row number is " +
                    "different in expect file[ \n" + expFile + "] and result file[\n" +
                    resFile + "]!\n [Expect Rows:" + expList.size() + "]; Result Rows: [" + resList.size() + "]")
            return status
         }
         else if (expList != resList) {
            for (i in 0..< expList.size()) {
               String diffFile = expFile.substring(expFile.indexOf("expectData") + 10)
               if (expList[i] != resList[i]) {
                  status.put('false', "Compare Failed at file, [\n" +
                          diffFile + "] in row [" + i + "], \n expect:[" + expList[i] + "], \n" +
                          "result:[" + resList[i] + "]")
                  return status
               }
            }
         }
         else {
            status.put('true', "PASSED!")
            return status
         }
      }
   }

   /**
    * compile files(png,pdf,text) by Feature name
    * @param fls, the compared name. ['table1', 'table2'] as String[]
    * @param suiteName
    * @param suffix: '.pdf', '.png', '.txt'
    */

   def CompareFileByFeature(String[] fls, String suiteName, String fmt) {
      CompareFileByFeature(fls, suiteName, fmt, null)
   }

   def CompareFileByFeature(String[] fls, String suiteName, String fmt, def allowedPixelPercent) {
      String resourcePath = new File(this.class.getResource('/expectData').getPath()).getParent()
      String fileName = resourcePath + '/exportData' + suiteName
      def resArray = []

      if(fls != null) {
         fls.each {
            def resPath = fileName + File.separator + it + getSuffix(fmt)
            resArray.add(processFile(resPath, fmt, allowedPixelPercent))
         }
      }
      else {
         new File(fileName).listFiles().each {
            resArray.add(processFile(it.getAbsolutePath(), fmt, allowedPixelPercent))
         }
      }

      String failedInfo
      resArray.each {
         if (it != null && it.getAt('false') != null) {
            failedInfo += "\n" + it.getAt('false') + "\n"
         }
      }

      if (failedInfo != null) {
         assert false : failedInfo
      }
   }

   private processFile(String resPath, String fmt, allowedPixelPercent) {
      if(fmt == 'PNG' && resPath.endsWith('.png') && !resPath.endsWith('_diff.png')) {
         return allowedPixelPercent != null? PNGCompare(resPath, allowedPixelPercent) : PNGCompare(resPath)
      }
      else if( ['TXT', 'CSV'].contains(fmt) && (resPath.endsWith('.csv') || resPath.endsWith('.txt'))) {
         return FileCompare(resPath)
      }
      else if ('HTML' == fmt && resPath.endsWith('.html')) {
         return FileCompare(resPath, true)
      }
   }

   /**
    * return the suffix of compile type
    * @param fmt
    * @return
    */
   def getSuffix(String fmt) {
      def suffix
      switch (fmt) {
         case 'PNG': suffix = ".png"; break
         case 'PDF': suffix = '.pdf'; break
         case 'TXT': suffix = '.txt'; break
         case 'HTML': suffix = '.html'; break
         case 'CSV': suffix = '.csv'; break
      }
      return suffix
   }

}