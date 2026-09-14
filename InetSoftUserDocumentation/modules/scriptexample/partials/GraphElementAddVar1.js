dataset = [["State", "Quantity", "Total"],["NY",550,2500],["NJ",370,3000]]; //<1>
graph = new EGraph();
var elem = new LineElement("State","Quantity"); //<2>
elem.addVar("Total"); //<3>
graph.addElement(elem); //<4>
