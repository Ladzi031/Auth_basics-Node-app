const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// make model out of the schema
const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = async function (id, callback) {
  try {
    const user = await User.findById(id).lean();
    if (user) {
      callback(false, user);
    } else {
      callback(false, null);
    }
  } catch (error) {
    callback(true, error);
  }
};
module.exports.getUserByName = async function (name, callback) {
  const query = { name: name };

  try {
    let user = await User.findOne(query).lean();

    callback(false, user);
    //console.log("in the try block", user);
  } catch (error) {
    callback(error, null);
  }
};
module.exports.addUser = function (newUser, callback) {
  function resolve() {
    callback(true);
  }
  function rejected() {
    callback(false);
  }

  // before we add newUser to the database we first have to hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(resolve, rejected);
    });
  });
};

module.exports.comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) {
      throw new Error("failed to compare password, in the model: " + err);
    }
    callback(false, isMatch);
  });
};
