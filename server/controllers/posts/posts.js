var express = require('express');
var router = express.Router();
var postModel = require('../../models/posts/postModel.js');
var userModel = require('../../models/users/usersModel.js');

router.get('/posts', postModel.getAllPost);

router.post('/post', userModel.loginRequired, postModel.createPost);

// get single post which specified with post_id
router.get('/post/:id', postModel.getOnePost);

router.put('/update_post', postModel.updateOnePost);

router.delete('/delete_post', postModel.deleteOnePost);

router.post('/like', postModel.likePost);


module.exports = router;
