var coord = graph.getCoordinate(); //<1>
var xscale = coord.getXScale(); //<2>
var xspec = xscale.getAxisSpec(); //<3>
// Compact syntax: var xspec = graph.getCoordinate().getXScale().getAxisSpec();
xspec.setLineColor(java.awt.Color(0xff0000)); //<4>
