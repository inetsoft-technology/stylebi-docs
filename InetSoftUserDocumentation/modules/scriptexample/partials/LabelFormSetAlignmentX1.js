dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form1 = new LabelForm(); //<2>
var form2 = new LabelForm(); //<2>
form1.setLabel("label1");
form1.setPoint(new java.awt.Point(120, 100));
form2.setLabel("label2");
form2.setPoint(new java.awt.Point(120, 120));
form2.setAlignmentX(Chart.CENTER_ALIGNMENT); //<3>
graph.addForm(form1); //<4>
graph.addForm(form2); //<4>
graph.addElement(elem);
