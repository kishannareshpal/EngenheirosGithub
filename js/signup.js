// Initialize Firebase
var config = {
  apiKey: "AIzaSyCg29yu31bTSVSFr0BUmonMEskj-EbnNBk",
  authDomain: "engenheirosproject.firebaseapp.com",
  databaseURL: "https://engenheirosproject.firebaseio.com",
  projectId: "engenheirosproject",
  storageBucket: "engenheirosproject.appspot.com",
};

firebase.initializeApp(config);

//Settings
  $('.ui.dropdown')
    .dropdown();

  iziToast.settings({
    theme: 'dark', // dark
    close: true,
    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    toastOnce: false,
    timeout: 5000,
    drag: true,
    pauseOnHover: true,
    progressBar: false,
    progressBarColor: 'green',
    animateInside: false,
    buttons: {},
    transitionIn: 'flipInX',
    transitionOut: 'fadeOut',
    transitionInMobile: 'bounceInUp',
    transitionOutMobile: 'fadeOutDown',
  });

// Get the Elements
  //Inputs
  var formDivClassList = document.getElementById('form');

  var nameInput = document.getElementById('nameInput');
  var emailInput = document.getElementById('emailInput');
  var passwordInput = document.getElementById('passwordInput');
  var confirmPasswordInput = document.getElementById('confirmPasswordInput');
  //Buttons
  var makeAccountBtn = document.getElementById('makeAccountBtn');
  var alreadyHaveAnAccountBtn = document.getElementById('alreadyHaveAnAccountBtn');
  //Fields
  var emailField = document.getElementById('emailField');
  var nameField = document.getElementById('nameField');
  var passworField = document.getElementById('passField');
  var cPassField = document.getElementById('cPassField');



  if(document.cookie != ""){
    window.location.replace("index.html");
  }

  $("#alreadyHaveAnAccountBtn").click(function() {
    window.location.replace("login.html");
  });

  $("#makeAccountBtn").click(function() {
    var nameWithTitle = document.getElementById('title').innerHTML + " " + nameInput.value;
    var email = emailInput.value;
    var pass = passwordInput.value;
    var cPass = confirmPasswordInput.value;


    if(nameWithTitle|email|pass|cPass == ""){
      iziToast.show({
        message: '<i class="text cursor icon"></i> Todos os campos devem estar preenchidos'
      });
    } else {

      formDivClassList.classList.add("loading");

      var promise = firebase.auth().createUserWithEmailAndPassword(email, pass);

      promise.catch(e => {
        console.log(e.code);
        // If invalid email
        if(e.code === "auth/invalid-email"){
          iziToast.show({
            message: '<i class="close sign icon"></i> Rectifique o email'
          });
          emailField.classList.add('inline error');
          formDivClassList.classList.remove("loading");

        // If invalid Password
        } else if (e.code === "auth/email-already-in-use") {
          iziToast.show({
            message: "<i class='open envelope outline sign icon'></i> Já existe uma conta com o mesmo email. Esqueceu senha?",
            buttons: [
                        ['<button>Recuperar senha</button>', function (instance, toast) {
                            window.location.replace("forgot.html");
                        }],
                     ],
            timeout: 10000
          });
          emailField.classList.add('error');
          formDivClassList.classList.remove("loading");



        } else if (e.code === "auth/weak-password") {
          iziToast.show({
            message: "<i class='close sign icon'></i> Senha muito fraca."
          });
          passwordField.classList.add('error');
          formDivClassList.classList.remove("loading");
        }
      });
    }
  });


  //RealTime login/logout listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        //If the user is logged in do this
        //Save a cookie
        document.cookie = "signedin=yes; expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
        console.log("Logged in and cookie is saved.");
        formDivClassList.classList.remove("loading");
        // Updates the user attributes:
        firebaseUser.updateProfile({
          displayName: document.getElementById('title').innerHTML + " " + nameInput.value,
        }).then(function() {
          //Display name success
          var displayName = firebaseUser.displayName;
          window.location.replace('/');
        }, function(error) {
          // An error happened.
          iziToast.show({
            message: '<i class="at sign icon"></i> Ocorreu um erro. O nome não foi gravado. Tente novamente'
          });
        });

      } else {
        //If the user is NOT logged in do this
        console.log("Not logged in.");
        formDivClassList.classList.remove("loading");
      }
  });
