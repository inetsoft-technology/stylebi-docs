dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
elem = new AreaElement("State", "Quantity");  //<2>
graph.addElement(elem); //<3>