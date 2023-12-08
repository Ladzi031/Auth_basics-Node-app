const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
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

app.use(express.static(path.join(__dirname, "public")));

// Middleware...
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: config.secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// path, middleware function/method....
app.use("/users", users);

//Index Route...
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start Server...
app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
