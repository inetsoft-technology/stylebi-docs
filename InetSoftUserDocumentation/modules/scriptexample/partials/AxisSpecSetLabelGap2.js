var coord = graph.getCoordinate(); //<1>
var scale = coord.getYScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
// Compact syntax: var xspec = graph.getCoordinate().getXScale().getAxisSpec();

spec.setLabelGap(30);