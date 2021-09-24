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

/* -----------------------Loading Available Courses-------------------------- */

async function loadCourses() {
  rtdb.ref("/courses").once('value',(snap)=>{
    snap.forEach((childSnap) => {
      let dat = childSnap.val();
      const opt = "<option name=\""+ dat.name + "\" value=\"" + dat.courseUID + "\">" + dat.name + "</option>";
      let dom = new DOMParser().parseFromString(opt,'text/html');
      let opt_element = dom.body.firstElementChild;
      document.getElementById('courses').append(opt_element);
    });
  });
}
/* -------------------------------------------------------------------------- */

/* ----------------------Modifying Available Courses------------------------- */

async function loadTopics() {
  let courseID = document.getElementById("courseIdMod").value.toString();
  let contentList = db.collection("courses").doc(courseID).collection("content").doc("contentLinks");
  contentList.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        let dat = doc.data();
        dat.articlesIDs.forEach((element,i) => {
          const opt = "<option name=\"" + dat.articleTitles[i] + "\" value=\"" + element + "\">" + dat.articleTitles[i] + "</option>";
          let dom = new DOMParser().parseFromString(opt,'text/html');
          let opt_element = dom.body.firstElementChild;
          document.getElementById('subtopics').append(opt_element);
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
  courseIDforMod = document.getElementById("courseIdMod").value;
  subtopicIDforMOD = document.getElementById("subtopicMod").value;
  rtdb.ref("courseData/" + courseIDforMod + "/courseContent/" + subtopicIDforMOD).once('value',(snap)=>{
    let mydata = snap.val();
    document.getElementById("contentMod").innerHTML = mydata.content;
  })
}

async function modifyContent() {
  courseIDforMod = document.getElementById("courseIdMod").value;
  subtopicIDforMOD = document.getElementById("subtopicMod").value;
  rtdb.ref("courseData/" + courseIDforMod + "/courseContent/" + subtopicIDforMOD).update({
    content: document.getElementById("contentMod").value,
  }).then(()=>{
    location.reload();
  })
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
    link1:{ url: document.getElementById("link1new").value, votes:0},
    link2:{ url: document.getElementById("link2new").value, votes:0},
    link3:{ url: document.getElementById("link3new").value, votes:0},
    link4:{ url: document.getElementById("link4new").value, votes:0},
    link5:{ url: document.getElementById("link5new").value, votes:0},
    link6:{ url: document.getElementById("link6new").value, votes:0},
    link7:{ url: document.getElementById("link7new").value, votes:0},
    link8:{ url: document.getElementById("link8new").value, votes:0},
    link9:{ url: document.getElementById("link9new").value, votes:0},
    link10:{ url: document.getElementById("link10new").value, votes:0},
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

/* --------------------------Creating a new Quiz--------------------------- */
async function createQuiz() {
  let quizCourseID = document.getElementById("quizCourseID").value;
  let quizQuestion = document.getElementById("quizQuestion").value;
  let quizOP1 = document.getElementById("quizOP1").value;
  let quizOP2 = document.getElementById("quizOP2").value;
  let quizOP3 = document.getElementById("quizOP3").value;
  let quizOP4 = document.getElementById("quizOP4").value;
  let quizAns = document.getElementById("quizAnswer").value;

  if(quizQuestion == "" || quizOP1 == "" || quizOP2 == "" || quizAns == ""){
    return window.alert("Empty question or first option or second option");
  }

  let quizRef = rtdb.ref("courseData/" + quizCourseID + "/courseQuiz").push();
  let quizID = quizRef.key;

  quizRef.set({
    quizUID: quizID,
    question: quizQuestion,
    options: [quizOP1, quizOP2, quizOP3, quizOP4]
  }).then(()=>{
    db.collection("courses").doc(quizCourseID).collection("quizes").doc(quizID).set({
      quizUID: quizID,
      answer: quizAns
    }).then(()=>{
      location.reload();
    })
  });

}

/* -------------------------------------------------------------------------- */

/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
