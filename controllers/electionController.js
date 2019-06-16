const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Vote = require('../models/Vote');
const request = require('request');
const {WEATHER_URL_KEY} = require('../config/');

module.exports = {
  /* *** GET ENDPOINTS *** */
  login: (req, res) => res.render('auth/login'),
  register: (req, res) => res.render('auth/register'),
  status: (req, res) => {

    if(req.user.isadmin) {
      Vote.find()
        .then(partyDetails => {
          
            console.log('partyDetails', partyDetails);
            res.render('auth/partyvote', {isadmin: req.user.isadmin,
                  status: 'Voting Status', party: partyDetails})          
        });
    } else {
      res.render('auth/partyvote', {isadmin: req.user.isadmin,
                  status: '', party: []})
    }
    
    
  },
  partyvote: (req, res) => {

    Vote.find()
        .then(partyDetails => {
          
            console.log('partyDetails', partyDetails);
            res.send(partyDetails);
          
        });
  },
  vote: (req, res) => {  

                    
    
    User.update({
            "email" : req.user.email}
            ,{
                $set: { "voted" : true}
        }, function (err, success) {
            if (err) {
                res.send(err);
            } else {
              Vote.update({
            "name" : req.body.party}
            ,{
                $inc: { "vote" : 1}
        }, function (err, success) {
            console.log('hello vote update');
            res.render('auth/vote', {
               acknowledgeMsg: 'Thanks for your valuable vote'})
        });
            }
        });
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  },
  secret: (req, res) => {
    console.log('coming to secret page = ', req.user.voted );    
    res.render('auth/secret', { alreadyVoted: req.user.voted, isadmin: req.user.isadmin})
  },
  /* *** POST ENDPOINTS *** */
  postRegister: (req, res) => {
    console.log('postRegister');
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
              voted: false,
              isadmin: false
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
