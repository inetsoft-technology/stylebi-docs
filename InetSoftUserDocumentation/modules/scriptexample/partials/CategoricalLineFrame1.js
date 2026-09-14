dataset = [["State", "Quantity"],["NJ",300],["NY",200],["PA",100]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalLineFrame(); //<2>
frame.setField("State"); //<3>
elem.setLineFrame(frame); //<4>
graph.addElement(elem);
