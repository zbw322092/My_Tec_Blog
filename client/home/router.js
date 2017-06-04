// var app = angular.module('my_tec_blog', ['ui.router', 'ngDialog']);

app.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('index', {
      url: '',
      controller: 'IndexCtrl',
      templateUrl: './client/home/view/index.html'
    })
    .state('user', {
      url: '/user',
      controller: 'UserCtrl',
      templateUrl: './client/home/view/user.html'
    });

});