dataset = [["State","Quantity","width"],["NJ",200,5],["NY",300,10],["PA",75,15]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var frame = new LinearSizeFrame(); //<3>
frame.setField("width");
frame.setSmallest(10);
frame.setLargest(50);
frame.setMax(100);
elem.setSizeFrame(frame); //<4>
graph.addElement(elem);  //<5>
