var webpack = require('webpack');
var webpackConfig = require('../../webpack/webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var hostProxy = require('../../project.config').hostProxy;

function webpackMiddleware(app, port) {

  app.locals.PROJECT_ROOT = `${hostProxy}:${port}`;

  var webpackCompiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    stats: {
      colors: true
    },
    publicPath: 'http://localhost:8889/public/'
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

module.exports = webpackMiddleware;