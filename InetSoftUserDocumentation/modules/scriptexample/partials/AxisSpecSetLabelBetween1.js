var date1 = new Date();
var date2 = new Date();
date1.setFullYear(2008,0,1);
date2.setFullYear(2008,10,1);
dataset = [["Date", "Quantity"], [date1,200], [date2,300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Date", "Quantity");
var tscale = new TimeScale("Date");
var aspec = new AxisSpec(); //<2>
aspec.setLabelBetween(true); //<3>
aspec.setLineColor(java.awt.Color(0xff0000)); //<4>
tscale.setAxisSpec(aspec);
graph.setScale("Date", tscale);
graph.addElement(elem);
