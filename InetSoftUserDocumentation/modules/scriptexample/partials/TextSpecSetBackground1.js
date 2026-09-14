dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LabelForm();
form.setLabel("label1");
form.setValues(['NY', 100]);
var spec = new TextSpec(); //<2>
spec.setBackground(java.awt.Color(0xcccccc)); //<3>
form.setTextSpec(spec); //<4>
graph.addForm(form);
graph.addElement(elem);
