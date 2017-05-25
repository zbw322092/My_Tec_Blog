var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8889;
// build database connection
var databse = require('./server/database');
var routers = require('./server/routers.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
routers(app);

app.use(express.static(path.join(__dirname)));

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});