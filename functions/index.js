const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://juanjo-fc.firebaseio.com",
});

const data = {
  name: "Juan Jose",
  lastName: "Vega",
  description:
    "I'm Software Developer specialist in Backend and Web Technologies, I live and breathe software. Currently focusing on JS and Python in Platzi Master",
};

const db = admin.database();
const ref = db.ref("/assistant");
const childRef = ref.child("technical");

exports.api = functions.https.onRequest((request, response) => {
  if (request.method === "GET") {
    const data = childRef;
    data.on("value", (snapshot) => {
      const parseData = Object.keys(snapshot.val()).map(
        (key) => snapshot.val()[key]
      );
      response.json(parserData);
    });
    // response.json(data);
  } else {
    response.status(500).send("I failed you");
  }
});

exports.saveData = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    const data = childRef.push();
    data.set({});
    response.status(200).json(request.body);
  } else {
    response.status(500).send("You don't have access");
  }
});
