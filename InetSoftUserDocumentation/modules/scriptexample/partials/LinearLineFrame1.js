dataset = [["State", "Quantity","Total"], ["NJ",300,1000], ["NY",200,1500]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var lframe = new LinearLineFrame(); //<2>
var sframe = new StaticSizeFrame();
lframe.setField("Total"); //<3>
sframe.setSize(10);
elem.setLineFrame(lframe); //<4>
elem.setSizeFrame(sframe);
graph.addElement(elem);
