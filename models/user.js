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

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback){
    // before we add newUser to the database we first have to hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(callback);

        });
    })
}