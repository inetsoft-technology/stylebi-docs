dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
var shape = new GShape.ImageShape(); //<2>
shape.setImage(logo);
shape.setTile(true); //<3>
var frame = new StaticShapeFrame(shape); //<4>
elem.setShapeFrame(frame); //<5>
graph.addElement(elem);
