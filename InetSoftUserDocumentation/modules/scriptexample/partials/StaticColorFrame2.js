dataset = [["State","Quantity","Color"], ["NJ",200,0xff0000], ["NY",300,0xff00ff]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticColorFrame(); //<2>
frame.setField("Color"); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
