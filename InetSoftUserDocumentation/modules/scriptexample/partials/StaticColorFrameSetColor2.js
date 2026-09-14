dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticColorFrame(); //<2>
frame.setColor(java.awt.Color(0x00ff00)); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
