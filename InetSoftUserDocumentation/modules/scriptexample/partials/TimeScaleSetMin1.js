var date1 = new Date();
var date2 = new Date();
var minDate = new Date();
date1.setFullYear(2008,0,1);
date2.setFullYear(2009,0,1);
minDate.setFullYear(2005,0,1);
dataset = [["Date", "Quantity"], [date1,200], [date2,300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Date","Quantity");
var tscale = new TimeScale("Date"); //<2>
tscale.setMin(minDate); //<3>
graph.setScale("Date", tscale); //<4>
graph.addElement(elem);
