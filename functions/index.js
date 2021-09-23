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
// const rtdb = admin.database();
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


/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
/* __________________________________________________________________________ */
