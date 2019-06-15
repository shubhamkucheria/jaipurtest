const router = require('express').Router();

const electionController = require('../controllers/electionController');
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');

/* *** GET ENDPOINTS *** */
router.post('/vote', ensureGuest, electionController.vote);
router.post('/partyvote', ensureGuest, electionController.vote);
router.get('/login', ensureGuest, electionController.login);
router.get('/register', ensureGuest, electionController.register);
router.get('/logout', ensureAuthenticated, electionController.logout);
router.get('/secret', ensureAuthenticated, electionController.secret);
/* *** POST ENDPOINTS *** */
router.post('/register', electionController.postRegister);
router.post('/login', electionController.postLogin);
module.exports = router;
