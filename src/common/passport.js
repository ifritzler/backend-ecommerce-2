const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/users/user.service");

const passportConfig = () => {
  passport.use("local", new LocalStrategy({ usernameField: "email", passwordField: "password" },
    function(email, password, done) {
      userService.getById(email).then(user => {
        if (!user) {
          return done(null, false);
        }
        if (!user.isValidatePassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      }).catch(err => {
        if (err) {
          return done(err);
        }
      });
    }
  ));

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    return done(null, user.email);
  });

// used to deserialize the user
  passport.deserializeUser(function(email, done) {
    userService.getById(email).then(user => {
      return user;
    }).catch(err => {
      return done(err, false);
    });
  });
};

module.exports = passportConfig;