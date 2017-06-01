var express = require('express');
var router = express.Router();
var usersModel = require('../../models/users/usersModel.js');

router.post('/register', usersModel.register);

router.post('/login', usersModel.login);

router.get('/logout', usersModel.logout);

router.post('/user_exist', usersModel.userExist);

module.exports = router;