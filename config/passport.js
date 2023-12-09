const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");

module.exports = function (passport) {
  let options = {}; // object

  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  options.secretOrKey = config.secretKey;

  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      // console.log("the id: " + jwt_payload._id);

      User.getUserById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    //console.log("in the serializer..." + user._id);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
};
