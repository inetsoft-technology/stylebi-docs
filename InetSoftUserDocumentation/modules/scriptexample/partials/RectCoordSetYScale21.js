dataset = [["State","Quantity","Total"], ["NJ",200,10000], ["NY",300,8000]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var elem2 = new PointElement("State", "Total");
var cframe = new CategoricalColorFrame();
cframe.init("Quantity", "Total");
elem.setColorFrame(cframe);
elem2.setColorFrame(cframe);
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var qscale2 = new LinearScale("Total");
var coord = new RectCoord();  //<2>
coord.setXScale(sscale);
coord.setYScale(qscale);
coord.setYScale2(qscale2); //<3>
graph.setCoordinate(coord); //<4>
graph.addElement(elem);
graph.addElement(elem2);
