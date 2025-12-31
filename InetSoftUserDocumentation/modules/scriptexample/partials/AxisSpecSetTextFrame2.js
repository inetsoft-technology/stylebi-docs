var coord = graph.getCoordinate(); //<1>
var scale = coord.getXScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
// Compact syntax: var spec = graph.getCoordinate().getXScale().getAxisSpec();

var tframe = new DefaultTextFrame();
tframe.setText('NJ','New Jersey');
tframe.setText('NY','New York');
spec.setTextFrame(tframe);