dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300], ["PA", 75]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalSizeFrame(); //<2>
frame.setField("State");
elem.setSizeFrame(frame); //<3>
graph.addElement(elem);
