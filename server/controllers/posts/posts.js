var express = require('express');
var router = express.Router();
var postModel = require('../../models/posts/postModel.js');

router.get('/posts', function(req, res) {
  res.send('I am a separate router');
});

router.post('/post', function(req, res) {
  console.log(req.body);
  console.log('req.getConnection: ', req.getConnection);
  postModel.createPost(req);
});

module.exports = router;
