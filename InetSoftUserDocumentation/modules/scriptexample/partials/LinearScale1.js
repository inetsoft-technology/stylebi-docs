dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale(); //<2>
qscale.setFields(["Quantity"]);
var elem = new IntervalElement("State", "Quantity");
graph.setScale("Quantity", qscale); //<3>
graph.addElement(elem);
