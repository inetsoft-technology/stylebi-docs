dataset = [["State","Quantity","Total"], ["NJ",200,30], ["NY",300,15],["PA",150,5]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new OvalShapeFrame("Total"); //<2>
frame.setFill(true); //<3>
elem.setShapeFrame(frame); //<4>
graph.addElement(elem);
