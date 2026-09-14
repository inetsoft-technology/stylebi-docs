dataset = [["State","Quantity"], ["NJ",300], ["NY",200]];  //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
frame = new StaticTextureFrame(); //<2>
frame.setTexture(GTexture.PATTERN_18);  //<3>
elem.setTextureFrame(frame); //<4>
graph.addElement(elem);
