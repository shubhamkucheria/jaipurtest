const router = require('express').Router();
const electionController = require('../controllers/electionController');
router.get('/', electionController.weather);
module.exports = router;
