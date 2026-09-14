dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State","Quantity");
var shapeFrame = new StaticShapeFrame(SVGShape.FACE_HAPPY); //<2>
var sizeFrame = new StaticSizeFrame(10);
elem.setSizeFrame(sizeFrame);
elem.setShapeFrame(shapeFrame); //<3>
graph.addElement(elem);
