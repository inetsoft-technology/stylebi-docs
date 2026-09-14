dataset = [["State","Quantity"],["NJ",100],["NY",300],["PA",200]]; //<1>
graph = new EGraph();
elem = new LineElement("State", "Quantity"); //<2>
elem.setClosed(true); //<3>
graph.addElement(elem); //<4>
