var express = require('express');
var router = express.Router();
var postModel = require('../../models/posts/postModel.js');
var userModel = require('../../models/users/usersModel.js');

router.get('/posts', postModel.getAllPost);

router.post('/post', userModel.loginRequired, postModel.createPost);


module.exports = router;
