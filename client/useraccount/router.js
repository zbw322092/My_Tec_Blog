app.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('index', {
      url: '',
      controller: 'UserAccountCtrl',
      templateUrl: './client/useraccount/view/user_account.html'
    });

});