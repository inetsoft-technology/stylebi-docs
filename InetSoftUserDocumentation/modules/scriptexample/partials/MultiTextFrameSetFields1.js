dataset = [["State", "Name", "Quantity"], ["NJ", "New Jersey", 200], ["NY", "New York", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var mtframe = new MultiTextFrame(); //<2>
mtframe.setFields("Name","Quantity"); //<3>
elem.setTextFrame(mtframe); //<4>
graph.addElement(elem);
