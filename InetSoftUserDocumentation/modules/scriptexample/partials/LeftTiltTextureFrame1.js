dataset = [["State", "Quantity","Total"], ["NJ",300,10],["NY",200,20],["PA",250,35]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new LeftTiltTextureFrame("Total"); //<2>
elem.setTextureFrame(frame); //<3>
graph.addElement(elem);
