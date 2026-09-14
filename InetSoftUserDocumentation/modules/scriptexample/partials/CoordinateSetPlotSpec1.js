var coord = graph.getCoordinate(); //<1>
var spec = new PlotSpec(); //<2>
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
spec.setBackgroundImage(logo);
spec.setAlpha(.3); //<3>
coord.setPlotSpec(spec); //<4>
