dataset = [["State","Quantity"],["Sun",100],["Mon",300],["Tue",null],
["Wed",400],["Thur",600],["Fri",550],["Sat",200]]; //<1>
graph = new EGraph();
elem = new LineElement("State", "Quantity"); //<2>
elem.setIgnoreNull(false); // <3>
graph.addElement(elem);//<4>
