dataset = [["State", "Quantity", "m1", "m2", "m3"], ["NJ", 200, 50,50,5], ["NY", 300,20,30,50]]; //<1>
graph = new EGraph();
var frame = new StarShapeFrame(); //<2>
var elem = new PointElement("State", "Quantity");
var yscale = new LinearScale("Quantity");
yscale.setMax(500);
frame.setFields(["m1", "m2", "m3"]); //<3>
var scale1 = new LinearScale("m1");
var scale2 = new LinearScale("m2");
var scale3 = new LinearScale("m3");
scale1.setMax(10);
scale2.setMax(10);
scale3.setMax(10);
frame.setScales([scale1, scale2, scale3]); //<4>
elem.setShapeFrame(frame); //<5>
graph.setScale("Quantity",yscale);
graph.addElement(elem);
