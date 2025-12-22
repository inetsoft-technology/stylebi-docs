dataset = [["Direction", "Score"],[(Math.PI/2),20],[(Math.PI/4),30],[(Math.PI),35]]; //<1>
graph = new EGraph();
var elem = new PointElement("Direction", "Score");
var xscale = new LinearScale("Direction");
var yscale = new LinearScale("Score");
yscale.setMin(0);
yscale.setMax(40);
xscale.setMin(0);
xscale.setMax(1.95*Math.PI);
xscale.setIncrement(Math.PI/8);
var rect = new RectCoord(xscale,yscale);
var polar = new PolarCoord(rect); //<2>
polar.rotate(45); //<3>
polar.setType(PolarCoord.THETA);
graph.setCoordinate(polar); //<4>

graph.addElement(elem);