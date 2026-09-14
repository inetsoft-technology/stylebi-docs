Chart1.bindingInfo.setShapeField('Employee',Chart.STRING);
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
var shape = new GShape.ImageShape();
shape.image = logo;
var frame = new StaticShapeFrame(shape);
Chart1.bindingInfo.shapeFrame = frame;
