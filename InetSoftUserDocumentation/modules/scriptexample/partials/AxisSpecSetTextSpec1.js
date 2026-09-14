dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
var aspec = new AxisSpec(); //<2>
var textspec = new TextSpec(); //<3>
textspec.setColor(java.awt.Color(0xff0000));
aspec.setTextSpec(textspec); //<4>
qscale.setAxisSpec(aspec);
graph.setScale("Quantity", qscale);
graph.addElement(elem);
