dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
qscale.setIncrement(50); //<3>
var elem = new IntervalElement("State", "Quantity");
qscale.setMinorIncrement(10); //<4>
graph.setScale("Quantity", qscale); //<5>
graph.addElement(elem);
