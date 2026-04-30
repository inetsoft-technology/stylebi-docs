dataset = [["State", "Product", "Name", "Priority"],["NJ", "P1", "Joe", 2],["NJ", "P2", "Sam", 3],
["NY", "P1", "Jane", 4],["NJ", "P1", "Sam", 1],["NJ", "P2", "Joe", 10],["NY", "P1", "Sam", 10]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("Name", "Priority");
var state = new CategoricalScale("State");
var name = new CategoricalScale("Name");
var product = new CategoricalScale("Product");
var priority = new LinearScale("Priority");
var inner = new RectCoord(name, priority);
var outer = new RectCoord(state, product);
var coord = new FacetCoord(outer, inner); //<2>
coord.setFacetGrid(true); //<3>
coord.setGridColor(java.awt.Color(0xFF0000));
graph.setCoordinate(coord);
graph.addElement(elem);
