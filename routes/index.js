const router = require('express').Router();
const electionController = require('../controllers/electionController');
// basics routes
// router.get('/', (req, res) => {
//   res.render('index', {title: 'Jaipur Assignment - Basic Voting', weather: 'define weather'});
// });
router.get('/', electionController.weather);
module.exports = router;
