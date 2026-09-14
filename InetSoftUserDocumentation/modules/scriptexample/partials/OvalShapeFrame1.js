dataset = [["State","Quantity","Total"], ["NJ",200,30], ["NY",300,15],["PA",150,5]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new OvalShapeFrame("Total"); //<2>
elem.setShapeFrame(frame); //<3>
graph.addElement(elem);
