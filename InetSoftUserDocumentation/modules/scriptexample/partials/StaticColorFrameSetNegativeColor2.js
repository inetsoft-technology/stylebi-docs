dataset = [["State", "Quantity"], ["NJ",200], ["NY",-300]];graph = new EGraph(); //<1>
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticColorFrame(); //<2>
frame.setField("Quantity");
frame.setColor(java.awt.Color(0x00ff00));
frame.setNegativeColor(java.awt.Color(0xff0000)); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
