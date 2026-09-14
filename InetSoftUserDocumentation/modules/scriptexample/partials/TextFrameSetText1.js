dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var tframe = new DefaultTextFrame("State"); //<2>
tframe.setText('NJ','New Jersey'); //<3>
tframe.setText('NY','New York'); //<3>
elem.setTextFrame(tframe); //<4>
graph.addElement(elem);
