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
        var responseData = result.data.data;
        console.log('result: ', result.data.data);
        initiPage(responseData);
      })
      .catch(function(err) {
        console.log('err: ', err);
      });

    function initiPage(result) {
      $scope.posts = result;
    }



    // submit post
    $scope.submitPost = function() {
      var createPostSetting = {
        method: 'POST',
        url: '/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          postTitle: $scope.postTitle,
          author: $scope.postAuthor,
          content: $scope.postContent
        }
      };

      $http(createPostSetting)
        .then(function(result) {
          console.log('post result: ', result);
        })
        .catch(function(err) {
          console.log('post err: ', err);
        });
    };


  }
]);
