dataset = [["State", "Quantity"],["NJ",200],["NY",300],["PA",50],["CT",100]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new HeatColorFrame(); //<2>
frame.setField("Quantity"); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
