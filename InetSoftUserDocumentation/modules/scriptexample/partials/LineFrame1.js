
dataset = [["State", "Quantity"], ["NJ",200], ["NY",300], ["PA",100]]; //<1>
graph = new EGraph();
var elem = new LineElement("State", "Quantity");
var frame = new StaticLineFrame(); //<2>
frame.setLine(GLine.DASH_LINE);
// or frame.setLine(new GLine(10,5));
elem.setLineFrame(frame); //<3>
graph.addElement(elem);
