var coord = graph.getCoordinate(); //<1>
var scale = coord.getXScale(); //<2>
var spec = scale.getAxisSpec(); //<3>
// Compact syntax: var spec = graph.getCoordinate().getXScale().getAxisSpec();

var frame = new StaticFontFrame();
frame.setFont(java.awt.Font("Dialog", java.awt.Font.BOLD, 14));
spec.setFontFrame(frame);