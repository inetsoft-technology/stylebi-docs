dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State","Quantity");
var circle = GShape.CIRCLE.create(true, true); //<2>
circle.setFillColor(java.awt.Color.RED); //<3>
var shapeFrame = new StaticShapeFrame(circle); //<4>
var sizeFrame = new StaticSizeFrame(10);
elem.setSizeFrame(sizeFrame);
elem.setShapeFrame(shapeFrame); //<5>
graph.addElement(elem);
