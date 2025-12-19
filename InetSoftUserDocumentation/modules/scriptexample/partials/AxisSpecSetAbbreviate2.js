var coord = graph.getCoordinate(); //<1>
var xscale = coord.getXScale(); //<2>
var xspec = xscale.getAxisSpec(); //<3>
// Compact syntax: var xspec = graph.getCoordinate().getXScale().getAxisSpec();

var tspec = new TextSpec();
tspec.setFormat(java.text.SimpleDateFormat('yyyy-MMMM'));
xspec.setTextSpec(tspec);
xspec.setAbbreviate(true);