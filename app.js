var express = require('express');
var app = express();
var port = process.env.PORT || 8888;

app.use('/', function(req, res) {
  res.send('Initial Code');
});

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});