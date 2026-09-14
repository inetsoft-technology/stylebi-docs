dataset = [["State", "Quantity"], ["NJ", 300], ["NY", 200]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity"); //<2>
var frame = new StaticTextureFrame(); //<3>
frame.setTexture(GTexture.PATTERN_18);
elem.setTextureFrame(frame); //<4>
graph.addElement(elem); //<5>
