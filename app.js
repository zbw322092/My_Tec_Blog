var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8888;
var routers = require('./server/routers.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: require('./database.config.js').databasePwd,
  database: require('./database.config.js').databaseName
});
connection.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

routers(app);

app.use(express.static(path.join(__dirname)));

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});