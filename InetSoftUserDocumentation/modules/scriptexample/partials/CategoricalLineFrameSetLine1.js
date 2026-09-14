dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
frame = new CategoricalLineFrame(); //<2>
frame.setField("State"); //<3>
frame.setLine('NJ',GLine.THIN_LINE); //<4>
frame.setLine('NY',GLine.LARGE_DASH); //<4>
elem.setLineFrame(frame); //<5>
graph.addElement(elem);
