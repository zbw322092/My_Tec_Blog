app.controller('IndexCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  'ngDialog',
  function(
    $scope,
    $rootScope,
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

    // login
    $scope.login = function(hoverStatus) {
      if (!hoverStatus) {
        return;
      }
      console.log('login');
      ngDialog.open({
        template: '../client/view/login_dialog.html',
        plain: false,
        className: 'ngdialog-theme-default login-dialog'
      });
      // var loginSetting = {
      //   method: 'POST',
      //   url: '/login',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: {
      //     email: 'youremail@hotmail.com',
      //     password: 'yourpassword'
      //   }
      // };

      // $http(loginSetting)
      //   .then(function(result) {
      //     console.log('login result: ', result);
      //   })
      //   .catch(function(err) {
      //     console.log('login err: ', err);
      //   });
    };

    // logout
    $scope.logout = function() {
      var logoutSetting = {
        method: 'GET',
        url: '/logout',
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

    $scope.register = function() {
      console.log('register');
      ngDialog.open({
        templateUrl: '../client/view/register_dialog.html',
        plain: false,
        scope: $scope,
        className: 'ngdialog-theme-default register-dialog'
      });
      // var registerSetting = {
      //   method: 'POST',
      //   url: '/register',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: {
      //     name: 'myname',
      //     email: 'myemail@hotmail.com',
      //     phone: '13511111122',
      //     password: 'mypassword'
      //   }
      // }
      // $http(registerSetting)
      //   .then(function(result) {
      //     console.log('sign up result: ', result);
      //   })
      //   .catch(function(err) {
      //     console.log('sign up error: ', err);
      //   });
    };

    $scope.submitRegisterForm = function() {
      // ngDialog creates a new child scope, so get data likes $scope.register.email does not working, 
      // using we can get ng-model value using this.email.
      console.log(this.registerForm.email.$modelValue);
    };

    // evaluate password strength(week, middle and strong)
    $scope.evaluatePassword = function(password) {
      $scope.showStrengthBar = false;
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
      if (!password || password.length < 6 || password.length > 255) {
        return $scope.showStrengthBar = false;
      } else if (strongRegex.test(password)) {
        $scope.showStrengthBar = true;
        $scope.weekLevel = true;
        $scope.middleLevel = true;
        $scope.strongLevel = true;
      } else if (mediumRegex.test(password)) {
        $scope.showStrengthBar = true;
        $scope.weekLevel = true;
        $scope.middleLevel = true;
        $scope.strongLevel = false;
      } else {
        $scope.showStrengthBar = true;
        $scope.weekLevel = true;
        $scope.middleLevel = false;
        $scope.strongLevel = false;
      }
    };

    // check whether the retyped password matches previous typed password
    $scope.passwordMatched = function(password, retypedPassword) {
      if (password === retypedPassword) {
        return $scope.passwordsMatched = true;
      }
      return $scope.passwordsMatched = false;
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
