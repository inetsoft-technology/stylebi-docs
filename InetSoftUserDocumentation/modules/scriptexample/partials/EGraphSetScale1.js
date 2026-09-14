dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]];
graph = new EGraph();
var elem = new LineElement("State", "Quantity");
var qscale = new LinearScale("Quantity"); <1>
qscale.setMin(100);
qscale.setMax(500);
graph.addElement(elem);
graph.setScale("Quantity", qscale); <2>
