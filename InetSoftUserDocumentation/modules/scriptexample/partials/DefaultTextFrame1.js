dataset = [["State", "Quantity"], ["NJ",203], ["NY",327]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var spec = new TextSpec();
var frame = new DefaultTextFrame(); //<2>
spec.setFont(java.awt.Font('Verdana',java.awt.Font.BOLD, 14));
frame.setField("Quantity");
elem.setTextFrame(frame); //<3>
elem.setTextSpec(spec);
graph.addElement(elem);
