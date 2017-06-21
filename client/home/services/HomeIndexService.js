app.service('HomeService', ['BlogWebApi', function(BlogWebApi) {
  
  function defaultResProcess (result) {
    return result;
  }

  return BlogWebApi.extend({
    
    getPosts: function() {
      var reqData = this.getRequestData('/post/posts', {
        method: 'GET'
      });
      return this.request(reqData, defaultResProcess);
    },

    getLikes: function() {
      var reqData = this.getRequestData('/post/likes', {
        method: 'GET'
      });

      return this.request(reqData, defaultResProcess);
    },

    login: function(reqData) {
      var reqData = this.getRequestData('/user/login', reqData);

      return this.request(reqData, defaultResProcess);
    },

    register: function(reqData) {
      var reqData = this.getRequestData('/user/register', reqData);

      return this.request(reqData, defaultResProcess);
    },

    userExist: function(reqData) {
      var reqData = this.getRequestData('/user/user_exist', reqData);

      return this.request(reqData, defaultResProcess);
    },

    likePost: function(reqData) {
      var reqData = this.getRequestData('/post/like', reqData);

      return this.request(reqData, defaultResProcess);
    },

    unlikePost: function(reqData) {
      var reqData = this.getRequestData('/post/unlike', reqData);

      return this.request(reqData, defaultResProcess);
    }

    

  });
}]);