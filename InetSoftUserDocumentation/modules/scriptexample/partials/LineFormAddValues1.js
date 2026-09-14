dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LineForm(); //<2>
form.addValues(['NJ', 0]); //<3>
form.addValues(['NJ', 200]); //<3>
form.addValues(['NY', 100]); //<3>
form.setColor(java.awt.Color(0xff0000));
graph.addForm(form); //<4>
graph.addElement(elem);
