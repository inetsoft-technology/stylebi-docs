
dataset = [["State", "Quantity"], ["NJ", 300], ["NY", 200]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var frame = new StaticLineFrame(); //<2>
frame.setLine(GLine.DOT_LINE); //<3>
elem.setLineFrame(frame); //<4>
graph.addElement(elem);
