dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new PowerScale(); //<2>
qscale.setFields(["Quantity"]);
var elem = new IntervalElement("State", "Quantity"); //<3>
qscale.setExponent(0.5); //<4>
graph.setScale("Quantity", qscale); //<5>
graph.addElement(elem);
