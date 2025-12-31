var coord = graph.getCoordinate(); //<1>
var yscale = coord.getYScale(); //<2>
var yspec = yscale.getAxisSpec(); //<3>
var xscale = coord.getXScale();
var xspec = xscale.getAxisSpec();
// Compact syntax: var xspec = graph.getCoordinate().getXScale().getAxisSpec();
// Compact syntax: var yspec = graph.getCoordinate().getYScale().getAxisSpec();

xspec.setLineColor(java.awt.Color(0xff0000));
yspec.setLineColor(java.awt.Color(0x00ff00));