var arr = [["State","Quantity"], ["NJ",200], ["NY",300]];
dataset = new DefaultDataSet(arr);
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
graph.addElement(elem);
