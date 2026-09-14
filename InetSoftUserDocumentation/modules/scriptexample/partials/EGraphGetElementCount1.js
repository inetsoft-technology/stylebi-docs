dataset = [["State","Total 1","Total 2"], ["NJ",200,500], ["NY",300,400]]; //<1>
graph = new EGraph();
graph.addElement(new LineElement("State","Total 1")); //<2>
graph.addElement(new LineElement("State","Total 2")); //<2>
var elemCount = graph.getElementCount(); //<3>
for (var i=0; i<elemCount; i++) {
  graph.getElement(i).endArrow = true;
}
