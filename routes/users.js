const express = require("express");
const router = express.Router();
const User = require("../models/user"); // three parts are exported in this user model
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/database");

// Register endPoint...
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  User.addUser(newUser, (results) => {
    if (results) {
      res.json({ success: true, msg: "User registered" });
    } else {
      console.log("didn't save the new user!");
      res.json({ success: false, msg: "could not save user!" });
    }
  });
});

// Authenticate endPoint...
router.post("/authenticate", (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  User.getUserByName(name, (err, user) => {
    if (err) {
      throw new Error("failed to get user by name" + err);
    }
    if (!user) {
      //console.log(user);
      return res.json({ success: false, msg: "user not found!" });
    }

    const hash = user.password;
    User.comparePassword(password, hash, (err, isMatch) => {
      //console.log("in the compare password! ");
      if (err) {
        throw new Error("failed to compare password: " + err);
      }

      if (isMatch) {
        const token = jwt.sign(user, config.secretKey, {
          expiresIn: 604800, // 1 week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        res.json({ success: false, msg: "wrong password" });
      }
    });
  });
});

// Profile protected endPoint...
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
