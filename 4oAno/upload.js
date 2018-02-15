// $("#filenameInput").alphanum({
//       disallow: ".&[]#/"
// });

function seeUpload(){
  document.getElementById('upp').classList.add("btn-info");
  document.getElementsByName('estruturas')[0].classList.remove("btn-mdb");
  document.getElementsByName('gestao')[0].classList.remove("btn-mdb");
  document.getElementsByName('instalacoes')[0].classList.remove("btn-mdb");
  document.getElementsByName('antropologia')[0].classList.remove("btn-mdb");
  document.getElementsByName('edificacoes')[0].classList.remove("btn-mdb");
  document.getElementsByName('betao2')[0].classList.remove("btn-mdb");

  document.getElementById('ctable').setAttribute("hidden", "");
  document.getElementById('cupload').removeAttribute("hidden");

}




function goUpload() {
  var upbutton = document.getElementById('upload_')
  var selectedFile = document.getElementById('fileUploadInput').files[0];
  var selectedFileValue = document.getElementById('fileUploadInput').value;

  var selectedCadeiraName = document.getElementById('disciplinasSelect').value;
  var fileRawGivenName = document.getElementById('filenameInput').value;

  var percentshow = document.getElementById("percentshow");
  var pauseicon = document.getElementById("pauseIcon");
  var resumeicon = document.getElementById("resumeIcon");

  var databaseRef = firebase.database().ref("/4oAno/");
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
    var storageRef = firebase.storage().ref('Engenheiros/4oAno' + selectedCadeiraName + "/" + ogName);
    document.getElementById('upload_').setAttribute("disabled", "");

    // Upload the file now
    task = storageRef.put(selectedFile);

    task.on('state_changed',

        function progress(snapshot){
          var percentageRaw = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          var percentage = Math.round(percentageRaw * 100) / 100;
          if (percentage > 2) {
            percentage-=1
          }
          document.getElementById("p1").style.width = percentage + "%";
          progressChip.style.display = "block";
          percentshow.innerHTML = percentage+ "%";
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
        },

        function complete(){
          document.getElementById('upload_').removeAttribute("disabled", "");
          console.log("upload complete!");
          progressChip.style.display="none";
          p1.style.width="100%";


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
  document.getElementById("pauseIcon").style.display="none";
  document.getElementById("resumeIcon").style.display="inline-block";
  spinner.classList.remove("is-active");

  var pauseTask = task;
  pauseTask.pause();

}

function resumeUpload(){
  document.getElementById("resumeIcon").style.display="none";
  document.getElementById("pauseIcon").style.display="inline-block";
  spinner.classList.add("is-active");
  var resumeTask = task;
  resumeTask.resume();
}

function cancelUpload() {
  progressChip.style.display="none";
  document.getElementById('upload_').removeAttribute("disabled", "");
  p1.style.width="0%";

  var cancelTask = task;
  cancelTask.cancel();
  console.log("cancelled");
}
