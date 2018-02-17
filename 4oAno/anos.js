var promise;

document.onreadystatechange = function () {
  var state = document.readyState;

  if (state == 'complete') {
      setTimeout(function(){
        // $("#loading").addClass("hidden");
        document.getElementById("loaded__").setAttribute("hidden", "");
        document.getElementById("main__").removeAttribute("hidden", "");
        document.getElementById('body').classList.remove("mdl-color--grey-900");
        document.getElementById('body').classList.add("mdl-color--grey-200");
      },1500);
  }
};


if(document.cookie.indexOf("signedin=yes") >= 0){
  document.getElementById('loadingdoc_').removeAttribute("hidden", "");
  document.getElementById('uploadButton').setAttribute("hidden", "");
  document.getElementById('estudanteBtn').setAttribute("disabled", "");
  document.getElementById('docenteBtn').style.pointerEvents = "none";

  document.getElementById('cadeiras').style.opacity = ".6";
  document.getElementById('cadeiras').style.pointerEvents = "none";

  document.getElementById('ctable').style.opacity = ".6";
  document.getElementById('ctable').style.pointerEvents = "none";
}

function askDocenteCode(){
  var code = prompt("Docente: Por favor digite o código");
  if (code == null) {
    return null;
  } else {
    document.getElementById('loadingdoc_').removeAttribute("hidden", "");
    promise = firebase.auth().signInWithEmailAndPassword("docente@upengenheiros.com", code);

    promise.catch(function(e) {
      console.log(e);
      // If enter incorrect code
      if(e.code === "auth/wrong-password"){
        document.getElementById('loadingdoc_').setAttribute("hidden", "");
        alert("O código está incorreto. Tente novamente.");
      } else {
        document.getElementById('loadingdoc_').setAttribute("hidden", "");
        alert("Erro na conexão com o servidor. Tente outra vez");
      }
    });
  }
}

firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if(firebaseUser){
    //If the user is logged in do this
    //Save a cookie
    if (firebaseUser.email == "docente@upengenheiros.com") {
      document.cookie = "signedin=yes; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
      // console.log("Logged in and cookie saved");
      document.getElementById('loadingdoc_').setAttribute("hidden", "");
      document.getElementById('sair').removeAttribute("hidden", "");
      document.getElementById('uploadButton').removeAttribute("hidden", "");
      document.getElementById('estudanteBtn').setAttribute("disabled", "");
      document.getElementById('docenteBtn').style.pointerEvents = "none";

      document.getElementById('cadeiras').style.opacity = "1.0";
      document.getElementById('cadeiras').style.pointerEvents = null;

      document.getElementById('ctable').style.opacity = "1.0";
      document.getElementById('ctable').style.pointerEvents = null;
    } else {
      alert("Usuário não autorizado.");
      firebase.auth().signOut();
    }

  } else {
    //If the user is NOT logged in do this
    document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/4oAno;";

    document.getElementById('sair').setAttribute("hidden", "");
    document.getElementById('uploadButton').setAttribute("hidden", "");
  }
});



function askEstudanteCode(){
  var doescontain = document.getElementById('docenteBtn').hasAttribute("disabled");

  if (doescontain) {
    document.getElementById('docenteBtn').removeAttribute("disabled", "");

    document.getElementById('cadeiras').style.opacity = ".5";
    document.getElementById('cadeiras').style.pointerEvents = "none";

    document.getElementById('ctable').style.opacity = ".5";
    document.getElementById('ctable').style.pointerEvents = "none";

    document.getElementById('yearSelect').setAttribute("disabled", "");
    document.getElementById('semestreSelect').setAttribute("disabled", "");


  } else {
    document.getElementById('docenteBtn').setAttribute("disabled", "");

    document.getElementById('cadeiras').style.opacity = "1.0";
    document.getElementById('cadeiras').style.pointerEvents = null;

    document.getElementById('ctable').style.opacity = "1.0";
    document.getElementById('ctable').style.pointerEvents = null;

    document.getElementById('yearSelect').removeAttribute("disabled", "");
    document.getElementById('semestreSelect').removeAttribute("disabled", "");

  }
}



$( "#sair" ).click(function() {
  if(confirm( "Deseja sair do Modo Docente?" )){
    firebase.auth().signOut();
    document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/4oAno;";
    window.location.reload(1);
  }else {
    return null;
  }
});

var cadeirasButton = document.getElementById('cadeirasButton');
