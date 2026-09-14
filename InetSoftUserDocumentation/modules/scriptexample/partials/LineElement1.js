dataset = [["State", "Quantity"], ["NJ", 100], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new LineElement("State", "Quantity"); //<2>
graph.addElement(elem); //<3>
