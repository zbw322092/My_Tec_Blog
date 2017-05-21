var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8888;
var routers = require('./server/routers.js');

routers(app);

app.use(express.static(path.join(__dirname)));

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});