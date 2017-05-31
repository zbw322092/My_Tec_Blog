var path = require('path');
var express = require('express');
var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8889;
// build database connection
var databse = require('./server/database');
var routers = require('./server/routers.js');
// create redis client
var redisClient = redis.createClient();

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(session({
  secret: 'tec blog',
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient
  }),
  cookie: {
    maxAge: 60000
  },
  saveUninitialized: false,
  resave: false
}));

routers(app);

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});