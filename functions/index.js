
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
/* *************************** Initializations ****************************** */
admin.initializeApp();
/* ************************************************************************** */
/* *************************** Global Constants ***************************** */

const db = admin.firestore();
const rtdb = admin.database();
// const auth = admin.auth();

/* ************************************************************************** */

/* ______________________________By @Enculandus______________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */

/* -------------------------------Functions---------------------------------- */

/* ----------------Creates profile on firestore for users created------------ */
exports.createProfile = functions.auth.user().onCreate((user) => {
  //  directly return a promise
  return db
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        emailId: user.email,
      })
      .catch(console.error);
});
/* -------------------------------------------------------------------------- */

/* ----------------Deletes profile on firestore for users deleted------------ */
exports.deleteProfile = functions.auth.user().onDelete((user) => {
  //  making a reference
  const profile = db.collection("users").doc(user.uid);
  //  returning a promise
  return profile
      .delete()
      .catch(console.error);
});
/* -------------------------------------------------------------------------- */

/* ---------------------------vote for a link-------------------------------- */

exports.vote = functions.https.onCall((data, context) =>{
  //  making a reference
  const str = "courseData/" + data.courseID + "/courseContent" + data.contentID;
  const voteRef = rtdb.ref(str + data.link + "/votes");
  //  returning a promise
  return voteRef.once("value", (snap)=>{
    let theInt = snap.val();
    theInt += 1;
    voteRef.update(theInt);
  });
});
/* -------------------------------------------------------------------------- */

/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
