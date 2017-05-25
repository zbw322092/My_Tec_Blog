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

    // submit post
    $scope.submitPost = function() {
      console.log(
        'Post title: '+ $scope.postTitle, 
        'Post author: '+ $scope.postAuthor, 
        'Post content: '+ $scope.postContent
      );
    };


  }
]);
