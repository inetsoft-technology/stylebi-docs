dataset = [["State","Hi","Upper","Median","Lower","Lo"],["NJ",200,180,150,120,100],
["NJ",220,170,140,110,105],["NY",300,250,230, 150,80]]; //<1>
graph = new EGraph();
var elem = new SchemaElement(); //<2>
elem.addDim("State");
elem.addSchema("Hi","Upper","Median","Lower","Lo");
elem.setPainter(new BoxPainter());
graph.addElement(elem); //<3>
