dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var titlespec = new TitleSpec();
var textspec = new TextSpec(); //<2>
textspec.setColor(java.awt.Color(0xff0000)); //<3>
titlespec.setLabel("X Title");
titlespec.setTextSpec(textspec); //<4>
graph.setXTitleSpec(titlespec);
graph.addElement(elem);
