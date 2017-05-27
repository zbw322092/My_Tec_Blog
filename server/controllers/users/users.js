var express = require('express');
var router = express.Router();
var usersModel = require('../../models/users/usersModel.js');

router.post('/register', function(req, res) {
  usersModel.register(req, res);
});

router.post('/login', function(req, res) {
  usersModel.login(req, res);
});

router.post('/user_exist', function(req, res) {
  usersModel.userExist(req, res);
});

module.exports = router;