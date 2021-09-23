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

document.getElementById("fileB").addEventListener('change', uploadPic);

/* --------------------------Creating a new course--------------------------- */
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

  const textToBLOB = new Blob([courseDesc], { type: 'text/html' });
  const sFileName = courseID + '.html';

  const descRef = storage.ref(courseID + "/metadata/" + "description.html");

  var descURL, picURL;

  descRef.put(textToBLOB).then((e)=>{
    e.ref.getDownloadURL().then((url)=>{
      descURL = url;
      storage.ref(courseID + "/metadata/" + "CoursePic." + fileXtension).put(file).then((j)=>{
        j.ref.getDownloadURL().then((url2)=>{
          picURL = url2;
          courseRef.set({
            name: courseName,
            author: courseAuthor,
            description: descURL,
            courseUID: courseID,
            image: picURL,
          }).then((res)=>{
            console.log("1");
            db.collection("courses").doc(courseID.toString()).set({
              name: courseName,
              author: courseAuthor,
              description: descURL,
              courseUID: courseID,
              image: picURL,
            }).then(()=>{
              console.log("2");
              rtdb.ref("courses/"+courseID).set({
                name: courseName,
                author: courseAuthor,
                description: descURL,
                courseUID: courseID,
                image: picURL,
              }).then((resul)=>{
                location.reload();
              });
            });
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
