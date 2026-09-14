dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
var aspec = new AxisSpec();
var tspec = new TextSpec(); //<2>
tspec.setFormat(java.text.DecimalFormat("##,###.00")); //<3>
aspec.setTextSpec(tspec); //<4>
qscale.setAxisSpec(aspec);
graph.setScale("Quantity", qscale);
graph.addElement(elem);
