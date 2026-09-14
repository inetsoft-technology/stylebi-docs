dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new PowerScale(); //<2>
qscale.setFields(["Quantity"]); //<3>
var elem = new IntervalElement("State", "Quantity");
qscale.setExponent(0.5);
graph.setScale("Quantity", qscale); //<4>
graph.addElement(elem);
