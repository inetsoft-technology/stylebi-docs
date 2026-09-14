dataset = [["State", "Quantity"], ["CA", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity"); //<2>
var frame = new DefaultTextFrame(); //<3>
frame.setField("Quantity");
elem.setTextFrame(frame); //<4>
graph.addElement(elem);  //<5>
