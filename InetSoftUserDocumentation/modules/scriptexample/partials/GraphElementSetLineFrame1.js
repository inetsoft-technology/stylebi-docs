dataset = [["State", "Quantity"], ["CA", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var frame = new StaticLineFrame(); //<3>
frame.setLine(GLine.LARGE_DASH);
elem.setLineFrame(frame); //<4>
graph.addElement(elem); //<5>
