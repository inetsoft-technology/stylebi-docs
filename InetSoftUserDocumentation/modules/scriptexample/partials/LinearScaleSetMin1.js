dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setMin(150); //<3>
qscale.setMax(450); //<4>
graph.setScale("Quantity", qscale); //<5>
graph.addElement(elem);
