// $("#filenameInput").alphanum({
//       disallow: ".&[]#/"
// });

$("#filenameInput").alphanum({
   allow:    "-_{}|\\()&%@?;!±§~˜ˆ",
   disallow: ".&[]#/",
   allowOtherCharSets : true,
   allowLatin         : true
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function seeUpload(){
  $('[class="btn btn-mdb"]').not("[name='']").css('opacity', ".6");
  document.getElementById('yearSelect').setAttribute("disabled", "");
  document.getElementById('semestreSelect').setAttribute("disabled", "");
  document.getElementById('troncoSelect').setAttribute("disabled", "");


  document.getElementById('ctable').setAttribute("hidden", "");
  document.getElementById('cupload').removeAttribute("hidden");

  if(document.cookie.indexOf("tronco=") >= 0){
    var cookieTronco = getCookie("tronco");
    document.getElementById('up_troncoSelect').value = cookieTronco;
    document.getElementById('troncoSelect').value = cookieTronco;
  }

  tr();

}

if(document.cookie.indexOf("tronco=") >= 0){
  var cookieTronco = getCookie("tronco");
  document.getElementById('up_troncoSelect').value = cookieTronco;
  document.getElementById('troncoSelect').value = cookieTronco;
}

var checked;
var filenameInput;

function fileSelected(){
  filenameInput = document.getElementById('filenameInput');

  document.getElementById('useDefaultNameCheckbox').removeAttribute("disabled", "");
  document.getElementById('checklabel').classList.remove("is-disabled");

  if (checked) {
    var fn = document.getElementById('fileUploadInput').files[0].name;
    fn = fn.substring(0, fn.lastIndexOf('.'));
    fnNoPoint = fn.replace(/\./g, "_");
    filenameInput.value = fnNoPoint;
    // document.getElementById('filenameInput').setAttribute("disabled", "");
  } else {
    filenameInput.value = "";
    // document.getElementById('filenameInput').removeAttribute("disabled", "");
  }
}


function checkboxed(){
  checked = document.getElementById('useDefaultNameCheckbox').checked;
  console.log(checked);

  filenameInput = document.getElementById('filenameInput');

  if (checked) {
    var fn = document.getElementById('fileUploadInput').files[0].name;
    fn = fn.substring(0, fn.lastIndexOf('.'));
    fnNoPoint = fn.replace(/\./g, "_");
    filenameInput.value = fnNoPoint;
    // document.getElementById('filenameInput').setAttribute("disabled", "");
  } else {
    filenameInput.value = "";
    // document.getElementById('filenameInput').removeAttribute("disabled", "");
  }
}

var currentSemestre;
var sd;
function disc(e){
  currentSemestre = e.target[e.target.selectedIndex].parentNode.attributes[1].value.toString();
  sd = e;
}

function goUpload() {
  var upbutton = document.getElementById('upload_')
  var selectedFile = document.getElementById('fileUploadInput').files[0];
  var selectedFileValue = document.getElementById('fileUploadInput').value;

  var up_troncoSelect = document.getElementById('up_troncoSelect').value
  var selectedCadeiraName = document.getElementById('disciplinasSelect').value;

  var fileRawGivenName = document.getElementById('filenameInput').value;

  var progressChip = document.getElementById("progressChip");
  var percentshow = document.getElementById("percentshow");
  var pauseicon = document.getElementById("pauseIcon");
  var resumeicon = document.getElementById("resumeIcon");

  var databaseRef = firebase.database().ref("/" + actualPageYear + "/" + (new Date()).getFullYear().toString() + "/" + up_troncoSelect + "/" + currentSemestre + "/");
  var snackbarContainer = document.getElementById("toast");

  // Check if form has been filled:
  if((selectedFileValue === "") | ((fileRawGivenName === "") | (fileRawGivenName === " ")) | (selectedCadeiraName === "")){
    // If form is not yet filled completely
    var message = {message: "Por favor preencha todos os dados acima." };
    snackbarContainer.MaterialSnackbar.showSnackbar(message);

  // If form is filled
  } else {
    //Set the name of the OriginalSelectedFileName
    var ogName = selectedFile.name;

    // Create a storage ref
    var storageRef = firebase.storage().ref('Engenheiros/' + actualPageYear + "/" + (new Date()).getFullYear().toString() + "/" + up_troncoSelect + "/" + currentSemestre + "/" + selectedCadeiraName + "/" + ogName);
    document.getElementById('upload_').setAttribute("disabled", "");

    // Upload the file now
    task = storageRef.put(selectedFile);


    task.on('state_changed',
        function progress(snapshot){
          var percentageRaw = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          var percentage = Math.round(percentageRaw * 100) / 100;
          if (percentage > .2) {
            percentage-=.1
          }
          document.getElementById("p1").style.width = percentage + "%";
          progressChip.removeAttribute("hidden", "");
          percentshow.innerHTML = percentage+ "%";

          window.onbeforeunload = function(event){
              return confirm("Esta acção irá cancelar o upload do ficheiro.\nDeseja continuar?");
          };
        },

        function (error){
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              var message = {message: "Não tem permissão para efectuar a operação." };
              snackbarContainer.MaterialSnackbar.showSnackbar(message);
              break;

            case 'storage/canceled':
              // User canceled the upload
              document.getElementById('upload_').removeAttribute("disabled", "");
              var message = {message: "Operação cancelada." };
              snackbarContainer.MaterialSnackbar.showSnackbar(message);
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              var message = {message: "Erro no upload! Tente novamente." };
              snackbarContainer.MaterialSnackbar.showSnackbar(message);
              break;
          }

          window.onbeforeunload = function(event){
              return;
          };
        },

        function complete(){
          document.getElementById('upload_').removeAttribute("disabled", "");
          console.log("upload complete!");
          progressChip.setAttribute("hidden", "");
          p1.style.width="100%";

          window.onbeforeunload = function(event){
              return;
          };


          var message = {message: "Upload efectuado com sucesso!" };
          snackbarContainer.MaterialSnackbar.showSnackbar(message);

          // set the link to Firebase database
          var downloadURL = task.snapshot.downloadURL;
          var rawFileSize = task.snapshot.totalBytes;
          // get the date and time of upload and store it as a key on firebase
          var trc = task.snapshot.metadata.timeCreated;
          console.log(trc);
          var timeCreated = trc.substring(8, 10) + "-" + trc.substring(5, 7) + "-" + trc.substring(0, 4) + " pelas " + (parseInt(trc.substring(11, 13)) + 2) + ":" + trc.substring(14,16) + "m";

          var fileGivenName = "(" + timeCreated + ")" + " <b>" + fileRawGivenName;


          // Convert the size to Megabytes or Kilobytes acordingly for better usage data
          if (rawFileSize <= 999999) {
              var rawSizeInKB = rawFileSize / 1000;
              var sizeInKB = Math.round(rawSizeInKB * 100) / 100;
              // do something if the file accepts to convert to kilobytes..

              var arranged_downloadlink = "<a target='_blank' href=" + "'" + downloadURL + "'" + "class='mdl-button mdl-js-button mdl-color-text--white mdl-button--raised mdl-js-ripple-effect mdl-color--grey-800'><i class='material-icons mdl-color-text--white'>file_download</i>" + " (" + sizeInKB + " kB)" +  "</a>"
              // Put the file, inside /cadeira/, named after the inputText.
              // ..making a download button that when clicked exectutes * fileDownload();
              databaseRef.child(selectedCadeiraName + "/" + fileGivenName).set(arranged_downloadlink);


          } else if (rawFileSize > 999999) {
              var rawSizeInMB = rawFileSize / 1000000;
              var sizeInMB = Math.round(rawSizeInMB * 100) / 100;
              // do something if the file accepts to convert to megabytes..

              var arranged_downloadlink = "<a target='_blank' href=" + "'" + downloadURL + "'" + "class='mdl-button mdl-js-button mdl-color-text--white mdl-button--raised mdl-js-ripple-effect mdl-color--grey-800'><i class='material-icons mdl-color-text--white'>file_download</i>" + " (" + sizeInMB + " MB)" +  "</a>"
              // Put the file, inside /cadeira/, named after the inputText.
              // ..making a download button that when clicked exectutes * fileDownload();
              databaseRef.child(selectedCadeiraName + "/" + fileGivenName).set(arranged_downloadlink);

          };

        }
      );
    };
}

function pauseUpload() {
  document.getElementById("pauseIcon").setAttribute("hidden", "");
  document.getElementById("resumeIcon").removeAttribute("hidden", "");
  spinner.classList.remove("is-active");

  var pauseTask = task;
  pauseTask.pause();

}

function resumeUpload(){
  document.getElementById("resumeIcon").setAttribute("hidden", "");
  document.getElementById("pauseIcon").removeAttribute("hidden", "");
  spinner.classList.add("is-active");
  var resumeTask = task;
  resumeTask.resume();
}

function cancelUpload() {
  progressChip.setAttribute("hidden", "");
  document.getElementById('upload_').removeAttribute("disabled", "");
  p1.style.width="0%";

  var cancelTask = task;
  cancelTask.cancel();
  console.log("cancelled");

  window.onbeforeunload = function(event){
      return;
  };
}
