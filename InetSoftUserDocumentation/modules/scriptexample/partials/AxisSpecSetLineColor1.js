dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var qscale = new LinearScale("Quantity");
var cscale = new CategoricalScale("State");
var aspec1 = new AxisSpec(); //<2>
var aspec2 = new AxisSpec(); //<2>
aspec1.setLineColor(java.awt.Color(0xff0000)); //<3>
aspec2.setLineColor(java.awt.Color(0x00ff00)); //<3>
qscale.setAxisSpec(aspec1);
cscale.setAxisSpec(aspec2);
graph.setScale("Quantity", qscale);
graph.setScale("State", cscale);
graph.addElement(elem);