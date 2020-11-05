var admin = require("firebase-admin");

var serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clinica-4e7c6.firebaseio.coms"
});

const db = admin.firestore()

module.exports = db