var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var request;

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

var router = express.Router();

require("./config/routes")(router);

// Configure middleware

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname + "/public"));

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(router);

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/followernews";

mongoose.connect(MONGODB_URI);

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// mongoose.connect(db, function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("mongoose connection is successful!");
//   }
// });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
