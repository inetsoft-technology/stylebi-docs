var form = new DefaultForm(); //<1>
form.setShape(new java.awt.geom.Rectangle2D.Double(100,100,200,200)); //<2>
form.setFill(true); //<2>
graph.addForm(form); //<3>
