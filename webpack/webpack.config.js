var path = require('path');

const config = {
  entry: './client/home/index.js',
  output: {
    path: path.resolve(__dirname, '../public/home'),
    filename: 'home.bundle.js'
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif)$/, use: [{ 
        loader: "file-loader",
        options: {
          name: `[path][name].[ext]`
        }
      }] },
      { test: /\.html$/, use: [{
        loader: "ngtemplate-loader",
        options: {
          relativeTo: process.cwd()
        }
      },{
        loader: "html-loader"
      }] },
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