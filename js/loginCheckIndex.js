var config = {
 apiKey: "AIzaSyCg29yu31bTSVSFr0BUmonMEskj-EbnNBk",
 authDomain: "engenheirosproject.firebaseapp.com",
 projectId: "engenheirosproject",
};

firebase.initializeApp(config);


console.log(document.cookie);

    if(document.cookie != ""){
       console.log("Upload button is enabled");
       document.getElementById('uploadd').classList.remove('disabled');
       document.getElementById('authenticated').classList.remove('hidden');
       document.getElementById('authenticate').classList.add('hidden');

    } else {
       console.log("Please signin. Upload button is disabled");
       document.getElementById('disciplinasDiv').classList.add('hidden');
       document.getElementById('pagee2').classList.remove('hidden');
    }

    $( "#signOutFromIndex" ).click(function() {
      if(confirm( "Deseja sair? Não conseguirás fazer upload sem estar autenticado." )){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          document.cookie = "signedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.reload(1);
        }).catch(function(error) {
          // An error happened.
          iziToast.show({
            message: '<i class="close sign icon"></i> Ocorreu um erro ao tentar sair. Tente novamente.',
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
            transitionIn: 'flipInX',
            transitionOut: 'fadeOut',
            transitionInMobile: 'bounceInUp',
            transitionOutMobile: 'fadeOutDown',
          });
        });
      }else {
        return null;
      }
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          //If the user is logged in do this
          //Save a cookie
          document.cookie = "signedin=yes; expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
          console.log("Logged in and cookie is saved.");
          document.getElementById('emailFromSignOut').innerHTML=firebaseUser.displayName;
          console.log(firebaseUser.displayName);
        } else {
          //If the user is NOT logged in do this
          console.log("Not logged in.");
        }
    });
