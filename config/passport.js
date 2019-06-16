const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email}).then(user => {
      if (!user) {
        console.log('User not found!');
        return done(null, false, { message: 'User not found!' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log('user ', user);
          return done(null, user);
        } else {
          console.log('Password incorrect!');
          return done(null, false, { message: 'Password incorrect!' })
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    User.findById(id, function(err, user) {
      done(err, user);
  });
});
}
