dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form1 = new LabelForm(); //<2>
var form2 = new LabelForm(); //<2>
form1.setLabel("label1");
form2.setLabel("label2");
form1.setPoint(new java.awt.Point(50, 100)); //<3>
form2.setPoint(new java.awt.geom.Point2D.Double(.5,.7)); //<4>
graph.addForm(form1); //<5>
graph.addForm(form2); //<5>
graph.addElement(elem);
