dataset = [["Quarter","Change"],["Q1",500],["Q2",-150],["Q3",200],["Q4",-100]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Quarter","Change"); //<2>
elem.setCollisionModifier(GraphElement.STACK_SYMMETRIC); //<3>
elem.setStackGroup(false); //<3>
elem.setStackNegative(false); //<3>
elem.setWaterfall(true); //<4>
elem.setBridgeLine(java.awt.Color(0x000000), GLine.THIN_LINE); //<5>
graph.addElement(elem); //<6>
