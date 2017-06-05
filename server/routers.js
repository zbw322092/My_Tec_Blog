var express = require('express');
var postsRoute = require('./controllers/posts/posts.js');
var usersRoute = require('./controllers/users/users.js');

module.exports = function(app) {

  app.use('/api', require('./controllers/'));
  app.use('/', require('./pages/'));
  
};

