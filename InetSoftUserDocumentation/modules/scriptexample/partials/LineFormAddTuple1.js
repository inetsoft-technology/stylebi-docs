dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var form = new LineForm(); //<2>
form.addTuple([.5, 0]); //<3>
form.addTuple([.5, 200]); //<3>
form.addTuple([1,100]); //<3>
form.setColor(java.awt.Color(0xff0000));
graph.addForm(form); //<4>
graph.addElement(elem);
