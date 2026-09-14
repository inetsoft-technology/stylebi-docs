var coord = graph.getCoordinate(); //<1>
var polar = new PolarCoord(coord); //<2>
polar.setType(PolarCoord.PLUS);
polar.setHoleRatio(.25); //<3>
graph.setCoordinate(polar); //<4>
