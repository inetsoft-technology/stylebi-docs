var str = "";
// Loop through rows
for (var i = 0; i < dataset.getRowCount(); i++) {
  str = "";
  // Loop through columns
  for (var j = 0; j < dataset.getColCount(); j++) {
    str += dataset.getData(j, i) + ",";
  }
  // Output the results
  alert(str);
}
