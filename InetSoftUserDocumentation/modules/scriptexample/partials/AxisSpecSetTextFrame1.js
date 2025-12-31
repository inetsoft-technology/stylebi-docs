dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var cscale = new CategoricalScale("State");
var tframe = new DefaultTextFrame(); //<2>
tframe.setText('NJ','New Jersey');
tframe.setText('NY','New York');
var aspec = new AxisSpec(); //<3>
aspec.setTextFrame(tframe); //<4>
cscale.setAxisSpec(aspec);
graph.setScale("State", cscale);
graph.addElement(elem);