dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State"); //<2>
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(sscale, qscale); //<3>
sscale.setValues(["NY","NJ"]); //<4>
coord.transpose();
graph.setCoordinate(coord); //<5>
graph.addElement(elem);
