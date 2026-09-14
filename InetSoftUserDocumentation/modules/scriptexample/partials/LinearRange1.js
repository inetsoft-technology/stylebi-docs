dataset = [["State", "Quantity"],["NJ",-200],["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity");
var elem = new IntervalElement("State", "Quantity");
range = new LinearRange(); //<2>
qscale.setScaleRange(range); //<3>
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
