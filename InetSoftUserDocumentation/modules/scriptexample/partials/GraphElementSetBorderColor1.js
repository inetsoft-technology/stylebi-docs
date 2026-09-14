dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var line = new StaticLineFrame(10);
var elem = new IntervalElement("State", "Quantity"); //<2>
elem.setLineFrame(line);
elem.setBorderColor(java.awt.Color(0x000000)); //<3>
graph.addElement(elem); //<4>
