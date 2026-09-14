dataset = [["State", "Quantity"],["NJ", 200],["NY", 300],["PA", 25]];
dataset.setOrder('State',['PA','NY','NJ']); <1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
graph.addElement(elem);
