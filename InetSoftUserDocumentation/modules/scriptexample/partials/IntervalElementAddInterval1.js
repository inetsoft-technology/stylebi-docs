dataset = [["Student","Bottom Score","Top Score"],["Joe",70,80],
["Eric",50,90],["Jane",90,100], ["Sue",40,45]]; //<1>
graph = new EGraph();
var elem = new IntervalElement(); //<2>
elem.addDim("Student");
elem.addInterval("Bottom Score","Top Score"); //<3>
graph.addElement(elem); //<4>
