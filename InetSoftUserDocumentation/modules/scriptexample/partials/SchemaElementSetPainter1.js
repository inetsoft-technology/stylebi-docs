dataset = [["State", "Hi", "Lo", "Open", "Close"],["NJ", 200, 100, 120, 150],
["NY", 300, 100, 200, 120]]; //<1>
graph = new EGraph();
var elem = new SchemaElement(); //<2>
elem.addDim("State");
elem.addSchema("Hi", "Close", "Lo"); //<3>
elem.setPainter(new StockPainter());
graph.addElement(elem); //<4>
