dataset = [["State", "Quantity"], ["NJ",200], ["NY",-300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity");
var elem = new IntervalElement("State", "Quantity");
var frame = new DefaultTextFrame();
frame.setField("Quantity");
elem.setTextFrame(frame);
var range = new LinearRange(); //<2>
range.setAbsoluteValue(true); //<3>
qscale.setScaleRange(range); //<4>
graph.setScale("Quantity", qscale); //<5>
graph.addElement(elem);
