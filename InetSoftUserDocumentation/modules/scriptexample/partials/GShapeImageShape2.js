dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
var shape = new GShape.ImageShape(logo); //<2>
var frame = new CategoricalShapeFrame("State");
frame.setShape("NJ", shape); //<3>
elem.setShapeFrame(frame); //<4>
graph.addElement(elem);
