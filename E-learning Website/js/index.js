/* ______________________________By @Enculandus______________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */

/* ---------------------------Global Variables------------------------------- */
var db;
var rtdb;
var auth;
var profileRef;

/* -------------------------------Functions---------------------------------- */

/* -------------------------------load User---------------------------------- */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        //console.log(uid);
        //initializePage();
        // ...
        db = firebase.firestore();
        rtdb = firebase.database();
        auth = firebase.auth();
        storage = firebase.storage();
        showHiddenNav();
    } else {
        // User is signed out
        // ...
        //location.href = "index.html";
    }
});
/* -------------------------------------------------------------------------- */

/* -----------------------------Change Nav Bar------------------------------- */

async function showHiddenNav() {
  document.getElementById("toLogout").innerHTML = "Logout";
  document.getElementById("toLogout").href = "";
  document.getElementById("toLogout").style.color = "#FF0000";
  document.getElementById("toLogout").addEventListener("click", logMeOut);
}

/* -------------------------------------------------------------------------- */

/* -----------------------------Change Nav Bar------------------------------- */

async function logMeOut() {
  console.log("logging out");
    firebase.auth().signOut()
        .then((ret) => {
            location.href = "index.html";
        })
        .catch((err) => {
            console.log(err);
        });
}

/* -------------------------------------------------------------------------- */

/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
