/* ______________________________By @Enculandus______________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */

/* ---------------------------Global Variables------------------------------- */
var db;
var rtdb;
var auth;
var profileRef;

/* -------------------------------Functions---------------------------------- */

/* -----------------------load User if Logged In----------------------------- */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        location.href = "index.html";

    } else {
        // User is signed out
        // ...
        //location.href = "index.html";
    }
});
/* -------------------------------------------------------------------------- */


function logMeIn() {
  username = document.getElementById('email').value;
  password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(username, password).then((userCredentials) => {
    console.log(userCredentials);
    location.href = "index.html";
   }).catch((error) => {
     window.alert(error.message);
   });
}

function signMeUp() {
  username = document.getElementById('email').value.toString();
  password = document.getElementById('password').value.toString();
  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(error.message);
  });
}
