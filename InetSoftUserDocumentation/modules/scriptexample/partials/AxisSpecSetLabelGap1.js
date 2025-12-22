dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
var aspec = new AxisSpec(); //<2>
aspec.setLabelGap(30); //<3>
qscale.setAxisSpec(aspec);
graph.setScale("Quantity", qscale);
graph.addElement(elem);