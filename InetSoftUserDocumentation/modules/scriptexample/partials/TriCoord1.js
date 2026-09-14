dataset = [["Quantity","Total","Returns"],[50,50,100],[75,100,25],[100,100,0]]; //<1>
graph = new EGraph();
var elem = new PointElement();
var qscale = new LinearScale("Quantity"); //<2>
qscale.setMin(0);
qscale.setMax(200);
var spec = new AxisSpec();
spec.setGridStyle(Chart.DOT_LINE);
qscale.setAxisSpec(spec);
var coord = new TriCoord(qscale); //<3>
elem.addDim("Quantity"); //<4>
elem.addDim("Total"); //<5>
elem.addVar("Returns"); //<6>
graph.addElement(elem);
graph.setScale("Quantity", qscale);
graph.setScale("Total", qscale);
graph.setScale("Returns", qscale);
graph.setCoordinate(coord); //<7>
