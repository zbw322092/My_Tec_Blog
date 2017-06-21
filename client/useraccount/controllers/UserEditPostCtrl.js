app.controller('UserEditPostCtrl', [
  '$scope',
  '$http',
  '$state',
  '$stateParams',
  'UserEditPostService',
  'ngDialog',
  function(
    $scope,
    $http,
    $state,
    $stateParams,
    UserEditPostService,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";
    var post_id = $stateParams.id || '';
    var userEditPostService = new UserEditPostService();

    initPage();
    function initPage() {
      userEditPostService.getSinglePost(post_id)
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


    $scope.updatePost = function() {
      var reqData = {
        method: 'PUT',
        url: '/api/post/update_post',
        params: {
          postId: post_id
        },
        data: {
          postTitle: $scope.post.post_title,
          tags: $scope.post.tags,
          postContent: $scope.post.post_content
        }
      };

      userEditPostService.updatePost(reqData)
        .then(function(result) {
          if (result.code === '0000') {
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

    $scope.deletePost = function() {
      var reqData = {
        method: 'DELETE',
        params: {
          postId: post_id
        }
      };

      userEditPostService.deletePost(reqData)
        .then(function(result) {
          if (result.code === '0000') {
            console.log('hhhhhhhh');
            $state.go('index');
          } else {
            console.log(result.message);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    };



  }
]);
