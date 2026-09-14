var coord = graph.getCoordinate(); //<1>
var scale = coord.getYScale(); //<2>
var range = scale.getScaleRange();  //<3>
// Compact syntax: var range = graph.getCoordinate().getYScale().getScaleRange();

range.setAbsoluteValue(true); //<4>
