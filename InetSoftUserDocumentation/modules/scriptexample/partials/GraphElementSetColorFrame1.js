dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var frame = new HeatColorFrame(); //<2>
var elem = new IntervalElement("State", "Quantity"); //<3>
frame.setField("Quantity");
elem.setColorFrame(frame); //<4>
graph.addElement(elem); //<5>
