var form = new LineForm(); //<1>
var equation = new LogarithmicLineEquation();
form.setLineEquation(equation); //<2>
form.setColor(java.awt.Color(0xff0000));
graph.addForm(form); //<3>
