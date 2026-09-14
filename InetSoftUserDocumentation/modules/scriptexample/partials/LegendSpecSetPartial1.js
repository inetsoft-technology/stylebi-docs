dataset = [["State", "Quantity"], ["New Jersey",200], ["New York",300], ["Pennsylvania",120],
["Connecticut",450], ["New Mexico",200],["Colorado",300], ["Oregon",200],
["Kentucky",300], ["California",100],  ["Alaska",350], ["Alabama",200],
["Kansas",500],  ["Texas",200], ["North Dakota",300], ["Maryland",200],
["Delaware",250],  ["Washington",200], ["Vermont",75]]; //<1>

graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
frame.setField("State");
var spec = new LegendSpec(); //<2>
spec.setPartial(true); //<3>
frame.setLegendSpec(spec); //<4>
elem.setColorFrame(frame);
graph.addElement(elem);
