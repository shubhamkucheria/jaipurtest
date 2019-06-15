const router = require('express').Router();

const userController = require('../controllers/user');


/* GET ENDPOINTS */
router.get('/logout');

/* POST ENDPOINTS */
router.post('/register');
router.post('/login');
module.exports = router;
