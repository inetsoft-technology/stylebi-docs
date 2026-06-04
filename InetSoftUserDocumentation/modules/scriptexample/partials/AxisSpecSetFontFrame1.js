dataset = [["State", "Quantity"], ["NJ", 20000], ["NY", 30000], ["CA", 25000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var xscale = new CategoricalScale("State");
var yscale = new LinearScale("Quantity");
var aspec = new AxisSpec(); //<2>
var fontFrame = new inetsoft.graph.aesthetic.CategoricalFontFrame(); //<3>
fontFrame.setFont("NJ", new java.awt.Font("Arial", java.awt.Font.BOLD, 14));
aspec.setFontFrame(fontFrame); //<4>
xscale.setAxisSpec(aspec);
graph.setCoordinate(new RectCoord(xscale, yscale));
graph.addElement(elem);
