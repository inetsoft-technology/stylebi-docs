dataset = [["State","Quantity"],["NJ",200], ["NJ",300],["NY",300],["NY",100]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var scale = new LinearScale("Quantity");
var frame = new HeatColorFrame();
frame.setField("Quantity");
elem.setColorFrame(frame);
elem.setStackGroup(true); //<3>
elem.setCollisionModifier(GraphElement.STACK_SYMMETRIC);
graph.addElement(elem); //<4>
