
dataset = [["State","Quantity","Line"], ["NJ",200,Chart.THICK_LINE], ["NY",300,Chart.MEDIUM_DASH]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var sizeframe = new StaticSizeFrame(9);
var lineframe = new StaticLineFrame(); //<2>
lineframe.setField("Line");
elem.setLineFrame(lineframe); //<3>
elem.setSizeFrame(sizeframe);
graph.addElement(elem);
