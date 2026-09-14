dataset = [["State","Quantity","Total"], ["NJ",100,0], ["NY",1500,30000]]; //<1>
graph = new EGraph();
var qscale = new LogScale(); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setDataFields(["Total"]); //<3>
graph.addElement(elem);
graph.setScale("Quantity", qscale); //<4>
