dataset = [["State", "Quantity"],["NJ",200],["NY",300],["PA",50],["CT",100]];  //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new GradientColorFrame(); //<2>
frame.setFromColor(java.awt.Color(0x000000)); //<3>
frame.setToColor(java.awt.Color(0xff0000));
frame.setField("Quantity"); //<4>
elem.setColorFrame(frame); //<5>
graph.addElement(elem);
