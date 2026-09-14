dataset = [["Date", "Quantity"], [new Date(2008,8,1),200], [new Date(2008,10,1),400],
[new Date(2009,0,1),300], [new Date(2009,1,1),900]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Date","Quantity");
var tscale = new TimeScale("Date"); //<2>
tscale.setType(TimeScale.YEAR); //<3>
graph.setScale("Date", tscale); //<4>
graph.addElement(elem);
