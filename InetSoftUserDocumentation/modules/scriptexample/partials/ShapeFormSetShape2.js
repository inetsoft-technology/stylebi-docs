

dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var logo = getImage("https://www.inetsoft.com/images/home/logo.gif");
var shape = new GShape.ImageShape();
shape.setImage(logo);
var form = new ShapeForm(); //<2>
form.setValues(['NJ',100]);
form.setShape(shape); //<3>
form.setSize(new java.awt.Dimension(150,40));
graph.addForm(form); //<4>
graph.addElement(elem);
