dataset = [["Product","Quantity"],["Widget\nModel A\nSeries 1",5000],
["Gadget\nModel B\nSeries 2",8000],["Device\nModel C\nSeries 3",3000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Product", "Quantity");
var cscale = new CategoricalScale("Product");
var aspec = new AxisSpec(); //<2>
aspec.setTruncate(true);
aspec.setLastOrAll(true); //<3>
cscale.setAxisSpec(aspec);
graph.setScale("Product", cscale);
graph.addElement(elem);
