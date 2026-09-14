dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LabelForm(); //<2>
form.setLabel("label1");
form.setValues(['NY', 100]);
var spec = new TextSpec(); //<3>
spec.setColor(new java.awt.Color(0xff0000));
form.setTextSpec(spec); //<4>
graph.addForm(form); //<5>
graph.addElement(elem);
