const functions = require("firebase-functions");

exports.api = functions.https.onRequest((request, response) => {
  if (request.method === "GET") {
    response.json({ hi: "hi" });
  } else {
    response.status(500).send("I failed you");
  }
});
