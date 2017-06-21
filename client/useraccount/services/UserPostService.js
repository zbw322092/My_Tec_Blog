app.service('UserPostService', ['BlogWebApi', function(BlogWebApi) {

  function defaultResProcess (result) {
    return result;
  }

  return BlogWebApi.extend({

    getSinglePost: function(postId) {
      var reqData = this.getRequestData('/post/post/' + postId, {
        method: 'GET'
      });

      return this.request(reqData, defaultResProcess);
    }

  });

}]);