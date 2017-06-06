var webpack = require('webpack');
var path = require('path');
var minimatch = require('minimatch');
var chalk = require('chalk');
var webpackEntries = require('../project.config.js').webpack.entry;

function entryFilter() {

  var entryModules = process.env.ENTRY_MODULES ? JSON.parse(process.env.ENTRY_MODULES) || [] : [];

  var entryKeys = Object.keys(webpackEntries);
  var newEntry = {};
  entryModules.forEach(function(value, index) {
    var matchResult =  minimatch.match(entryKeys, value, { matchBase: true });
    if (matchResult.length) {
      matchResult.forEach(function(matchValue, matchIndex) {
        newEntry[matchValue] = webpackEntries[matchValue];
      });
    }
  });
  console.log(chalk.green('--------------Webpack entries--------------'));
  console.log(newEntry);
  console.log(chalk.green('--------------Webpack entries--------------'));
  return newEntry;
}


const config = {
  // entry: {
  //   home: './client/home/index.js',
  //   useraccount: './client/useraccount/index.js'
  // },
  entry: entryFilter(),
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: './[name]/bundle.js',
    publicPath: 'http://localhost:8889/public/'
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
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;