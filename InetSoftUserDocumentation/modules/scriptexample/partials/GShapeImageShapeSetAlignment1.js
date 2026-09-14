dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
var shape = new GShape.ImageShape(); //<2>
shape.setImage(logo); //<3>
shape.setAlignment(GShape.ImageShape.Alignment.TOP); //<4>
var frame = new CategoricalShapeFrame("State");
for(var i=0; i<dataset.getRowCount();i++) {
  frame.setShape(dataset.getData(0,i),shape); //<5>
}
elem.setShapeFrame(frame); //<6>
var sizeframe = new StaticSizeFrame(100);
elem.setSizeFrame(sizeframe);
graph.addElement(elem);
