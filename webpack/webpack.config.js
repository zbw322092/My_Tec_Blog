var path = require('path');

const config = {
  entry: './client/home/index.js',
  output: {
    path: path.resolve(__dirname, '../public/home'),
    filename: 'home.bundle.js'
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif)$/, use: ["file-loader"] },
      { test: /\.html$/, use: ["html-loader"] },
      { test: /\.(less|css)$/, use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader"
      }] }
    ]
  }
};

module.exports = config;