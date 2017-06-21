app.controller('IndexCtrl', [
  '$scope',
  '$http',
  '$q',
  'HomeService',
  'ngDialog',
  function(
    $scope,
    $http,
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
      var getPostSetting = {
        method: 'GET',
        url: '/api/post/posts'
      };
      var getLikesSetting = {
        method: 'GET',
        url: '/api/post/likes'
      };

      if ($scope.loginStatus) {
        var postRequest = $http(getPostSetting);
        var likeRequest = $http(getLikesSetting);
        $q.all([
          postRequest,
          likeRequest
        ])
        .then(function (result) {
          renderPostandLikes(result);
        })
        .catch(function (err) {
          console.log(err);
        });


      } else {
        $http(getPostSetting)
          .then(function(result) {
            var responseData = result.data.data;
            $scope.posts = responseData;
          })
          .catch(function(err) {
            console.log('err: ', err);
          });
      }
    }


    function WebApiTest() {

      homeService.getPosts()
        .then(function(result) {
          console.log('webapi request result: ', result);
        })
        .catch(function(error) {
          console.log('webapi request error: ', error);
        });

    }
    WebApiTest();


    function renderPostandLikes(result) {
      var postsResult = result[0].data.data;
      var likeResult = result[1].data.data;

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
      var loginSetting = {
        method: 'POST',
        url: '/api/user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginFormData
      };

      $http(loginSetting)
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
      console.log(this.registerForm.email.$modelValue);
      var registerFormData = {};
      registerFormData.email = this.registerForm.email.$modelValue;
      registerFormData.name = this.registerForm.username.$modelValue;
      registerFormData.phone = this.registerForm.phone.$modelValue;
      registerFormData.password = this.registerForm.password.$modelValue;
      console.log('registerFormData: ', registerFormData);

      var registerSetting = {
        method: 'POST',
        url: '/api/user/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: registerFormData
      }
      $http(registerSetting)
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
      var userExistSetting = {
        method: 'POST',
        url: '/api/user/user_exist',
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

    
    // click 'like' icon to like this post
    $scope.likeThisPost = function(index) {
      var post_id = $scope.posts[index].post_id;

      var likePostSetting = {
        method: 'POST',
        url: '/api/post/like',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          post_id: post_id
        }
      };

      $http(likePostSetting)
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

      var unlikePostSetting = {
        method: 'POST',
        url: '/api/post/unlike',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          post_id: post_id
        }
      };

      $http(unlikePostSetting)
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
