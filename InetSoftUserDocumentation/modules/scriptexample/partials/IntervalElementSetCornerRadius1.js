dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
elem.setCornerRadius(0.5); //<3>
graph.addElement(elem); //<4>
