dataset = [["State", "Quantity"],["NJ",200],["NJ",100],["NY",-300],["NY",-400]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new IntervalElement("State", "Quantity");
range = new StackRange(); //<3>
range.setStackNegative(false); //<4>
qscale.setScaleRange(range); //<5>
graph.setScale("Quantity", qscale); //<6>
graph.addElement(elem);
