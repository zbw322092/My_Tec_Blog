window.app = angular.module('my_tec_blog', ['ui.router', 'ngDialog']);

// it is an entry point prepare for webpack
// Library level dependencies
require('../../lib/lib_vendor/');
require('../../lib/lib_angular/core/');
require('../../lib/lib_angular/stylesheets/');

// Application level dependencies
require('../_config');

// Module level dependencies
require('./router.js');
require('./services');
require('./controllers/');
require('./stylesheets/index.js');
require('./view/');