const express = require("express");
const router = express.Router();
const User = require("../models/user"); // three parts are exported in this user model
const jwt = require("jsonwebtoken");
const passport = require("passport-jwt");


// Register...
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, (results) => {
    if(results){
      res.json({ success: true, msg: "User registered" });
    }else {
      res.json({success: false, msg:"Failed to save User"});
    }
  });
});



router.post("/authenticate", (req, res, next) => {
  res.send("Authenticate!");
});

router.get("/profile", (req, res, next) => {
  res.send("profile!");
});

module.exports = router;
