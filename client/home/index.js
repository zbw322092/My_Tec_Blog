window.app = angular.module('my_tec_blog', ['ui.router', 'ngDialog']);

// it is an entry point prepare for webpack
require('../../lib/lib_vendor/');
require('../../lib/lib_angular/core/');
require('../../lib/lib_angular/stylesheets/');

require('./router.js');
require('./controllers/');
require('./stylesheets/index.js');
require('./view/');