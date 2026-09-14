// Get a handle to the existing X-axis TextFrame:
var tframe = graph.getCoordinate().getXScale().getAxisSpec().getTextFrame();

// Get a handle to the graph element (bars):
var elem = graph.getElement(0);

// Compute the total amount of all companies:
var sumTotal = sum(data['Sum(Total)']);

// Loop through companies on chart:
for(i=1; i<data.length; i++) {

  // Get the original label (company):
  var oldLabel = data[i][0];

  // Compute the fractional value of corresponding 'Total':
  var barFraction = data[i][1]/sumTotal;

  // Format the fraction as a percent:
  var barPercent = formatNumber(barFraction,'##.00%');

  // Compose the new label, with form 'Company:Percent':
  var newLabel = oldLabel + ':\n' + barPercent;

  // Assign the new label in place of the old label:
   tframe.setText(oldLabel,newLabel);
}
