app.controller('UserPostCtrl', [
  '$scope',
  '$http',
  '$state',
  '$stateParams',
  'UserPostService',
  'ngDialog',
  function(
    $scope,
    $http,
    $state,
    $stateParams,
    UserPostService,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";
    var post_id = $stateParams.id || '';
    var userPostService = new UserPostService();

    initPage();
    function initPage() {

      userPostService.getSinglePost(post_id)
        .then(function(result) {
          if (result.code === '0000') {
            $scope.post = result.data[0] || {};
          } else {
            console.log(result.message);
          }
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    }



  }
]);
