dataset = [["State", "Quantity", "m1", "m2", "m3"],["NJ", 200,90,25,50],["NY", 300,30,15,15]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var frame = new VineShapeFrame(); //<2>
var mscale = new LinearScale();
var rscale = new LinearScale();
mscale.setMin(0);
mscale.setMax(5);
rscale.setMin(0);
rscale.setMax(90);
frame.setScales([rscale, mscale, mscale]);
frame.setFields(["m1", "m2", "m3"]);
frame.setStartAngle(0);
frame.setEndAngle(90); //<3>
elem.setShapeFrame(frame); //<4>
graph.addElement(elem);
