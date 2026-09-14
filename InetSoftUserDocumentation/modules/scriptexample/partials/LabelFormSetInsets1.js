dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LabelForm(); //<2>
form.setLabel("label1");
form.setValues(['NY', 100]);
var spec = new TextSpec();
spec.setBackground(java.awt.Color(0x00ff00));
form.setTextSpec(spec);
form.setInsets(new java.awt.Insets(0,15,0,15));  //<3>
graph.addForm(form); //<4>
graph.addElement(elem);
