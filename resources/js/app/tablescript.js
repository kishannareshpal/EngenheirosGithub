// Initialize Firebase
var config = {
    apiKey: "AIzaSyCg29yu31bTSVSFr0BUmonMEskj-EbnNBk",
    authDomain: "engenheirosproject.firebaseapp.com",
    databaseURL: "https://engenheirosproject.firebaseio.com",
    projectId: "engenheirosproject",
    storageBucket: "engenheirosproject.appspot.com"
};
firebase.initializeApp(config);

// GET THE SELECTED PAGE CADEIRA NAME;
var thisName;
var actualPageYear = document.getElementsByName('page_version')[0].content;
var rootRef;

var table = $('#table').DataTable({
        "searching": false,
        "bLengthChange": false,
        "bInfo": false,
        "responsive": true,
        "language": {
        "url": "../resources/datatable/portuguese.json"},
        "columnDefs": [{
            className: 'mdl-data-table__cell--non-numeric'
        }]
});


var test;
var tes1;
// $('#cadeirasButton').on('click', 'button', function () {
  // var $inputBtns = $('[class="btn btn-mdb"]');
  $('#cadeirasButton').on('click', 'button',function() {
      var getNameButton = this.name;
      // console.log(getValueButton);
      $('[class="btn btn-mdb"]').not("[name='" + getNameButton + "']").css('opacity', ".6");
      $("[name='" + getNameButton + "']").css('opacity', "1");
      document.getElementById('yearSelect').removeAttribute("disabled", "");
      document.getElementById('semestreSelect').removeAttribute("disabled", "");


      var selectedYear = document.getElementById('yearSelect').value;
      var selectedSemestre = document.getElementById('semestreSelect').value;

      document.getElementById('ctable').removeAttribute("hidden", "");
      document.getElementById('waitingText').innerHTML = this.innerHTML;
      document.getElementById('tableDiv').removeAttribute("hidden", "");

      document.getElementById('cupload').setAttribute("hidden", "");

      document.querySelector('#table_wrapper > div:nth-child(1)').setAttribute("hidden", "");
      document.querySelector('#table_wrapper > div:nth-child(3)').setAttribute("hidden", "");

      rootRef = firebase.database().ref( "/" + actualPageYear + "/" + selectedYear + "/" + selectedSemestre + "/" + getNameButton + "/");
      // 1st: Clear all possible values first.
      var dataSet = [];
      // table.clear().draw();

      // 2nd: GET THE key & values FROM REALTIME DATABSE AND POPULATE THE TABLE;
      // MODEL:  var dataset = [snap.child("name").val(), snap.val().Name];
      table.clear().draw();
      rootRef.on("value", function(datasnap) {
        // table.clear().draw();
        if(!datasnap.exists()){
          dataSet = ["Nenhum Ficheiro Encontrado", ""];
          table.rows.add([dataSet]).draw();
        } else {
          rootRef.on("child_added", function(snap) {
            dataSet = [snap.key, snap.val()];
            table.rows.add([dataSet]).draw();
            // check if data exists
            // if(snap.val() == "")
            document.querySelector('#table_wrapper > div:nth-child(1)').setAttribute("hidden", "");
            document.querySelector('#table_wrapper > div:nth-child(3)').removeAttribute("hidden", "");
          });
        }
      });






  });
// });
