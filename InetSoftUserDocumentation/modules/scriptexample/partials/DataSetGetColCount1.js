// Create a chart with two elements:
dataset = [["State", "Total", "Profit"],["NJ", 200, 25], ["NY", 300, 150]]; //<1>
graph = new EGraph();
var elem1 = new IntervalElement("State", "Total");
var elem2 = new IntervalElement("State", "Profit");
var frame = new StaticColorFrame(java.awt.Color.red);
elem2.setColorFrame(frame);
graph.addElement(elem1);
graph.addElement(elem2);


// Loop through the rows and columns, and place labels on the bars.
for (var i=0; i<dataset.getRowCount(); i++) { //<2>
  for (var j=0; j<dataset.getColCount(); j++) { //<3>
    var form = new LabelForm();
    form.setColor(java.awt.Color.black);
    form.setLabel(dataset.getData(j,i));
    form.setValues([dataset.getData(0,i),dataset.getData(j,i)-20]);
    graph.addForm(form)
  }
}
