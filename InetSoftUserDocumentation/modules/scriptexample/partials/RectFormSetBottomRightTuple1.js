dataset = [["State", "Quantity"], ["NJ", 200], ["NY", 300]]; //<1>
graph = new EGraph();
var rect = new RectForm(); //<2>
rect.setTopLeftTuple([1,200]);
rect.setBottomRightTuple([2,50]); //<3>
rect.setColor(java.awt.Color(0xff0000));
graph.addForm(rect); //<4>
graph.addElement(new IntervalElement("State", "Quantity"));
