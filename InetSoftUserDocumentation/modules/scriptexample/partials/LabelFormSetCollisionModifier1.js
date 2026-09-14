dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form1 = new LabelForm(); //<2>
var form2 = new LabelForm(); //<2>
form1.setLabel("label1");
form1.setValues(['NY', 100]);
form2.setLabel("label2");
form2.setValues(['NY', 100]);
form1.setCollisionModifier(VLabel.MOVE_FREE); //<3>
graph.addForm(form1); //<4>
graph.addForm(form2); //<4>
graph.addElement(elem);
