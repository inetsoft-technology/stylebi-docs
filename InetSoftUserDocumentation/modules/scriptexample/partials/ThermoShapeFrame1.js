dataset = [["State", "Quantity","Height","Weight"], ["NJ", 200,50,1], ["NY", 300,30,4]]; //<1>
graph = new EGraph();
var frame = new ThermoShapeFrame(); //<2>
var elem = new PointElement("State", "Quantity");
var hscale = new LinearScale();
var wscale = new LinearScale();
hscale.setMin(0);
hscale.setMax(100);
wscale.setMin(0);
wscale.setMax(5);
frame.setFields(["Height", "Weight"]); //<3>
frame.setScales([hscale, wscale]); //<4>
elem.setShapeFrame(frame); //<5>
graph.addElement(elem);
