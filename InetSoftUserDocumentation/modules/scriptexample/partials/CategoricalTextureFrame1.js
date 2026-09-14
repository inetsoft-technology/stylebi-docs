dataset = [["State","Quantity","Rep"], ["NJ",200,"John"], ["NY",300,"Sue"], \
["PA",75,"Sue"], ["CT", 120,"John"]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalTextureFrame(); //<2>
frame.setField("Rep");
elem.setTextureFrame(frame); //<3>
graph.addElement(elem);
