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

      var createPostSetting = {
        method: 'POST',
        url: '/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          title: $scope.postTitle,
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
