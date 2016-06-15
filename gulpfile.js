var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint')
    concat = require('gulp-concat-util')
    Server = require('karma').Server,
    merge = require('merge-stream');

gulp.task('default', ['watch'], function() {
  return gutil.log("Gulp is running...");
});

// configure the jshint task
gulp.task('lint', function() {
  var sourceFiles = gulp.src('./app/js/**/*.js')
      //.pipe(jshint())
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));

  var testFiles = gulp.src('./app/test/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));

  return merge(sourceFiles, testFiles);
});

// configure which files to watch
gulp.task('watch', function() {
  gulp.watch('./app/js/**/*.js', ['jshint']);
});

gulp.task('build-js', function() {
  return gulp.src('./app/js/{,*/}*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/assets/js'));
});

// run tests once then exit
gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
