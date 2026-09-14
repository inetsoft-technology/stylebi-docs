var form = new LineForm(); //<1>
var equation = new ExponentialLineEquation(); //<2>
form.setLineEquation(equation); //<3>
form.setColor(java.awt.Color(0xff0000));
graph.addForm(form); //<4>
