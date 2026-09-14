dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setScaleRange(new StackRange()); // adds 200+300 <3>
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
