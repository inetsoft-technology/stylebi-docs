Chart1.bindingInfo.setColorField("Employee",Chart.STRING);
Chart1.bindingInfo.colorFrame = new CategoricalColorFrame;
Chart1.bindingInfo.colorFrame.setColor("Robert",java.awt.Color.lightGray);
var robColor = Chart1.bindingInfo.colorFrame.getColor("Robert");
Chart1.bindingInfo.colorFrame.setColor("Sue",robColor);
