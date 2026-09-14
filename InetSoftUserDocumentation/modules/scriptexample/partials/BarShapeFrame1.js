dataset = [["State", "Quantity","m1","m2","m3"], ["NJ", 200,5,1,3], ["NY", 300,3,4,4]]; //<1>
graph = new EGraph();
var frame = new BarShapeFrame(); //<2>
var elem = new PointElement("State", "Quantity");
frame.setFields(["m1","m2","m3"]); //<3>
elem.setShapeFrame(frame); //<4>
graph.addElement(elem);
