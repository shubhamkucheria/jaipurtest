const router = require('express').Router();
// basics routes
router.get('/', (req, res) => {
  res.render('index', {title: 'Jaipur Assignment - basic Vote system'});
});

module.exports = router;
