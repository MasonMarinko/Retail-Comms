const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UserController = require("./controllers/UserController");
const ItemController = require("./controllers/ItemController");
const CommentController = require("./controllers/CommentController");
const cors = require('cors');
const bodyParser = require('body-parser')
require('./models')

mongoose.connect("mongodb://127.0.0.1/costco-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.use("/api/user", UserController);
app.use("/api/item", ItemController);
app.use("/api/comment", CommentController);


// all accepts any HTTP method
app.all('/api/*', function (req, res) {
    // express handles basic headers and mime-types automatically
    res.status(404).json({message: "Endpoint not found!"})
})

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Database connected");
  app.listen(4500, function () {
    console.log("Listening on port 4500. Go to http://localhost:4500");
  });
});
