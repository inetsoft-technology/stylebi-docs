dataset = [["State", "Quantity","m1","m2","m3"], ["NJ", 200,5,2,3], ["NY", 300,2,4,4]]; //<1>
graph = new EGraph();
var frame = new PieShapeFrame(); //<2>
var elem = new PointElement("State", "Quantity");
var sframe = new StaticSizeFrame(15);
frame.setFields(["m1","m2","m3"]); //<3>
elem.setShapeFrame(frame); //<4>
elem.setSizeFrame(sframe);
graph.addElement(elem);
