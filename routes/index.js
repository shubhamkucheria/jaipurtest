const router = require('express').Router();
// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'Jaipur Assignment Vote'});
});

module.exports = router;
