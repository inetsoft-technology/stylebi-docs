dataset = [["City" , "State", "Quantity"],["NJ","Edison",2500],
["NJ","Piscataway",3000], ["NY","NY City",5000],["NY","Yonkers",450]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("City","Quantity"); //<2>
elem.addDim("State"); //<3>
graph.addElement(elem); //<4>
