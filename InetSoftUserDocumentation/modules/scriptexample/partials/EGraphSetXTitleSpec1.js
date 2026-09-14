dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var spec = new TitleSpec(); //<2>
spec.setLabel("X Title")
graph.setXTitleSpec(spec); //<3>
graph.addElement(elem);
