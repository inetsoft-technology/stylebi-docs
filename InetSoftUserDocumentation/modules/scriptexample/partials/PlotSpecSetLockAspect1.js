dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
elem.setHint(GraphElement.HINT_ALPHA,.8);
var sscale = new CategoricalScale("State");
var qscale = new LinearScale("Quantity");
var coord = new RectCoord(sscale,qscale);
var spec = new PlotSpec(); //<2>
spec.setLockAspect(true); //<3>
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
spec.setBackgroundImage(logo);
coord.setPlotSpec(spec); //<4>
graph.setCoordinate(coord);
graph.addElement(elem);
