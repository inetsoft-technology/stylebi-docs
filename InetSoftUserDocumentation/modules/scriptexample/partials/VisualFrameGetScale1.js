var elem = graph.getElement(0); //<1>
var frame = elem.getColorFrame(); //<2>
var scale = frame.getScale(); //<3>
// Compact syntax: var scale = graph.getElement(0).getColorFrame().getScale();

scale.setMax(4000); //<4>
scale.setMin(700); //<4>
