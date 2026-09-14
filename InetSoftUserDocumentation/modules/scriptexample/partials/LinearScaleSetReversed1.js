dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setMin(150);
qscale.setMax(450);
// Place setReversed() after setMin() and setMax()
qscale.setReversed(true); //<3>
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
