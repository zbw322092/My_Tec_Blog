app.service('UserAccountService', ['BlogWebApi', function(BlogWebApi) {

  function defaultResProcess (result) {
    return result;
  }

  return BlogWebApi.extend({

    getUserData: function(reqData) {
      var reqData = this.getRequestData('/user/basic_info', reqData);

      return this.request(reqData, defaultResProcess);
    },

    logout: function(reqData) {
      var reqData = this.getRequestData('/user/logout', {
        method: 'GET'
      });

      return this.request(reqData, defaultResProcess);
    },

    getPageData: function(reqData) {
      var reqData = this.getRequestData('/user/basic_info', reqData);

      return this.request(reqData, defaultResProcess);
    }

  });

}]);