app.service('HomeService', ['WebApiBase', function(WebApiBase) {
  
  function defaultResProcess (result) {
    return result;
  }

  return WebApiBase.extend({
    
    getPosts: function() {
      var reqData = this.getRequestData({
        method: 'GET',
        url: '/api/post/posts'
      });

      return this.request(reqData, defaultResProcess);
    }

  });
}]);