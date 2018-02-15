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

var table = $('#table').DataTable({
        "searching": false,
        "bLengthChange": false,
        "bInfo": false,
        "responsive": true,
        "language": {
        "url": "../datatable/portuguese.json"},
        "columnDefs": [{
            className: 'mdl-data-table__cell--non-numeric'
        }]
});

function listen(e){

  document.getElementById('ctable').removeAttribute("hidden", "");
  document.getElementById('waitingText').innerHTML = e.toElement.innerHTML;
  document.getElementById('tableDiv').removeAttribute("hidden", "");
  thisName = e.target.name;
  // thisName = e;

  document.getElementById('cupload').setAttribute("hidden", "");

  document.querySelector('#table_wrapper > div:nth-child(1)').setAttribute("hidden", "");
  document.querySelector('#table_wrapper > div:nth-child(3)').setAttribute("hidden", "");

  var rootRef = firebase.database().ref( "/3oAno/" + thisName + "/");
  // 1st: Clear all possible values first.
  var dataSet = [];
  table.clear().draw();

    // 2nd: GET THE key & values FROM REALTIME DATABSE AND POPULATE THE TABLE;
    // MODEL:  var dataset = [snap.child("name").val(), snap.val().Name];
    rootRef.on("child_added", snap => {
      dataSet = [snap.key, snap.val()];
      table.rows.add([dataSet]).draw();
      // console.log(dataSet);
      // console.log(snap.child());
      console.log(snap.val()); //This is the correct for values
      console.log(snap.key);
      // document.getElementById('table_info').setAttribute("hidden", "");
      // document.getElementById('table_filter').setAttribute("hidden", "");
      document.querySelector('#table_wrapper > div:nth-child(1)').setAttribute("hidden", "");
      document.querySelector('#table_wrapper > div:nth-child(3)').removeAttribute("hidden", "");
    });


    if(thisName == "hidrgeral"){
      document.getElementsByName('hidrgeral')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "hidrgeral2") {
      document.getElementsByName('hidrgeral2')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "planeamento") {
      document.getElementsByName('planeamento')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "ptc") {
      document.getElementsByName('ptc')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "redes") {
      document.getElementsByName('redes')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "teoria") {
      document.getElementsByName('teoria')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('edpaz')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");

    } else if (thisName == "edpaz") {
      document.getElementsByName('edpaz')[0].classList.add("btn-mdb");
      document.getElementsByName('hidrgeral')[0].classList.remove("btn-mdb");
      document.getElementsByName('hidrgeral2')[0].classList.remove("btn-mdb");
      document.getElementsByName('planeamento')[0].classList.remove("btn-mdb");
      document.getElementsByName('ptc')[0].classList.remove("btn-mdb");
      document.getElementsByName('redes')[0].classList.remove("btn-mdb");
      document.getElementsByName('teoria')[0].classList.remove("btn-mdb");
      document.getElementById('upp').classList.remove("btn-info");
    }
}
