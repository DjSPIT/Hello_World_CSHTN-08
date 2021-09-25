
async function GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

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
var contentListArray = [];
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
    global_articleID = urlParams.get('articleID');
    courseIDOn = urlParams.get('uid');
    loadCourseData(urlParams.get('uid'),0).then(()=>{
      loadArticle(urlParams.get('articleID'));
    });
  }
  else {
    if(urlParams.get('type')=="cont"){
      courseIDOn = urlParams.get('uid');
      loadCourseData(urlParams.get('uid'),1);
    }
    else {
      loadQuiz(urlParams.get('uid'));
    }
  }
}

/* --------------------------------Load Courses------------------------------ */

async function loadCourses(){
  document.getElementById('dropdownmenu').innerHTML = "";
  firebase.database().ref("courses/").once('value',(snapshot)=>{
    snapshot.forEach((childSnapshot)=>{
      let data = childSnapshot.val();
      const el = "<a class=\"dropdown-item\" href=\"../pages/course.html?type=cont&uid=" + data.courseUID +"\">" + data.name + "</a>";
      let dom = new DOMParser().parseFromString(el,'text/html');
      let card_element = dom.body.firstElementChild;
      document.getElementById('dropdownmenu').append(card_element);
      //card_element.style.display = 'block';
    });
  });
}

/* -------------------------------------------------------------------------- */


async function loadCourseData(theUID,ctrlDisplay) {
  document.getElementById("theSidebar").innerHTML = "";
  let courseID = theUID;
  let contentList = db.collection("courses").doc(courseID).collection("content").doc("contentLinks");
  contentList.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          let dat = doc.data();
          dat.articlesIDs.forEach((element,i) => {
            contentListArray.push(element);
            const opt = "<a class=\"active\" onclick=\"redirectArticle(contentListArray["+ i +"])\">" + dat.articleTitles[i] + "</a>";
            let dom = new DOMParser().parseFromString(opt,'text/html');
            let opt_element = dom.body.firstElementChild;
            document.getElementById('theSidebar').append(opt_element);
          });
          if(ctrlDisplay){
            displayCourseDesc();
          }
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

async function displayCourseDesc() {
  rtdb.ref("courseData/" + courseIDOn).once("value", (snap)=>{
    let courseObject = snap.val();
    document.getElementById("ourContent").innerHTML = "<h3>" + courseObject.name + "</h3>" + courseObject.description ;
    document.getElementById("ourRepo").innerHTML = "<h4> RoadMap: </h4> <br><br> <img src=\"" + courseObject.image + "\" style=\"width:100%;\">";
    document.getElementById("publicRepo").innerHTML = "<h5>Author: " + courseObject.author + "</h5>";
  }).catch((error)=>{
    console.log(error);
  });
}

var articleData;

async function loadArticle(articleid) {
  console.log("Course Id: " + courseIDOn.toString());
  console.log("Article Id: " + articleid.toString());
  let contentRef = rtdb.ref("courseData/" + courseIDOn.toString() + "/courseContent/" + articleid.toString());
  contentRef.once("value", (snap)=>{
    articleData = snap.val();
    document.getElementById("ourContent").innerHTML = "<h4>" + articleData.title + "</h4>" + articleData.content + " ";
    // console.log(articleData);
    var links= articleData.privateRepo;
    // links.sort("votes");
    // console.log(links);
    // //links.sort(GetSortOrder("votes"));
    // links.forEach((item, i) => {
    //   console.log(item.url + "    Votes:" + item.votes);
    // });
    // for(var item in links){
    //   console.log(item.url + "    Votes:" + item.votes);
    // }
  }).then(()=>{
    contentRef.child("privateRepo").orderByChild("votes").once("value", (snap)=>{
      //console.log(snap[0]);
      console.log(snap.val());
    }).catch((error)=>{
      console.log(error);
    });
  }).catch((error)=>{
    console.log(error);
  })
}

async function redirectArticle(newArticleID) {
  if(global_articleID){
    let params = location.href.split("articleID=");
    params[1] = "articleID=" + newArticleID.toString();
    console.log(params.join());
    window.location.replace(params.join(""));
  }
  else {
    let newUrl = window.location.href + "&articleID=" + newArticleID;
    window.location.href = newUrl;
  }
}

async function loadQuiz() {

}
/* -------------------------------------------------------------------------- */
