dataset = [["State", "Quantity"],["NJ", 200],["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LabelForm(); //<2>
form.setLabel("label1");
form.setValues(['NY', 100]);
form.setXOffset(-50); //<3>
form.setYOffset(100); //<4>
graph.addForm(form); //<5>
graph.addElement(elem);
