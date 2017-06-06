var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

function getModules(args, iterator) {
  return (args.modules ? args.modules.split(/\s+/) : ['**']).map(iterator);
}

gulp.task('env:all', function() {
  var gutil = plugins.util;
  var modules = getModules(gutil.env, function(value) {
    return value;
  });

  plugins.env({
    vars: {
      PORT: 8889,
      NODE_ENV: 'development',
      ENTRY_MODULES: JSON.stringify(modules)
    }
  });
});

gulp.task('start:DevelopmentServer', function() {
  plugins.nodemon({
    script: 'app.js',
    watch: ['app.js', 'server'],
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('server', function(callback) {
  runSequence(
    'env:all',
    'start:DevelopmentServer'
  );
});