var date1 = new Date();
var date2 = new Date();
var maxDate = new Date();
date1.setFullYear(2008,0,1);
date2.setFullYear(2009,0,1);
maxDate.setFullYear(2011,0,1);
dataset = [["Date", "Quantity"], [date1,200], [date2,300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Date","Quantity");
var tscale = new TimeScale(); //<2>
tscale.setFields(["Date"]);
tscale.setMax(maxDate);
graph.setScale("Date", tscale); //<3>
graph.addElement(elem);
