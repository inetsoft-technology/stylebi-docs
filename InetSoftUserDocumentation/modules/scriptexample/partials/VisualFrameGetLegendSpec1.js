var elem = graph.getElement(0);  //<1>
var frame = elem.getColorFrame(); //<2>
var spec = frame.getLegendSpec(); //<3>
spec.setBorderColor(java.awt.Color(0xff0000)); //<4>
