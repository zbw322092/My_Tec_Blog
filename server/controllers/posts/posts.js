var express = require('express');
var router = express.Router();

router.get('/posts', function(req, res) {
  res.send('I am a separate router');
});

router.post('/post', function(req, res) {
  console.log(req.body);
  res.send('aaaaa');
});

module.exports = router;
