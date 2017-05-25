var express = require('express');
var postsRoute = require('./controllers/posts/posts.js');

module.exports = function(app) {
  app.get('/posts', postsRoute);
  app.post('/post', postsRoute);
};

