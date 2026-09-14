dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticSizeFrame(); //<2>
frame.setMax(100);
frame.setSize(50); //<3>
elem.setSizeFrame(frame);  //<4>
graph.addElement(elem);
