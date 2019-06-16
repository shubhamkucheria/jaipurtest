const router = require('express').Router();
// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'Jaipur Assignment - Basic Voting', weather: 'define weather'});
});

module.exports = router;
