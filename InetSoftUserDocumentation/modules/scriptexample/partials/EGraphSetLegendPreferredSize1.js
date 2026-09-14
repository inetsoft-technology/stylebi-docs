dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
frame.setField("State");
elem.setColorFrame(frame);
graph.setLegendPreferredSize(150); //<2>
graph.addElement(elem);
