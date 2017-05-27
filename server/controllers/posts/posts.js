var express = require('express');
var router = express.Router();
var postModel = require('../../models/posts/postModel.js');

router.get('/posts', function(req, res) {
  postModel.getAllPost(req, res);
});

router.post('/post', function(req, res) {
  console.log(req.body);
  postModel.createPost(req, res);
});


module.exports = router;
