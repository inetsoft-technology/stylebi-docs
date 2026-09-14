var zoomed = SelectionTree1.selectedObjects.length > 0; //<1>
graph.getCoordinate().setFullMap(!zoomed); //<2>
graph.getElement(0).setInPlot(!zoomed); //<3>
