dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(sscale,qscale);
var spec = new PlotSpec(); // <2>
spec.setBackground(java.awt.Color(0xEEEEFF)); // <3>
coord.setPlotSpec(spec); // <4>
graph.setCoordinate(coord);
graph.addElement(elem);
