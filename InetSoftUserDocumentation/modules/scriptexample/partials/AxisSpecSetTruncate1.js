dataset = [["Product","Quantity"],["Portable Bluetooth Speaker",5000],
["Ultra HD Smart Television",8000],["Noise Cancelling Headphones",3000],
["High Performance Laptop",7000],["Wireless Gaming Controller",4000]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Product", "Quantity");
var cscale = new CategoricalScale("Product");
var aspec = new AxisSpec(); //<2>
aspec.setTruncate(true); //<3>
cscale.setAxisSpec(aspec);
graph.setScale("Product", cscale);
graph.addElement(elem);
