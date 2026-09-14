dataset = [["State","Quantity","Total"], ["NJ",200,30], ["NY",300,15], ["PA",150,5]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var shapeframe = new OrientationShapeFrame("Total"); //<2>
var sizeframe = new StaticSizeFrame();
sizeframe.setSize(10);
elem.setSizeFrame(sizeframe);
elem.setShapeFrame(shapeframe); //<3>
graph.addElement(elem);
