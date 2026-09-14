dataset = [["State", "Quantity"], ["CA", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity"); //<2>
var frame = new DefaultTextFrame();
frame.setField("Quantity");
var spec = new TextSpec(); //<3>
spec.setColor(java.awt.Color(0xff0000));
elem.setTextFrame(frame);
elem.setTextSpec(spec); //<4>
graph.addElement(elem); //<5>
