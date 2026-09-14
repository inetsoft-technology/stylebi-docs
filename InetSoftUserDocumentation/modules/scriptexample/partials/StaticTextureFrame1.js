dataset = [["State","Quantity","Texture"],["NJ",200,1], ["NY",300,10]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new StaticTextureFrame(); //<2>
frame.setField("Texture");
elem.setTextureFrame(frame); //<3>
graph.addElement(elem);
