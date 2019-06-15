const router = require('express').Router();

module.exports = {
  /*  GET ENDPOINTS  */
  login: (req, res) => res.render('auth/login'),
  register: (req, res) => res.render('auth/register'),
  logout: (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  },
  /*  POST ENDPOINTS  */
  postRegister: (req, res) => {
   
    const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              voted: false
            });
           
      newUser.save()
        .then(user => {
          console.log(`User ${user.name} register!`);
          res.redirect('/auth/login');
      })
  },
  postLogin: (req, res, next) =>  res.redirect('/auth/secret');    
};
