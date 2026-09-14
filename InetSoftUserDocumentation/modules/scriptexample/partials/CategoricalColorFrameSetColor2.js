dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
frame = new CategoricalColorFrame(); //<2>
frame.setField("State");
frame.setColor('NJ',java.awt.Color(0xff0000)); //<3>
frame.setColor('NY',java.awt.Color(0xff00ff)); //<3>
elem.setColorFrame(frame); //<4>
graph.addElement(elem);
