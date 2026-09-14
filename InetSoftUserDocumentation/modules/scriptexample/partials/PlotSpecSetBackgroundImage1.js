dataset = [["State","Quantity"], ["NJ",200], ["NY",300]];
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
elem.setHint(GraphElement.HINT_ALPHA,.8);
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(sscale,qscale);
var spec = new PlotSpec(); // <1>
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
spec.setBackgroundImage(logo); //<2>
coord.setPlotSpec(spec); //<3>
graph.setCoordinate(coord);
graph.addElement(elem);
