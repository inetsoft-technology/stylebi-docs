dataset = [["State","Quantity"],["NJ",20000],["NY",30000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var sscale = new CategoricalScale("State");
var aspec = new AxisSpec(); //<2>
var frame = new StaticFontFrame(); //<3>
frame.setFont(java.awt.Font("Dialog", java.awt.Font.BOLD, 14));
aspec.setFontFrame(frame); //<4>
sscale.setAxisSpec(aspec);
graph.setScale("State", sscale);
graph.addElement(elem);