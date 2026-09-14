dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300], ["CT", 50], ["PA", 175]]; //<1>
graph = new EGraph();
var elem = new AreaElement("State", "Quantity");
var sscale = new CategoricalScale("State"); //<2>
sscale.setFill(true); //<3>
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(sscale, qscale); //<4>
graph.setCoordinate(coord);
graph.addElement(elem);
