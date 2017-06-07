app.controller('UserAccountCtrl', [
  '$scope',
  '$http',
  'ngDialog',
  function(
    $scope,
    $http,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";

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
          $scope.created = data.created.slice(0, 10);
          $scope.modified = data.modified;
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    }

    $scope.readMore = function() {
      console.log('Read More............');
    };


    // logout
    $scope.logout = function() {
      var logoutSetting = {
        method: 'GET',
        url: '/api/user/logout',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      $http(logoutSetting)
        .then(function(result) {
          console.log('logout result: ', result);
        })
        .catch(function(err) {
          console.log('logout err: ', err);
        });
    };


    // submit post
    $scope.submitPost = function() {
      var createPostSetting = {
        method: 'POST',
        url: '/api/post/post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          postTitle: $scope.postTitle,
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
