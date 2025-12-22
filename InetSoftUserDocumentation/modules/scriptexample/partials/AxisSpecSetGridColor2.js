var coord = graph.getCoordinate(); //<1>
var scale = coord.getYScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
// Compact syntax: var spec = graph.getCoordinate().getYScale().getAxisSpec();

spec.setGridColor(java.awt.Color(0xff0000));