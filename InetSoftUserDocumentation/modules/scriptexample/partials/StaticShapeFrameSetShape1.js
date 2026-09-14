dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var frame = new StaticShapeFrame(); //<2>
var elem = new PointElement("State", "Quantity");
frame.setShape(GShape.CROSS); //<3>
elem.setShapeFrame(frame); //<4>
graph.addElement(elem);
