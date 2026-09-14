dataset = [["State","Quantity","Total"], ["NJ",200,10000], ["NY",300,8000]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var elem2 = new PointElement("State", "Total");
var cframe = new CategoricalColorFrame(); //<2>
cframe.init("Quantity", "Total"); //<3>
elem.setColorFrame(cframe); //<4>
elem2.setColorFrame(cframe); //<4>
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var qscale2 = new LinearScale("Total");
var coord = new RectCoord();
coord.setXScale(sscale);
coord.setYScale(qscale);
coord.setYScale2(qscale2);
graph.setCoordinate(coord);
graph.addElement(elem);
graph.addElement(elem2);
