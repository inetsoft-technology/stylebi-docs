dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
frame.setField("State");
var lspec = new LegendSpec(); //<2>
var tspec = new TextSpec(); //<3>
tspec.setColor(java.awt.Color(0xff0000))
lspec.setTitleTextSpec(tspec); //<4>
frame.setLegendSpec(lspec);
elem.setColorFrame(frame);
graph.addElement(elem);
