var webpack = require('webpack');
var webpackConfig = require('../../webpack/webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

function webpackMiddleware(app) {
  var webpackCompiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

module.exports = webpackMiddleware;