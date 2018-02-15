var yearSelect = document.getElementById('yearSelect');
var semestreSelect = document.getElementById('semestreSelect');

var currentMonth = (new Date()).getMonth();
var currentYear = (new Date()).getFullYear();

// Defaults the year to current year
yearSelect.value = currentYear;

// Enable 2o Semestre.
if(currentMonth > 5){ // where 5 means Junho. 5 'Cause 2o Semestre starts at July or up.
  // If it's 2o Semestre
  semestreSelect.children[1].removeAttribute("disabled", "");
  document.getElementById('2s').removeAttribute("disabled", "");
  semestreSelect.value = "2oSem";
  changed();
} else {
  document.getElementById('1s').removeAttribute("disabled", "");
}
