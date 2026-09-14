dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setIncrement(15); //<3>
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
