/* ______________________________By @Enculandus______________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */

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


async function logMeIn() {
  var usern = document.getElementById("usern").value;
  var passwd = document.getElementById("passwd").value;
  firebase.auth().signInWithEmailAndPassword(usern,passwd).then((userCredentials) => {
    console.log("DONE");
    //location.href = "index.html";
   }).catch((error) => {
     window.alert(error.message);
   });
}

async function signMeUp() {
  let usern = document.getElementById('email').value;
  let passwd = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(username,password).then((userCredential) => {
    //do nothing
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(error.message);
  });
}
