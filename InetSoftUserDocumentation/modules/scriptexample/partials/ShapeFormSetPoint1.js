dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var shape1 = new ShapeForm(); //<2>
var shape2 = new ShapeForm(); //<2>
shape1.setPoint(new java.awt.Point(150, 100)); //<3>
shape1.setShape(GShape.FILLED_TRIANGLE);
shape1.setColor(java.awt.Color(0xff0000));
shape1.setSize(new java.awt.Dimension(10,10));
shape2.setPoint(new java.awt.geom.Point2D.Double(.5,.5)); //<4>
shape2.setShape(GShape.FILLED_TRIANGLE);
shape2.setColor(java.awt.Color(0xff0000));
shape2.setSize(new java.awt.Dimension(20,20));
graph.addForm(shape1); //<5>
graph.addForm(shape2); //<5>
graph.addElement(elem);