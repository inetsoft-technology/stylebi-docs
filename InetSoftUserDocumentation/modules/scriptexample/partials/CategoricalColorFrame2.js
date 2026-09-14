dataset = [["State", "Quantity"], ["NJ",20], ["NY",40]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame(); //<2>
frame.setField("State"); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
