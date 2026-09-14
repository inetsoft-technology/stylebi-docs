dataset = [["Quantity","Total","Returns"],[200,800,10],[175,1000,15],[50,300,20]]; //<1>
graph = new EGraph();
var elem = new LineElement();
var qscale = new LinearScale("Quantity"); //<2>
var tscale = new LinearScale("Total"); //<2>
var rscale = new LinearScale("Returns"); //<2>
var coord = new ParallelCoord(qscale,tscale,rscale); //<3>
elem.addDim("Quantity");
elem.addDim("Total");
elem.addDim("Returns");
graph.addElement(elem);
graph.setCoordinate(coord); //<4>
