dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
graph.addForm(new LineForm()); //<2>
graph.addForm(new LineForm()); //<2>
graph.addForm(new LineForm()); //<2>
var formCount = graph.getFormCount(); //<3>
for (var i=0; i<formCount; i++) {
  graph.getForm(i).addValues(['NJ',i*100]);
  graph.getForm(i).addValues(['NY',300]);
  graph.getForm(i).setColor(java.awt.Color(0xff0000));
}
graph.addElement(elem);
