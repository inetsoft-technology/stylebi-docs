dataset = [["State","Quantity"],["NJ",200],["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
frame = new CategoricalColorFrame(); //<2>
frame.setField("State");
frame.setColor('NJ',java.awt.Color(0xff0000));
var NJcolor = frame.getColor('NJ'); //<3>
frame.setColor('NY',NJcolor); //<4>
elem.setColorFrame(frame); //<5>
graph.addElement(elem);
