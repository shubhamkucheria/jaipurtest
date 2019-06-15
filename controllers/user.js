const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Vote = require('../models/Vote');

module.exports = {
  /* *** GET ENDPOINTS *** */
  login: (req, res) => res.render('auth/login'),
  register: (req, res) => res.render('auth/register'),
  vote: (req, res) => {
    const newvote = new Vote({
              name: req.body.party,
              vote: 1
    });                

    User.update({
            "email" : 'b@b.com'}
            ,{
                $set: { "voted" : true}
        }, function (err, success) {
            if (err) {
                res.send(err);
            } else {
              res.send(req.body);
            }
        });
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  },
  secret: (req, res) => res.render('auth/secret'),
  /* *** POST ENDPOINTS *** */
  postRegister: (req, res) => {
    let errors = [];

    if (req.body.password != req.body.rpassword)
      errors.push({text: 'Password do not match'});
    if (req.body.password.length < 4)
      errors.push({text: 'Password must be at least 4 characters!'});
    // verify if errors exist
    if (errors.length > 0) {
      res.render('auth/register', {
        errors,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        rpassword: req.body.rpassword
      });
    }  else {
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
      }
  },
  postLogin: (req, res, next) => {
    passport.authenticate('local', {
     successRedirect: '/auth/secret',
     failureRedirect: '/auth/login'
   })(req, res, next);
 } // Finish
};
