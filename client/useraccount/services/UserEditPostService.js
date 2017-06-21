app.service('UserEditPostService', ['BlogWebApi', function(BlogWebApi) {

  function defaultResProcess (result) {
    return result;
  }

  return BlogWebApi.extend({

    getSinglePost: function(postId) {
      var reqData = this.getRequestData('/post/post/' + postId, {
        method: 'GET'
      });

      return this.request(reqData, defaultResProcess);
    },

    updatePost: function(reqData) {
      var reqData = this.getRequestData('/post/update_post', reqData);

      return this.request(reqData, defaultResProcess);
    },

    deletePost: function(reqData) {
      var reqData = this.getRequestData('/post/delete_post', reqData);

      return this.request(reqData, defaultResProcess);
    }

  });

}]);