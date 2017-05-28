app.controller('IndexCtrl', [
  '$scope',
  '$http',
  'ngDialog',
  function(
    $scope,
    $http,
    ngDialog
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


    $scope.clickToOpen = function () {
        ngDialog.open({ 
          template: 'templateId',
          className: 'ngdialog-theme-default',
          // showClose: false
         });
    };

    $scope.login = function() {
      var loginSetting = {
        method: 'POST',
        url: '/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: 'youremail@hotmail.com',
          password: 'yourpassword'
        }
      };

      $http(loginSetting)
        .then(function(result) {
          console.log('login result: ', result);
        })
        .catch(function(err) {
          console.log('login err: ', err);
        });
    };

    $scope.signUp = function() {
      var signUpSetting = {
        method: 'POST',
        url: '/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          name: 'myname',
          email: 'myemail@hotmail.com',
          phone: '13511111122',
          password: 'mypassword'
        }
      }
      $http(signUpSetting)
        .then(function(result) {
          console.log('sign up result: ', result);
        })
        .catch(function(err) {
          console.log('sign up error: ', err);
        });
    };

    $scope.userExist = function() {
      var userExistSetting = {
        method: 'POST',
        url: '/user_exist',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: 'youremail@hotmail.com'
        }
      }
      $http(userExistSetting)
        .then(function(result) {
          console.log('user exist result: ', result);
        })
        .catch(function(err) {
          console.log('user exist error: ', err);
        });
    };


  }
]);
