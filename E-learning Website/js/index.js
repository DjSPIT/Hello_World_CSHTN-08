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
        loadCourses();
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
  document.getElementById("toLogout").onclick = "logMeOut(); return false;";
  //document.getElementById("toLogout").addEventListener("click", logMeOut);
}

/* -------------------------------------------------------------------------- */

/* --------------------------------Logging Out------------------------------- */

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

/* --------------------------------Load Courses------------------------------ */

async function loadCourses(){
  document.getElementById('dropdownmenu').innerHTML = "";
  firebase.database().ref("courses/").once('value',(snapshot)=>{
  snapshot.forEach((childSnapshot)=>{
    let data = childSnapshot.val();
    const el = "<a class=\"dropdown-item\" href=\"../pages/course.html?type=cont&uid=" + data.courseUID +"\">HTML</a>"
    let dom = new DOMParser().parseFromString(el,'text/html');
    let card_element = dom.body.firstElementChild;
    document.getElementById('dropdownmenu').append(card_element);
    //card_element.style.display = 'block';
  });
});
}

/* -------------------------------------------------------------------------- */



/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
