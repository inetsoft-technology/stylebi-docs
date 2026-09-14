dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var cframe = new CategoricalColorFrame();
var tframe = new DefaultTextFrame(); //<2>
var spec = cframe.getLegendSpec();
cframe.setField("State");
tframe.setText('NJ','New Jersey'); //<3>
tframe.setText('NY','New York'); //<3>
spec.setTextFrame(tframe); //<4>
elem.setColorFrame(cframe);
graph.addElement(elem);
