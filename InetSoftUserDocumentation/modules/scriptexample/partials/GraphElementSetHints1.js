dataset = [["State", "Quantity"],["NY",200], ["NJ",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State","Quantity"); //<2>
elem.setHints({shine:"true", alpha:"0.5"}); //<3>
graph.addElement(elem); //<4>
