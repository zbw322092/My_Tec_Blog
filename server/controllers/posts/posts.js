var express = require('express');
var router = express.Router();

router.get('/posts', function(req, res) {
  res.send('I am a separate router');
});

module.exports = router;
