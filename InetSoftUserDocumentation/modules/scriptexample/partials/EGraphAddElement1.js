dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new LineElement("State", "Quantity");
graph.addElement(elem); //<2>
