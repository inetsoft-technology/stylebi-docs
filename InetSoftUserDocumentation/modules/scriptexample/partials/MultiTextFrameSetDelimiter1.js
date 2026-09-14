var tframe = new MultiTextFrame(); //<1>
tframe.setFields("Customer:Region", "Sum(Product:Price)", "Sum(Product:Total)"); //<2>
tframe.setDelimiter("\n"); //<3>
graph.getElement(0).setTextFrame(tframe); //<4>
