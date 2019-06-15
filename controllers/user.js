const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Vote = require('../models/Vote');

module.exports = {
  /* *** GET ENDPOINTS *** */
  login: (req, res) => res.render('auth/login'),
  register: (req, res) => res.render('auth/register'),
  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  },
  secret: (req, res) => res.render('auth/secret'),
  /* *** POST ENDPOINTS *** */
  postRegister: (req, res) => {
      User.findOne({email: req.body.email})
        .then(user => {
          if (user) {
            errors.push({text: 'User already exist!'});
            res.render('auth/register', {errors, name: '', email: '', password: '', rpassword: ''});
          } else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              voted: false
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    console.log(`User ${user.name} register!`);
                    res.redirect('/auth/login');
                })
                .catch(err => console.log(err));
              });
            });
          }
        });
  },
  postLogin: (req, res, next) => {
    passport.authenticate('local', {
     successRedirect: '/auth/secret',
     failureRedirect: '/auth/login'
   })(req, res, next);
 } // Finish
};
