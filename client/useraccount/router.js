app.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('index', {
      url: '',
      controller: 'UserAccountCtrl',
      templateUrl: './client/useraccount/view/user_account.html'
    })
    .state('post', {
      url: '/post/:id',
      controller: 'UserPostCtrl',
      templateUrl: './client/useraccount/view/user_post.html'
    });

});