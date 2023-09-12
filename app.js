const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport-jwt");
const moongose = require("mongoose");

const app = express();

const users = require("./routes/users");

// port Number
const PORT = 3000;

// Middleware...
app.use(cors());
app.use(bodyParser.json());

app.use("/users", users);

//Index Route...
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start Server...
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
