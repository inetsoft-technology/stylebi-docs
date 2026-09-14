dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State","Quantity");
var svg = new SVGShape("https://www.w3.org/Icons/SVG/svg-logo.svg"); //<2>
var shapeFrame = new StaticShapeFrame(svg); //<3>
var sizeFrame = new StaticSizeFrame(10);
elem.setSizeFrame(sizeFrame);
elem.setShapeFrame(shapeFrame); //<4>
graph.addElement(elem);
