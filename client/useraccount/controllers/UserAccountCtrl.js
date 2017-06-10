app.controller('UserAccountCtrl', [
  '$scope',
  '$http',
  '$state',
  'ngDialog',
  function(
    $scope,
    $http,
    $state,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";

    initPage();
    function initPage() {
      var getUserDataSetting = {
        method: 'GET',
        url: '/api/user/basic_info',
        params: {
          size: 2,
          page: 1
        }
      };

      $http(getUserDataSetting)
        .then(function(result) {
          var data = result.data.data || {};
          console.log('data: ', result);
          $scope.posts = data.posts;
          
          $scope.postAmount = $scope.posts.length;
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    }

    $scope.readMore = function(index) {
      $state.go('post', {
        id: $scope.posts[index]['post_id']
      });
      console.log('Read More............');
    };

    $scope.showEditIcon = function(index) {
      var iconIndex = 'showEditIcon' + index;
      $scope[iconIndex] = true;
    };

    $scope.hideEditIcon = function(index) {
      var iconIndex = 'showEditIcon' + index;
      $scope[iconIndex] = false;
    };

    $scope.editPost = function(index) {
      console.log('Edit this post: ', index);
      $state.go('editPost', {
        id: $scope.posts[index]['post_id']
      });
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
          tags: $scope.tags,
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
