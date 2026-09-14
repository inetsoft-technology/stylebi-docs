dataset = [["State","Quantity","Size"],["NJ",200,1], ["NY",300,10]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticSizeFrame(); //<2>
frame.setField("Size");
elem.setSizeFrame(frame); //<3>
graph.addElement(elem);
