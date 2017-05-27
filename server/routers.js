var express = require('express');
var postsRoute = require('./controllers/posts/posts.js');
var usersRoute = require('./controllers/users/users.js');

module.exports = function(app) {
  app.get('/posts', postsRoute);
  app.post('/post', postsRoute);

  app.post('/register', usersRoute);
};

