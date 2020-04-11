const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

if (process.env.ENV === "Test") {
  console.log("This is a test!");
  const db = mongoose.connect(
    "mongodb+srv://codedpills:uXoEO3Zef6sgKutW@bookapi-9puki.mongodb.net/bookapi_test?retryWrites=true&w=majority"
  );
} else {
  console.log("This is real!")
  const db = mongoose.connect(
    "mongodb+srv://codedpills:uXoEO3Zef6sgKutW@bookapi-9puki.mongodb.net/bookapi?retryWrites=true&w=majority"
  );
}

const PORT = process.env.ENV ? 5050 : process.env.PORT || 5000;
const bookRouter = require("./routes/bookRouter")();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.server = app.listen(PORT, () => {
  console.log("App started on port: " + PORT);
});

module.exports = app;
