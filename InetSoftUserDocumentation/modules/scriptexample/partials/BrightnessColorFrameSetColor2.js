dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new BrightnessColorFrame(); //<2>
frame.setField("Quantity"); //<3>
frame.setColor(java.awt.Color(0xff0000)); //<4>
elem.setColorFrame(frame); //<5>
graph.addElement(elem);
