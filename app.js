var path = require('path');
var express = require('express');
var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var helpers = require('handlebars-helpers')();
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
    maxAge: 6000000
  },
  saveUninitialized: false,
  resave: false
}));

var handlebars = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'server/views/layouts/',
  partialsDir: 'server/views/partials/',
  helpers: helpers
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'server/views/'));


app.use(function(req, res, next) {
  app.locals.loginStatus = req.session.key ? true : false;
  next();
});

routers(app);

app.listen(port, function() {
  console.log('Express Server is Listening on Port ', port);
});

module.exports = app;