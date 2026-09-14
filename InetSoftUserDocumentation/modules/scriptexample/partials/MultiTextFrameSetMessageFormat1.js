var tframe = new MultiTextFrame(); //<1>
tframe.setFields("Customer:Region", "Sum(Product:Price)", "Sum(Product:Total)"); //<2>
tframe.setMessageFormat(new java.text.MessageFormat("Region: {0}\nPrice: {1}\nTotal: {2}")); //<3>
graph.getElement(0).setTextFrame(tframe); //<4>
