var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sometask', function() {
  console.log('Gulp task working');
});

gulp.task('env:all', function() {
  plugins.env({
    vars: {
      PORT: 8889,
      NODE_ENV: 'development'
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