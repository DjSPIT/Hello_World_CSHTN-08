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
    } else {
        // User is signed out
        // ...
        location.href = "login.html";
    }
});

/* -------------------------------------------------------------------------- */

/* ----------------------------display User Details-------------------------- */

async function displayDetails() {
    document.getElementById("profilename").value = auth.currentUser.displayName;
    document.getElementById("loginId").innerHTML = auth.currentUser.email;
    db.collection(users).doc(auth.currentUser.uid).get().then(())
}

/* -------------------------------------------------------------------------- */

/* ----------------------------Update User Details--------------------------- */

async function updateDetails() {

    let pname = document.getElementById("profname").value;
    let pabout = document.getElementById("profabout").value;
    db.collection(users).doc(auth.currentUser.uid).update({
        name:pname,
        about:pabout,
    });
}

/* -------------------------------------------------------------------------- */
