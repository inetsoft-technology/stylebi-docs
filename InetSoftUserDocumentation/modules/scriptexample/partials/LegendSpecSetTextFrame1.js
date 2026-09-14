
dataset = [["State", "Quantity"], ["NJ",200], ["NY",300]]; //<1>
graph = new EGraph();
var elem = new IntervalElement("State", "Quantity");
var frame = new CategoricalColorFrame();
var tf = new DefaultTextFrame(); //<2>
frame.setField("State");
tf.setText('NJ','New Jersey');
tf.setText('NY','New York');
var spec = new LegendSpec(); //<3>
spec.setTextFrame(tf); //<4>
frame.setLegendSpec(spec);
elem.colorFrame = frame;
graph.addElement(elem);
