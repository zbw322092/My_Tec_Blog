var express = require('express');
var router = express.Router();
var usersModel = require('../../models/users/usersModel.js');

router.post('/register', usersModel.register);

router.post('/login', usersModel.login);

router.get('/logout', usersModel.loginRequired, usersModel.logout);

router.post('/user_exist', usersModel.userExist);

router.get('/basic_info', usersModel.loginRequired, usersModel.basicInfo);

module.exports = router;