dataset = [["State", "Quantity", "width"], ["NJ", 200, 5],["NY", 300,10], ["PA",75,15]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new LinearSizeFrame(); //<2>
frame.setField("width"); //<3>
frame.setSmallest(10); //<4>
frame.setLargest(50);
frame.setMax(100);
elem.setSizeFrame(frame); //<5>
graph.addElement(elem);
