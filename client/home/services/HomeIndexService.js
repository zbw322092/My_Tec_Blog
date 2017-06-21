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
    }

  });
}]);