var elem = graph.getElement(0); //<1>
var frame = elem.getTextFrame(); //<2>
// Compact syntax: var frame = graph.getElement(0).getTextFrame();

frame.setText('NJ','New Jersey'); // <3>
frame.setText('NY','New York'); //<3>
