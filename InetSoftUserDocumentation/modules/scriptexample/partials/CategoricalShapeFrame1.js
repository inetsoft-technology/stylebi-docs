dataset = [["State","Quantity","Rep"], ["NJ",200,"John"], ["NY",300,"Sue"], \
["PA",75,"Sue"], ["CT", 120,"John"]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var frame = new CategoricalShapeFrame("Rep"); //<2>
elem.setShapeFrame(frame); //<3>
graph.addElement(elem);
