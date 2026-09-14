dataset = [["State", "Quantity"], ["NJ",200], ["NY",290]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new GradientColorFrame(); //<2>
frame.setField("Quantity");
frame.setScaleOption(Scale.TICKS); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
