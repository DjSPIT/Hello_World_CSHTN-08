/* ___________By @Enculandus___________ */
/* __________________________ */
/* __________________________ */

/* ---------------------------Global Variables------------------------------- */
var db;
var rtdb;
var auth;
var profileRef;
var courseIDOn;
var global_articleID;

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
  if(urlParams.get('articleID')){
    courseIDOn = urlParams.get('uid');
    loadCourseData(urlParams.get('uid')).then(()=>{
      loadArticle(urlParams.get('articleID'));
    });
  }
  else {
    if(urlParams.get('type')=="cont"){
      courseIDOn = urlParams.get('uid');
      loadCourseData(urlParams.get('uid'));
    }
    else {
      loadQuiz(urlParams.get('uid'));
    }
  }
}

async function loadCourseData(theUID) {
  document.getElementById("theSidebar").innerHTML = "";
  let courseID = theUID;
  let contentList = db.collection("courses").doc(courseID).collection("content").doc("contentLinks");
  contentList.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          let dat = doc.data();
          dat.articlesIDs.forEach((element,i) => {
            const opt = "<a class=\"active\" href=\"" + window.location.href + "&articleID=" + element.toString() + "\">" + dat.articleTitles[i] + "</a>"
            let dom = new DOMParser().parseFromString(opt,'text/html');
            let opt_element = dom.body.firstElementChild;
            document.getElementById('theSidebar').append(opt_element);
          });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).then(()=>{
      rtdb.ref("courseData")
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

async function loadArticle(articleid) {
  console.log(courseIDOn.toString());
  console.log(articleid.toString());
  let contentRef = rtdb.ref("courseData/" + courseIDOn.toString() + "/courseContent/" + articleid.toString());
  contentRef.once("value", (snap)=>{
    let articleData = snap.val();
    document.getElementById("ourContent").innerHTML = "<h4>" + articleData.title + "</h4>" + articleData.content + " ";
  });
}

async function loadQuiz() {

}
/* -------------------------------------------------------------------------- */
