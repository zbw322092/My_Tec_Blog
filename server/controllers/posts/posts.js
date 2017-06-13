var express = require('express');
var router = express.Router();
var postModel = require('../../models/posts/postModel.js');
var usersModel = require('../../models/users/usersModel.js');

router.get('/posts', postModel.getAllPost);

router.post('/post', usersModel.loginRequired, postModel.createPost);

// get single post which specified with post_id
router.get('/post/:id', postModel.getOnePost);

router.put('/update_post', postModel.updateOnePost);

router.delete('/delete_post', postModel.deleteOnePost);

router.post('/like', usersModel.loginRequired, postModel.likePost);

router.get('/likes', usersModel.loginRequired, postModel.getLikes);

router.post('/unlike', usersModel.loginRequired, postModel.unlikePost);

module.exports = router;
