dataset = [["State","Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
textureframe = new CategoricalTextureFrame("State"); //<2>
textureframe.setTexture('NJ',GTexture.PATTERN_18); //<3>
textureframe.setTexture('NY',GTexture.PATTERN_14); //<3>
elem.setTextureFrame(textureframe); //<4>
graph.addElement(elem);
