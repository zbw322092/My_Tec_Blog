app.controller('IndexCtrl', [
  '$scope',
  '$http',
  function(
    $scope,
    $http
  ) {

    var getPostSetting = {
      method: 'GET',
      url: '/posts'
    };
    $http(getPostSetting)
      .then(function(result) {
        console.log('result: ', result);
      })
      .catch(function(err) {
        console.log('err: ', err);
      });

  }
]);
