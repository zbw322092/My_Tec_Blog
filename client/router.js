var app = angular.module('my_tec_blog', ['ui.router']);

app.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('index', {
      url: '',
      controller: 'IndexCtrl',
      templateUrl: '/client/view/index.html'
    });

});