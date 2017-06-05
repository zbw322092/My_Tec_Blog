var express = require('express');
var router = express.Router();
var usersModel = require('../models/users/usersModel.js');

router.use('/home', function(req, res, next) {
  res.render('common/index', {
    moduleName: 'home'
  });
});
router.use('/useraccount', usersModel.loginRequired, function(req, res, next) {
  res.render('common/index', {
    moduleName: 'useraccount'
  });
});

module.exports = router;
