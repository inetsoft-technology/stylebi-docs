dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
frame.setField("State");
var spec = new LegendSpec(); // <2>
spec.setSymbolRoundCorners(false); // <3>
frame.setLegendSpec(spec); // <4>
elem.setColorFrame(frame);
graph.addElement(elem);
