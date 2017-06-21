app.factory('enviormentBaseConfig', ['EnvironmentBase', function(EnvironmentBase) {

    var EnviormentBaseConfig =  EnvironmentBase.extend({
      blogMainApi: {
        me: 'http://localhost:8889/api',
        inteweb: 'http://localhost:8889/api',
      }
    });

    return new EnviormentBaseConfig();
}]);