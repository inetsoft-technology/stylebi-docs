dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
var aspec = new AxisSpec(); //<2>
aspec.setGridBetween(true); //<3>
aspec.setGridStyle(Chart.THIN_LINE);
aspec.setGridColor(java.awt.Color(0xFF0000));
qscale.setAxisSpec(aspec);
graph.setScale("Quantity", qscale);
graph.addElement(elem);
