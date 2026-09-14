dataset = [["State","Quantity"],["NJ",200],["NY",300],["NY",305]]; //<1>
graph = new EGraph();
var elem = new PointElement("State", "Quantity");
var form1 = new TagForm(); //<2>
var form2 = new TagForm(); //<2>
form1.setLabel("label1"); //<3>
form1.setValues(['NY', 300]); //<4>
form2.setLabel("label2"); //<3>
form2.setValues(['NY', 305]); //<4>
graph.addForm(form1); //<5>
graph.addForm(form2); //<5>
graph.addElement(elem);
