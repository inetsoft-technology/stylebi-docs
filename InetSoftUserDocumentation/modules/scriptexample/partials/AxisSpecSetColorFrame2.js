var coord = graph.getCoordinate(); //<1>
var scale = coord.getXScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
// Compact syntax: var spec = graph.getCoordinate().getXScale().getAxisSpec();

var frame = new CategoricalColorFrame();
frame.setField("State");
frame.setColor("NJ", java.awt.Color(0xff0000));
frame.setColor("NY", java.awt.Color(0x0000ff));
spec.setColorFrame(frame);