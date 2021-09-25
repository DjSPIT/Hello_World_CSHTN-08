/* ___________By @Enculandus___________ */
/* __________________________ */
/* __________________________ */

/* ---------------------------Global Variables------------------------------- */
var db;
var rtdb;
var auth;
var profileRef;
var courseIDOn;

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
        getParams();
    } else {
      getParams();
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



/* ---------------------------Load Course or quiz---------------------------- */

async function getParams() {
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.get('type')=="cont"){
    loadCourseData(urlParams.get('uid'));
  }
  else {
    loadQuiz(urlParams.get('uid'));
  }
}

async function loadCourseData(theUID) {
  courseIDOn = theUID;
  document.getElementById("theSidebar").innerHTML = "";
  let courseID = theUID;
  let contentList = db.collection("courses").doc(courseID).collection("content").doc("contentLinks");
  contentList.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          let dat = doc.data();
          dat.articlesIDs.forEach((element,i) => {
            const opt = "<a class=\"active\" onclick=\"loadArticle(" + element + ")\">" + dat.articleTitles[i] + "</a>"
            let dom = new DOMParser().parseFromString(opt,'text/html');
            let opt_element = dom.body.firstElementChild;
            document.getElementById('theSidebar').append(opt_element);
          });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

async function loadArticle(articleid) {
  let contentRef = rtdb.ref("courseData/" + courseIdOn + "/courseContent/" + articleid);
  contentRef.once("value", (snap)=>{
    let dat = snap.val();
    document.getElementById("ourContent").innerHTML = "<h4>" + dat.title + "</h4><pre>" + dat.content + "</pre>";
  });
}

/* -------------------------------------------------------------------------- */
