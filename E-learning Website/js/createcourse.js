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
        loadCourses();
    } else {
        // User is signed out
        // ...
        //location.href = "index.html";
    }
});
/* -------------------------------------------------------------------------- */

/* ------------------------Loading Available Courses-------------------------- */

async function loadCourses() {
  rtdb.ref("/courses").once('value',(snap)=>{
    snap.forEach((childSnap) => {
      let dat = childSnap.val();
      const opt = "<option name=\"" + dat.name + "\" value\"" + dat.courseID + "\">"
      let dom = new DOMParser().parseFromString(opt,'text/html');
      let opt_element = dom.body.firstElementChild;
      document.getElementById('courses').append(opt_element);
    });
  });
}

async function loadTopics() {
  let courseID = document.getElementById("courseIdMod").value.toString();
  let contentList = db.collection("courses").doc(courseID).collection("content").doc("contentLinks");
  contentList.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        let dat = doc.data();
        dat.articlesIDs.forEach((element,i) => {
          const opt = "<option name=\"" + dat.articleTitles[i] + "\" value\"" + element + "\">"
          let dom = new DOMParser().parseFromString(opt,'text/html');
          let opt_element = dom.body.firstElementChild;
          document.getElementById('courses').append(opt_element);
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

async function loadContent() {

}
/* -------------------------------------------------------------------------- */

/* --------------------------Creating a new Content-------------------------- */

async function createContent() {
  let courseID = document.getElementById("courseID").value.toString();
  let contentTitle = document.getElementById("newTitle").value.toString();
  let mainContent = document.getElementById("newContent").value.toString();

  let contentRef = rtdb.ref("courseData/" + courseID + "/courseContent").push();
  let contentID = contentRef.key;

  contentRef.set({
    title: contentTitle,
    content: mainContent,
    contentUID: contentID,
  }).then(()=>{
    db.collection("courses").doc(courseID).collection("content").doc("contentLinks").update({
      articlesIDs: firebase.firestore.FieldValue.arrayUnion(contentID),
      articleTitles: firebase.firestore.FieldValue.arrayUnion(contentTitle)
    }).then(()=>{
      location.reload();
    }).catch((error)=>{
      db.collection("courses").doc(courseID).collection("content").doc("contentLinks").set({
        articlesIDs: firebase.firestore.FieldValue.arrayUnion(contentID),
        articleTitles: firebase.firestore.FieldValue.arrayUnion(contentTitle)
      }).then(()=>{
        location.reload();
      })
    });
  });

}

/* -------------------------------------------------------------------------- */

/* --------------------------Creating a new course--------------------------- */
document.getElementById("fileB").addEventListener('change', uploadPic);
var file, fileXtension;

async function uploadPic(ev) {
  file = ev.target.files[0];
  console.log(file);
  let a = file.type.split("/");
  fileXtension = a[2];
}

async function createCourse() {
  let courseName = document.getElementById("newCourseName").value.toString();
  let courseAuthor = document.getElementById("authorName").value.toString();
  let courseDesc = document.getElementById("briefDesc").value.toString();

  let courseRef = rtdb.ref("courseData").push();
  let courseID = courseRef.key;

  const descRef = storage.ref(courseID + "/metadata/" + "description.html");

  var descURL, picURL;

  storage.ref(courseID + "/metadata/" + "CoursePic." + fileXtension).put(file).then((j)=>{
    j.ref.getDownloadURL().then((url2)=>{
      picURL = url2;
      courseRef.set({
        name: courseName,
        author: courseAuthor,
        description: courseDesc,
        courseUID: courseID,
        image: picURL,
      }).then((res)=>{
        console.log("1");
        db.collection("courses").doc(courseID.toString()).set({
          name: courseName,
          author: courseAuthor,
          description: courseDesc,
          courseUID: courseID,
          image: picURL,
        }).then(()=>{
          console.log("2");
          rtdb.ref("courses/"+courseID).set({
            name: courseName,
            author: courseAuthor,
            description: courseDesc,
            courseUID: courseID,
            image: picURL,
          }).then((resul)=>{
            location.reload();
          });
        });
      });
    });
  });

}
/* -------------------------------------------------------------------------- */


/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
