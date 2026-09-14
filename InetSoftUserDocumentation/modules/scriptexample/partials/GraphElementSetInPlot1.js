dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var scale = new LinearScale("Quantity");
scale.setMax(100); //<3>
graph.setScale("Quantity",scale);
elem.setInPlot(false); //<4>
graph.addElement(elem); //<5>
