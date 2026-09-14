dataset = [["State","Quantity","Shape"], ["NJ",200,"STAR"], ["NY",300,"CIRCLE"]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var sizeframe = new StaticSizeFrame(5);
var shapeframe = new StaticShapeFrame(); //<2>
shapeframe.setField("Shape");
elem.setShapeFrame(shapeframe); //<3>
elem.setSizeFrame(sizeframe);
graph.addElement(elem);
