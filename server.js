// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
const { notEqual } = require("assert");

// set up Express App
var app = express();
var PORT = process.env.PORT || 8080;

// set up Express App to handle data parsing
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/db")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up HTML routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (res, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// set up API routes
app.get("/api/notes", function (req, res) {
  // read db.json file
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data);
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  // write into db.json file
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data);
    console.log(req.body);

    var updatedData = JSON.parse(data);
    updatedData.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(updatedData), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Success!");
    });
  });
});
// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
