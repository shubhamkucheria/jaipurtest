const router = require('express').Router();

const userController = require('../controllers/user');
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');

/* *** GET ENDPOINTS *** */
router.post('/vote', ensureGuest, userController.vote);
router.post('/partyvote', ensureGuest, userController.vote);
router.get('/login', ensureGuest, userController.login);
router.get('/register', ensureGuest, userController.register);
router.get('/logout', ensureAuthenticated, userController.logout);
router.get('/secret', ensureAuthenticated, userController.secret);
/* *** POST ENDPOINTS *** */
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
module.exports = router;
