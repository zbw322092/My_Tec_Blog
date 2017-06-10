app.controller('UserEditPostCtrl', [
  '$scope',
  '$http',
  '$state',
  '$stateParams',
  'ngDialog',
  function(
    $scope,
    $http,
    $state,
    $stateParams,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";

    var post_id = $stateParams.id || '';

    initPage();
    function initPage() {
      var getSinglePostSetting = {
        method: 'GET',
        url: '/api/post/post/' + post_id,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      $http(getSinglePostSetting)
        .then(function(result) {
          if (result.data.code === '0000') {
            $scope.post = result.data.data[0] || {};
          } else {
            console.log(result.message);
          }
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    }


    $scope.updatePost = function() {
      var updatePostSetting = {
        method: 'PUT',
        url: '/api/post/update_post',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          postId: post_id
        },
        data: {
          postTitle: $scope.post.post_title,
          tags: $scope.post.tags,
          postContent: $scope.post.post_content
        }
      };

      $http(updatePostSetting)
        .then(function(result) {
          if (result.data.code === '0000') {
            $state.go('post', {
              id: post_id
            });
          } else {
            console.log(result.message);
          }
        })
        .catch(function(err) {
          console.log('err: ', err);
        });
    };



  }
]);
