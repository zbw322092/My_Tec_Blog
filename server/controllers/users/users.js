var express = require('express');
var router = express.Router();
var usersModel = require('../../models/users/usersModel.js');

router.post('/register', function(req, res) {
  usersModel.register(req, res);
});

module.exports = router;