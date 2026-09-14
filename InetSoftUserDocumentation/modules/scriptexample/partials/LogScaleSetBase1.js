dataset = [["State", "Quantity"], ["NJ",12], ["NY",450]]; //<1>
graph = new EGraph();
var qscale = new LogScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setBase(2); //<3>
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
