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
        //location.href = "index.html";
    }
});
/* -------------------------------------------------------------------------- */

/* ------------------------Loading Available topics-------------------------- */

function loadTopics() {

}

/* -------------------------------------------------------------------------- */



/* --------------------------Creating a new course--------------------------- */
function createCourse() {
  let courseName = document.getElementById("newCourseName").value.toString();
  let courseAuthor = document.getElementById("authorName").value.toString();
  let courseDesc = document.getElementById("briefDesc").value.toString();

  let courseRef = rtdb.ref("courseData").push();
  let courseID = courseRef.key;

  const textToBLOB = new Blob([courseDesc], { type: 'text/html' });
  const sFileName = courseID + '.html';

  const descRef = storage.ref(courseID + "/metadata/" + "description.html");

  descRef.put(textToBLOB).then((e)=>{
    e.ref.getDownloadURL().then((url)=>{
      courseRef.set({
        name: courseName,
        author: courseAuthor,
        description: url,
        courseUID: courseID
      }).then((res)=>{
        console.log("1");
        db.collection("courses").doc(courseID.toString()).set({
          name: courseName,
          author: courseAuthor,
          description: url,
          courseUID: courseID
        }).then(()=>{
          console.log("2");
          rtdb.ref("courses/"+courseID).set({
            name: courseName,
            author: courseAuthor,
            description: url,
            courseUID: courseID
          }).then((resul)=>{
            location.reload();
          });
        });
      });
    });
  });


  //db.collection("courses").

}
/* -------------------------------------------------------------------------- */


/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
