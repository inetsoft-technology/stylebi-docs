dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
var spec = new AxisSpec(); //<3>
spec.setLineColor(java.awt.Color(0xff0000));
qscale.setAxisSpec(spec); //<4>
graph.setScale("Quantity", qscale); //<5>
graph.addElement(elem);
