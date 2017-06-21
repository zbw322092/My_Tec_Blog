app.factory('BlogWebApi', [
  'WebApiBase', 
  'enviormentBaseConfig', 
  function(
    WebApiBase, 
    enviormentBaseConfig
  ) {

  return WebApiBase.extend({
    // override origin method in WebApiBase according to bussiness logic need
    getBizRequestUrl: function() {
      return encodeURI(enviormentBaseConfig.get('blogMainApi'));
    }
  });


}]);