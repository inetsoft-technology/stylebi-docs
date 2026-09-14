dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(); //<2>
coord.setXScale(sscale);
coord.setYScale(qscale); //<3>
graph.setCoordinate(coord); //<4>
graph.addElement(elem);
