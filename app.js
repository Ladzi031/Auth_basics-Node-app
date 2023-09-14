const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport-jwt");
const mongoose = require("mongoose");
const config = require("./config/database");

const app = express();

const users = require("./routes/users");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("connected to the database: " + config.database);
});

// port Number
const PORT = 3000;

// Middleware...
app.use(cors());
app.use(bodyParser.json());

// path, middleware function/method....
app.use("/users", users);

app.use(express.static(path.join(__dirname, "public")));

//Index Route...
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start Server...
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
