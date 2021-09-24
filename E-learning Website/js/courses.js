/* ___________By @Enculandus___________ */
/* __________________________ */
/* __________________________ */

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
  firebase.database().ref("courses/").once('value',(snapshot)=>{
  snapshot.forEach((childSnapshot)=>{
    let data = childSnapshot.val();

    const courseCard = "<div style=\"max-width:30%;min-width:30%;margin-bottom:2rem\" class=\"card\"><img src=\"" + data.image + "\" class=\"card-img-top\"><div class=\"card-body\"><h5 class=\"card-title\">" + data.name + "</h5><p class=\"card-text\">"+ data.description +"</p><button type=\"button\" class=\"btn btn-light\"><a href=\"" + + "\">Enroll Now</a></button></div></div>"
    let dom = new DOMParser().parseFromString(courseCard,'text/html');
    let card_element = dom.body.firstElementChild;
    document.getElementById('cards-three').append(card_element);
    card_element.style.display = 'block';
  });
});
}

/* -------------------------------------------------------------------------- */
