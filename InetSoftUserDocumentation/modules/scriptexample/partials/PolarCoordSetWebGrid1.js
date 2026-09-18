dataset = [["Speed","Power","Defense","Stamina","Skill","Name"],
   [90,70,50,80,60,'Joe'],[60,50,90,60,80,'Jane'],[70,90,60,90,50,'Fred']]; //<1>
graph = new EGraph();
var elem = new LineElement();
elem.addDim("Speed");
elem.addDim("Power");
elem.addDim("Defense");
elem.addDim("Stamina");
elem.addDim("Skill");
var scale1 = new LinearScale("Speed");
var scale2 = new LinearScale("Power");
var scale3 = new LinearScale("Defense");
var scale4 = new LinearScale("Stamina");
var scale5 = new LinearScale("Skill");
var scales = [scale1, scale2, scale3, scale4, scale5];

for (var i = 0; i < scales.length; i++) {
   scales[i].setMax(100);
   scales[i].setMin(0);
   var spec = new AxisSpec();
   spec.setGridStyle(Chart.THICK_LINE); // <2>
   spec.setLineColor(java.awt.Color(0x000000));
   scales[i].setAxisSpec(spec);
}

var parallel = new ParallelCoord(scale1, scale2, scale3, scale4, scale5); //<3>
var polar = new PolarCoord(parallel); // <4>
polar.setWebGrid(true); // <5>
var frame = new CategoricalColorFrame("Name");
elem.setColorFrame(frame);
graph.addElement(elem);
graph.setCoordinate(polar); // <6>
