dataset = [["State","Quantity"],["NJ",200], ["NJ",300],["NY",300],["NY",100]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var scale = new LinearScale("Quantity");
var frame = new HeatColorFrame();
frame.setField("Quantity");
elem.setColorFrame(frame);
var tframe = new DefaultTextFrame('Quantity');
var textspec = new TextSpec();
textspec.setFont(java.awt.Font('Verdana',java.awt.Font.BOLD, 14));
elem.setTextSpec(textspec);
elem.setTextFrame(tframe); //<3>
elem.setAutoTextColor(true); //<4>
elem.setStackGroup(true);
elem.setCollisionModifier(GraphElement.STACK_SYMMETRIC);
graph.addElement(elem); //<5>
