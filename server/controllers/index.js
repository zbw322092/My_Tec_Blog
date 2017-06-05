var express = require('express');
var router = express.Router();

router.use('/post', require('./posts/posts'));
router.use('/user', require('./users/users'));

module.exports = router;