dataset = [["State","Quantity","Total"], ["NJ",200,30], ["NY",300,15], ["PA",150,5]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var sizeframe = new StaticSizeFrame();
sizeframe.setSize(10);
var frame = new PolygonShapeFrame("Total"); //<2>
elem.setShapeFrame(frame); //<3>
elem.setSizeFrame(sizeframe);
graph.addElement(elem);
