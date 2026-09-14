dataset = [["State","Quantity"],["NJ",100],["NY",4000]]; //<1>
graph = new EGraph();
var qscale = new LogScale(); //<2>
var elem = new IntervalElement("State", "Quantity");
qscale.setFields(["Quantity"]); //<3>
var coord = new RectCoord(new CategoricalScale("State"), qscale); //<4>
graph.setCoordinate(coord); //<5>
graph.addElement(elem);
