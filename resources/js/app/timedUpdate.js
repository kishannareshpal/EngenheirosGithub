var yearSelect = document.getElementById('yearSelect');
var semestreSelect = document.getElementById('semestreSelect');

var currentMonth = (new Date()).getMonth();
var currentYear = (new Date()).getFullYear();

for (var y = 0; y < (currentYear-yearSelect.children[0].value)+1; y++){
  yearSelect.children[y].removeAttribute("disabled");
}

// Defaults the year to current year
yearSelect.value = currentYear;


// Enable 2o Semestre.
if(currentMonth > 5){ // where 5 means Junho. 5 'Cause 2o Semestre starts at July or up.
  // If it's 2o Semestre
  semestreSelect.children[1].removeAttribute("disabled", "");
  document.getElementById('1s').setAttribute("disabled", "");
  document.getElementById('2s').removeAttribute("disabled", "");
  semestreSelect.value = "2oSem";
  changed();
} else {
  // If it's 1o Semestre
  document.getElementById('1s').removeAttribute("disabled", "");
  document.getElementById('2s').setAttribute("disabled", "");
}
