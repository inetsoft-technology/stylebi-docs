dataset = [["State", "Quantity"],["NJ",200],["NJ",100],["NY",400],["NY",300]]; //<1>
graph = new EGraph();
var qscale = new LinearScale("Quantity"); //<2>
var elem = new PointElement("State", "Quantity");
range = new StackRange(); // <3>
range.setGroupField("State"); // max of 200+100, 400+300 <4>
qscale.setScaleRange(range); //<5>
graph.setScale("Quantity", qscale); //<6>
graph.addElement(elem);
