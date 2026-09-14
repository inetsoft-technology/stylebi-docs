dataset = [["Q1","Q2"], [300,200], [500,300]]; //<1>
graph = new EGraph();
var elem = new PointElement("Q1", "Q2");
elem.setHint(GraphElement.HINT_ALPHA,.8);
var sscale = new LinearScale("Q1");
var qscale = new LinearScale("Q2");
var coord = new RectCoord(sscale,qscale);
var spec = new PlotSpec(); //<2>
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
spec.setBackgroundImage(logo); //<3>
spec.setYMax(150);
spec.setYMin(100);
spec.setXMax(400);
spec.setXMin(100); //<4>
coord.setPlotSpec(spec); //<5>
graph.setCoordinate(coord);
graph.addElement(elem);
