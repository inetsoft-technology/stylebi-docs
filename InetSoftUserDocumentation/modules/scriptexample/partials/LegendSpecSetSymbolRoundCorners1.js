dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
frame.setField("State");
var spec = new LegendSpec(); // <2>
spec.setSymbolRoundCorners(false); // <3>
spec.setSymbolSize(40); // <4>
var tspec = new TextSpec();
tspec.setFont(java.awt.Font('Dialog', java.awt.Font.PLAIN, 20)); // <5>
spec.setTextSpec(tspec);
frame.setLegendSpec(spec); // <6>
elem.setColorFrame(frame);
graph.addElement(elem);
