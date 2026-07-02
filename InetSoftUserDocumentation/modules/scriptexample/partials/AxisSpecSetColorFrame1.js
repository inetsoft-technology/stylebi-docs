dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State");
var aspec = new AxisSpec(); //<2>
var frame = new CategoricalColorFrame(); //<3>
frame.setField("State");
frame.setColor("NJ", java.awt.Color(0xff0000));
frame.setColor("NY", java.awt.Color(0x0000ff));
aspec.setColorFrame(frame); //<4>
sscale.setAxisSpec(aspec);
graph.setScale("State", sscale);
graph.addElement(elem);