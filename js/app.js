  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCg29yu31bTSVSFr0BUmonMEskj-EbnNBk",
    authDomain: "engenheirosproject.firebaseapp.com",
    databaseURL: "https://engenheirosproject.firebaseio.com",
    projectId: "engenheirosproject",
    storageBucket: "engenheirosproject.appspot.com",
  };

  firebase.initializeApp(config);

  function goback(){
    window.history.back();
  };


// get the Elements:
  //Text Inputs
  var passwordInput = document.getElementById('passInput');
  var emailInput = document.getElementById('emailInput');

  var emailLabel = document.getElementById('emailLabel');
  var passwordLabel = document.getElementById('passwordLabel');

  var recoverForm = document.getElementById('recoverForm').classList;
  var recover = document.getElementById('recover');

  //Buttons
  var loginBtn = document.getElementById('login');
  var sairBtn = document.getElementById('sair');
  var forgotBtn = document.getElementById('forgotPass');
  var uploadbutton = document.getElementById('ttUpload');

  // OnLoad
  $(document).ready(function()
     {
      //  iziToast.settings({
      //    theme: 'dark', // dark
      //    close: true,
      //    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      //    toastOnce: false,
      //    timeout: 5000,
      //    drag: true,
      //    pauseOnHover: true,
      //    progressBar: false,
      //    progressBarColor: 'green',
      //    animateInside: false,
      //    buttons: {},
      //    transitionIn: 'flipInX',
      //    transitionOut: 'fadeOut',
      //    transitionInMobile: 'bounceInUp',
      //    transitionOutMobile: 'fadeOutDown',
      //  });

     if(document.cookie != ""){
       loginBtn.innerHTML="<i class='check icon'></i>Autenticado";
       loginBtn.classList.remove("mdl-color--blue");
       loginBtn.classList.add("mdl-color--grey");
       loginBtn.setAttribute("disabled", "");
       sairBtn.classList.remove("hidden");

       emailLabel.classList.add('hidden');
       emailInput.setAttribute('readonly', '');
       passwordLabel.classList.add('hidden');
       passwordInput.setAttribute('readonly', '');
     }

    tippy('#ttWhy', {
      position: 'bottom',
      arrow: true,
      theme: 'dark',
      size: 'medium'
    });

  $( "#sair" ).click(function() {
    if(confirm( "Deseja sair? Não conseguirás fazer upload sem estar autenticado." )){
      firebase.auth().signOut();
      document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload(1);
    }else {prom
      return null;
    }
  });

  var mc = new Hammer(loginBtn);
  // listen to events...
  mc.on("tap", function(ev) {
    // Get whats writen in the email and pass Inputs
    var email = emailInput.value;
    var pass = passwordInput.value;

    if(email|pass === ""){
      // iziToast.show({
      //   message: "<i class='text cursor icon'></i> Todos campos devem ser preenchidos."
      // });
      alert("Todos campos devem ser preenchidos")
    } else {
      loginBtn.innerHTML="<i class='loading circle notched icon'></i>";
      loginBtn.setAttribute("disabled", "");
      // Authenticate the user
      var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
      // If error occors, log it.
      promise.catch(e => {
        console.log(e);
        // If invalid email
        if(e.code === "auth/invalid-email"){
          loginBtn.innerHTML="Autenticar"
          loginBtn.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='close sign icon'></i> Email incorrecto."
          });

        // If invalid Password
        }else if(e.code === "auth/wrong-password"){
          loginBtn.innerHTML="Autenticar"
          loginBtn.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='close sign icon'></i> Senha incorrecta."
          });

        // If invalid user or User not registered
        } else if (e.code === "auth/user-not-found") {
          loginBtn.innerHTML="Autenticar"
          loginBtn.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='open envelope outline sign icon'></i> Usuário não registado.",
            buttons: [
                        ['<button>Criar conta</button>', function (instance, toast) {
                            window.location.replace("signup.html");
                        }],
                     ],
            timeout: 10000
          });
        }
      });
    }

  });

  // $( "#login" ).click(function() {
  //   // Get whats writen in the email and pass Inputs
  //   var email = emailInput.value;
  //   var pass = passwordInput.value;
  //
  //   if(email|pass === ""){
  //     // iziToast.show({
  //     //   message: "<i class='text cursor icon'></i> Todos campos devem ser preenchidos."
  //     // });
  //     alert("Todos campos devem ser preenchidos")
  //   } else {
  //     loginBtn.innerHTML="<i class='loading circle notched icon'></i>";
  //     loginBtn.setAttribute("disabled", "");
  //     // Authenticate the user
  //     var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  //     // If error occors, log it.
  //     promise.catch(e => {
  //       console.log(e);
  //       // If invalid email
  //       if(e.code === "auth/invalid-email"){
  //         loginBtn.innerHTML="Autenticar"
  //         loginBtn.removeAttribute("disabled", "");
  //         iziToast.show({
  //           message: "<i class='close sign icon'></i> Email incorrecto."
  //         });
  //
  //       // If invalid Password
  //       }else if(e.code === "auth/wrong-password"){
  //         loginBtn.innerHTML="Autenticar"
  //         loginBtn.removeAttribute("disabled", "");
  //         iziToast.show({
  //           message: "<i class='close sign icon'></i> Senha incorrecta."
  //         });
  //
  //       // If invalid user or User not registered
  //       } else if (e.code === "auth/user-not-found") {
  //         loginBtn.innerHTML="Autenticar"
  //         loginBtn.removeAttribute("disabled", "");
  //         iziToast.show({
  //           message: "<i class='open envelope outline sign icon'></i> Usuário não registado.",
  //           buttons: [
  //                       ['<button>Criar conta</button>', function (instance, toast) {
  //                           window.location.replace("signup.html");
  //                       }],
  //                    ],
  //           timeout: 10000
  //         });
  //       }
  //     });
  //   }
  // });

  // What happens when clicks the login button?
  // loginBtn.addEventListener('click', e => {
  //
  //
  // });

  $( "#forgotPass" ).click(function() {
    if(recoverForm.contains('hidden')){
      recoverForm.remove('hidden');
      $('#recoverForm')
        .transition('pulse')
      ;
    } else {
      recoverForm.add('hidden');
    };
  });


  //On the first main login form
  // forgotBtn.addEventListener('click', e => {
  //
  // });

  //On the action form
  $("#recover").click(function() {
    recover.innerHTML="<i class='loading circle notched icon'></i>";
    recover.setAttribute("disabled", "");
    var toBeRecoveredEmail = document.getElementById('recoverEmailInput').value;
    // alert(toBeRecoveredEmail);

    firebase.auth().sendPasswordResetEmail(toBeRecoveredEmail)
    .then(function() {
      // Password reset email sent.
      recover.innerHTML="<i class='check icon'></i>";
      recover.removeAttribute("disabled", "");
      recover.classList.remove('mdl-color--blue-900');
      recover.classList.add('mdl-color--grey-300');
      iziToast.show({
        message: "<i class='mail icon'></i> As instruções de recuperação foram enviadas para o seu email."
      });
      setTimeout(function(){ recoverForm.add('hidden'); }, 4000);
    })
    .catch(function(e) {
      // Error occurred. Inspect error.code.
      // If invalid email
        if(e.code === "auth/invalid-email"){
          recover.innerHTML="Recuperar";
          recover.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='close sign icon'></i> Email incorrecto. Verifique o Email novamente."
          });

        // If invalid user or User not registered
        } else if (e.code === "auth/user-not-found") {
          recover.innerHTML="Recuperar"
          recover.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='open envelope outline sign icon'></i> Usuário não registado.",
            buttons: [
                        ['<button>Criar conta</button>', function (instance, toast) {
                            window.location.replace("signup.html");
                        }],
                     ],
            timeout: 10000
          });
        } else if (e.code === null) {
          recover.innerHTML="Recuperar"
          recover.removeAttribute("disabled", "");
          iziToast.show({
            message: "<i class='check sign icon'></i> Email enviado com sucesso."
          });
        }
    });









    // var promise = firebase.auth().sendPasswordResetEmail(toBeRecoveredEmail);
    // promise.catch(e => {
    //   alert(e);
    //
    //
    // });



  });


  //RealTime login/logout listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      //If the user is logged in do this
      //Save a cookie
      document.cookie = "signedin=yes; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
      console.log("Logged in and cookie saved");
      loginBtn.innerHTML="<i class='check icon'></i>Autenticado";
      // window.location.replace("index.html");


    } else {
      //If the user is NOT logged in do this
      console.log("Not Logged in.");
      document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

  });
});

    // On ENTER (keycode 13) Press while on PasswordInput simulate a click on the Autenticar Button.
    $(document).ready(function(){
        $('#passInput').keypress(function(e){
          if(e.keyCode==13)
          $('#login').click();
        });
      });
