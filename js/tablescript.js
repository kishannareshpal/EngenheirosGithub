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

function listen(e){
  console.log(e.target.name);
  thisName = e.target.name;

  var rootRef = firebase.database().ref( thisName + "/");
  // 1st: SETUP THE TABLE
  var table = $('#table').on( 'processing.dt', function ( e, settings, processing ) {
      $('#processingIndicator').css( 'display', processing ? 'block' : 'none' );
        }).DataTable( {
          "bLengthChange": false,
          "bInfo": true,
          "responsive": true,
          "processing": true,
          "scrollX": true,
          "language": {
          "url": "/datatable/portuguese.json"},
          "Processing": "a processar...",
          "columnDefs": [{className: 'mdl-data-table__cell--non-numeric'}]
    });

    // 2nd: GET THE key & values FROM REALTIME DATABSE AND POPULATE THE TABLE;
    // MODEL:  var dataset = [snap.child("name").val(), snap.val().Nombre];
    rootRef.on("child_added", snap => {
      var dataSet = [snap.key, snap.val()];
      table.rows.add([dataSet]).draw();
      // console.log(dataSet);
      // console.log(snap.child());
      console.log(snap.val()); //This is the correct for values
      console.log(snap.key);
    });
}


$(document).ready(function(){
//TABLE STUFF:
  // First get the reference to the database (../cadeira/)


});//END OF onREADY
