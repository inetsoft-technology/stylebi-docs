dataset = [["Quantity","Total","Returns"],[50,50,100],[75,100,25],[100,100,0]]; //<1>
graph = new EGraph();
var elem = new PointElement();
var qscale = new LinearScale("Quantity"); //<2>
qscale.setMin(0);
qscale.setMax(200);
var spec = new AxisSpec();
spec.setGridStyle(Chart.DOT_LINE);
spec.setGridColor(java.awt.Color.red);
qscale.setAxisSpec(spec);
var coord = new TriCoord(); //<3>
coord.setScale(qscale); //<4>
elem.addDim("Quantity"); //<5>
elem.addDim("Total"); //<6>
elem.addVar("Returns"); //<7>
graph.addElement(elem);
graph.setScale("Quantity", qscale);
graph.setScale("Total", qscale);
graph.setScale("Returns", qscale);
graph.setCoordinate(coord); //<8>
