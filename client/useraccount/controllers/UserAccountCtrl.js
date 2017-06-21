app.controller('UserAccountCtrl', [
  '$scope',
  '$state',
  'UserAccountService',
  'ngDialog',
  function(
    $scope,
    $state,
    UserAccountService,
    ngDialog
  ) {

    $scope.username = window.GLOBAL.username ? window.GLOBAL.username : "";
    var userAccountService = new UserAccountService();

    $scope.size = 3;

    initPage();
    function initPage() {
      var reqData = {
        method: 'GET',
        params: {
          size: $scope.size,
          page: 1
        }
      };

      userAccountService.getUserData(reqData)
        .then(function(result) {
          var data = result.data || {};
          console.log('data: ', result);
          $scope.posts = data.posts;
          
          $scope.postAmount = data.postAmount;
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

      userAccountService.logout()
        .then(function(result) {
          console.log('logout result: ', result);
          window.location.href = "http://localhost:8889/home?env=me";
        })
        .catch(function(err) {
          console.log('logout err: ', err);
        });
    };


    // submit post
    // $scope.submitPost = function() {
    //   var createPostSetting = {
    //     method: 'POST',
    //     url: '/api/post/post',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       postTitle: $scope.postTitle,
    //       tags: $scope.tags,
    //       content: $scope.postContent
    //     }
    //   };

    //   $http(createPostSetting)
    //     .then(function(result) {
    //       console.log('post result: ', result);
    //     })
    //     .catch(function(err) {
    //       console.log('post err: ', err);
    //     });
    // };

    $scope.turnPage = function(page) {
      var reqData = {
        method: 'GET',
        params: {
          size: $scope.size,
          page: page
        }
      };

      userAccountService.getPageData(reqData)
        .then(function(result) {
          var data = result.data || {};
          $scope.posts = data.posts;
          $scope.postAmount = data.postAmount;
        })
        .catch(function(err) {
          console.log('err: ', err);
        });

    };


  }
]);
