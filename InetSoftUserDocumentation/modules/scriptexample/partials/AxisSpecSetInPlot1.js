dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
qscale.setMax(40000); //<2>
var aspec = new AxisSpec(); //<3>
aspec.setInPlot(true); //<4>
qscale.setAxisSpec(aspec);
graph.setScale("Quantity", qscale);
graph.addElement(elem);
