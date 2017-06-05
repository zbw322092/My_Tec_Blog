app.controller('UserAccountCtrl', [
  '$scope',
  '$http',
  'ngDialog',
  function(
    $scope,
    $http,
    ngDialog
  ) {

    initPage();
    function initPage() {
      var getUserDataSetting = {
        method: 'GET',
        url: '/api/user/basic_info'
      };

      $http(getUserDataSetting)
        .then(function(result) {
          var data = result.data.data || {};
          console.log('data: ', result);
          $scope.username = data.username;
          $scope.posts = data.posts;
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    }


  }
]);
