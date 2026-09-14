dataset = [["State", "City", "Product", "Quantity"],["NJ", "Piscataway", "P1", 200],
["NJ", "Edison", "P2", 100],["NY", "NYC", "P1", 300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("City", "Quantity");
var state = new CategoricalScale("State");
var city = new CategoricalScale("City");
var product = new CategoricalScale("Product");
var quantity = new LinearScale("Quantity");
var inner = new RectCoord(city, quantity); //<2>
var outer = new RectCoord(state, product); //<2>
var coord = new FacetCoord(outer,inner);  //<3>
graph.setCoordinate(coord); //<4>
graph.addElement(elem);
