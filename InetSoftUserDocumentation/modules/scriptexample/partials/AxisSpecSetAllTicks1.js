var rows = [["Date", "Quantity"]];
for (var i = 0; i < 90; i++) {
  rows.push([new Date(2023, 0, i + 1), 100 + i]);
}
dataset = rows; //<1>
graph = new EGraph();
var elem = new LineElement("Date", "Quantity");
var tscale = new TimeScale("Date");
tscale.setType(TimeScale.DAY);
tscale.setIncrement(1);
tscale.setMaxTicks(100);
var aspec = new AxisSpec(); //<2>
var tspec = new TextSpec();
tspec.setFormat(java.text.SimpleDateFormat('MMM'));
aspec.setTextSpec(tspec);
aspec.setLineColor(java.awt.Color(0xff0000));
aspec.setAllTicks(true); //<3>
tscale.setAxisSpec(aspec);
graph.setScale("Date", tscale);
graph.addElement(elem);