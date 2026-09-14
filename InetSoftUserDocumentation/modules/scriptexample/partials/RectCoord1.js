dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State"); //<2>
var qscale = new LinearScale("Quantity"); //<2>
var coord = new RectCoord(sscale,qscale); //<3>
graph.setCoordinate(coord); //<4>
graph.addElement(elem);
