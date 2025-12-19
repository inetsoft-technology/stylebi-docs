var coord = graph.getCoordinate(); //<1>
var scale = coord.getYScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
var textspec = spec.getTextSpec(); //<4>
// Compact syntax: textspec = graph.getCoordinate().getYScale().getAxisSpec().getTextSpec();

textspec.setFormat(java.text.DecimalFormat("##,###.00"));