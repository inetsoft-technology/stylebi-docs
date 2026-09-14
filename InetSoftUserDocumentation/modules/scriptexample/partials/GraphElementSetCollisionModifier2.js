dataset = [["State","Quantity"],["NJ",200],["NJ",200],["NJ",200],["NJ",200],["NJ",200],["NJ",300],
["NY",300],["NY",300],["NY",300],["NY",300],["NY",300],["NY",450]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity"); //<2>
var frame = new HeatColorFrame();
frame.setField("Quantity");
elem.setColorFrame(frame);
elem.setStackGroup(true);
elem.setCollisionModifier(GraphElement.MOVE_JITTER); //<3>
graph.addElement(elem); //<4>
