var express = require('express');
var router = express.Router();

router.use('/home', function(req, res, next) {
  res.render('common/index', {
    moduleName: 'home'
  });
});
router.use('/useraccount', function(req, res, next) {
  res.render('common/index', {
    moduleName: 'useraccount'
  });
});

module.exports = router;
