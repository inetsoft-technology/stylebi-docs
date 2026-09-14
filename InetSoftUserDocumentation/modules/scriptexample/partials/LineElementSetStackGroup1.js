dataset = [["State","Product","Quantity"],["NJ","P1",200],["NJ","P2",300],
["NY","P1",300],["NY","P2",100]]; //<1>
graph = new EGraph();
var elem = new LineElement("State", "Quantity"); //<2>
elem.setColorFrame(new CategoricalColorFrame("Product"));
elem.setStackGroup(true); //<3>
graph.addElement(elem); //<4>
