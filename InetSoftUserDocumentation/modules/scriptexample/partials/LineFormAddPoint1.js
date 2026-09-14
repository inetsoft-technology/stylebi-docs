dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form1 = new LineForm(); //<2>
var form2 = new LineForm(); //<2>
form1.addPoint(new java.awt.Point(100, 0)); //<3>
form1.addPoint(new java.awt.Point(100, 200)); //<3>
form1.addPoint(new java.awt.Point(200,100)); //<3>
form1.setColor(java.awt.Color(0xff0000));
form2.addPoint(new java.awt.geom.Point2D.Double(.5,0)); //<4>
form2.addPoint(new java.awt.geom.Point2D.Double(.5,.7)); //<4>
form2.addPoint(new java.awt.geom.Point2D.Double(.7,.5)); //<4>
form2.setColor(java.awt.Color(0xff00ff));
graph.addForm(form1); //<5>
graph.addForm(form2); //<5>
graph.addElement(elem);
