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
      name: 'test',
      email: 'test@test.com',
      password: 'test@test.com',
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
