dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
sizeframe = new StaticSizeFrame("State");
sizeframe.setSize(10);
shapeframe = new CategoricalShapeFrame("State"); //<2>
shapeframe.setShape('NJ',GShape.FILLED_CIRCLE); // <3>
shapeframe.setShape('NY',GShape.FILLED_DIAMOND); //<3>
elem.setShapeFrame(shapeframe); // <4>
elem.setSizeFrame(sizeframe);
graph.addElement(elem);
