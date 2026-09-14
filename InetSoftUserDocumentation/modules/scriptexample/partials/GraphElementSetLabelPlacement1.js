dataset = [["State", "Quantity"], ["CA", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity"); //<2>
var frame = new DefaultTextFrame();
frame.setField("Quantity");
elem.setTextFrame(frame);
elem.setLabelPlacement(Chart.BOTTOM); //<3>
graph.addElement(elem); //<4>
