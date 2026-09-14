dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]];  //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var rect1 = new RectForm(); //<2>
var rect2 = new RectForm(); //<2>
rect1.setTopLeftPoint(new java.awt.Point(100, 100)); //<3>
rect1.setBottomRightPoint(new java.awt.Point(150, 50));
rect1.setColor(java.awt.Color(0xff0000));
rect2.setTopLeftPoint(new java.awt.geom.Point2D.Double(.5,.8)); //<4>
rect2.setBottomRightPoint(new java.awt.geom.Point2D.Double(.8,.5));
rect2.setColor(java.awt.Color(0xff00ff));
graph.addForm(rect1); //<5>
graph.addForm(rect2); //<5>
graph.addElement(elem);
