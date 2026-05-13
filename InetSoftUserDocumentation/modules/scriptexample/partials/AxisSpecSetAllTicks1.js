dataset = [["Date","Quantity"],
  [new Date(2023,0,1),120],[new Date(2023,1,1),150],
  [new Date(2023,2,1),130],[new Date(2023,3,1),170],
  [new Date(2023,4,1),160],[new Date(2023,5,1),190],
  [new Date(2023,6,1),210],[new Date(2023,7,1),180],
  [new Date(2023,8,1),200],[new Date(2023,9,1),230],
  [new Date(2023,10,1),220],[new Date(2023,11,1),250],
  [new Date(2024,0,1),140],[new Date(2024,1,1),160],
  [new Date(2024,2,1),150],[new Date(2024,3,1),190],
  [new Date(2024,4,1),180],[new Date(2024,5,1),210],
  [new Date(2024,6,1),230],[new Date(2024,7,1),200],
  [new Date(2024,8,1),220],[new Date(2024,9,1),250],
  [new Date(2024,10,1),240],[new Date(2024,11,1),270]]; //<1>
graph = new EGraph();
var elem = new LineElement("Date", "Quantity");
var tscale = new TimeScale("Date");
tscale.setType(TimeScale.MONTH);
tscale.setIncrement(1);
var aspec = new AxisSpec(); //<2>
var tspec = new TextSpec();
tspec.setFormat(java.text.SimpleDateFormat('yyyy'));
aspec.setTextSpec(tspec);
aspec.setLineColor(java.awt.Color(0xff0000));
aspec.setAllTicks(true); //<3>
tscale.setAxisSpec(aspec);
graph.setScale("Date", tscale);
graph.addElement(elem);