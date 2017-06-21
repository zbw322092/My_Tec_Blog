app.controller('IndexCtrl', [
  '$scope',
  '$q',
  'HomeService',
  'ngDialog',
  function(
    $scope,
    $q,
    HomeService,
    ngDialog
  ) {

    console.log('window.GLOBAL.loginStatus: ', window.GLOBAL.loginStatus);

    $scope.loginStatus = window.GLOBAL.loginStatus;
    var homeService = new HomeService();

    var likedPostArr = [];

    initiPage();
    function initiPage() {

      if ($scope.loginStatus) {
        $q.all([
          homeService.getPosts(),
          homeService.getLikes()
        ])
        .then(function (result) {
          renderPostandLikes(result);
        })
        .catch(function (err) {
          console.log(err);
        });


      } else {
        homeService.getPosts()
          .then(function(result) {
            var responseData = result.data;
            $scope.posts = responseData;
          })
          .catch(function(err) {
            console.log('err: ', err);
          });
      }
    }


    function renderPostandLikes(result) {
      var postsResult = result[0].data;
      var likeResult = result[1].data;

      likeResult.forEach(function(value, key, array) {
        likedPostArr.push(value.post_id);
      });

      postsResult.forEach(function(value,key,array) {
        if (likedPostArr.indexOf(value.post_id) != -1) {
          value["isLiked"] = true;
        }
      });

      $scope.posts = postsResult;
    }


    // click login icon to open login window
    var loginDialog;
    $scope.login = function(status) {
      if (status) {
        window.location.href = 'http://localhost:8889/useraccount';
      }
      loginDialog = ngDialog.open({
        templateUrl: '../client/home/view/login_dialog.html',
        plain: false,
        scope: $scope,
        className: 'ngdialog-theme-default login-dialog'
      });
    };

    // submit user login info
    $scope.submitLoginForm = function() {
      var loginFormData = {};
      loginFormData.email = this.loginForm.email.$modelValue;
      loginFormData.password = this.loginForm.password.$modelValue;
      var loginReqData = {
        method: 'POST',
        data: loginFormData
      };

      homeService.login(loginReqData)
        .then(function(result) {
          console.log('login result: ', result);
          loginDialog.close();
          loginDialog.closePromise.then(function() {
            window.location.reload();
          });
        })
        .catch(function(err) {
          console.log('login err: ', err);
        });
    };

    $scope.register = function() {
      console.log('register');
      ngDialog.open({
        templateUrl: '../client/home/view/register_dialog.html',
        plain: false,
        scope: $scope,
        className: 'ngdialog-theme-default register-dialog'
      });
    };

    $scope.submitRegisterForm = function() {
      // ngDialog creates a new child scope, so get data likes $scope.register.email does not working, 
      // using we can get ng-model value using this.email.
      var registerFormData = {};
      registerFormData.email = this.registerForm.email.$modelValue;
      registerFormData.name = this.registerForm.username.$modelValue;
      registerFormData.phone = this.registerForm.phone.$modelValue;
      registerFormData.password = this.registerForm.password.$modelValue;

      var registerReqData = {
        method: 'POST',
        data: registerFormData
      };

      homeService.register(registerReqData)
        .then(function(result) {
          console.log('sign up result: ', result);
        })
        .catch(function(err) {
          console.log('sign up error: ', err);
        });
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
      if ((password === retypedPassword) && password && retypedPassword) {
        return $scope.passwordsMatched = true;
      }
      return $scope.passwordsMatched = false;
    };

    $scope.userExist = function() {
      var reqData = {
        method: 'POST',
        data: {
          email: 'youremail@hotmail.com'
        }
      };

      homeService.userExist(reqData)
        .then(function(result) {
          console.log('user exist result: ', result);
        })
        .catch(function(err) {
          console.log('user exist error: ', err);
        });
    };

    
    // click 'like' icon to like this post
    $scope.likeThisPost = function(index) {
      var post_id = $scope.posts[index].post_id;

      var reqData = {
        method: 'POST',
        data: {
          post_id: post_id
        }
      };

      homeService.likePost(reqData)
        .then(function(result) {
          console.log('Like result: ', result);
          $scope.posts[index]['isLiked'] = true;
          
          $scope.posts[index].like_times += 1;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    $scope.unlikeThisPost = function(index) {
      var post_id = $scope.posts[index].post_id;

      var reqData = {
        method: 'POST',
        data: {
          post_id: post_id
        }
      };

      homeService.unlikePost(reqData)
        .then(function(result) {
          console.log('Like result: ', result);
          $scope.posts[index]['isLiked'] = false;

          $scope.posts[index].like_times -= 1;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

  }
]);
