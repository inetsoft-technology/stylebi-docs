var coord = graph.getCoordinate(); //<1>
var yscale = coord.getYScale2(); //<2>
var yspec = yscale.getAxisSpec(); //<3>
// Compact syntax: var xspec = graph.getCoordinate().getYScale2().getAxisSpec();
yspec.setLineColor(java.awt.Color(0x00ff00)); //<4>
