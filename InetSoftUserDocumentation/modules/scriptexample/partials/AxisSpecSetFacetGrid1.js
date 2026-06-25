dataset = [["State","Quantity"],["NJ",20000],["NY",30000],["PA",15000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var xscale = new CategoricalScale("State");
var aspec = new AxisSpec(); //<2>
aspec.setGridStyle(Chart.THIN_LINE); //<3>
aspec.setGridOnTop(true);
aspec.setGridColor(java.awt.Color(0xFF0000));
aspec.setFacetGrid(true); //<4>
xscale.setAxisSpec(aspec);
graph.setScale("State", xscale);
graph.addElement(elem);
