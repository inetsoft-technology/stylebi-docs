dataset = [["State", "Quantity"], ["NJ", 200],["NY", 300], ["PA", 75]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalSizeFrame(); //<2>
frame.setField("State");
frame.setSize('NJ',5); //<3>
frame.setSize('NY',10); //<3>
frame.setSize('PA',20); //<3>
elem.setSizeFrame(frame); //<4>
graph.addElement(elem);
