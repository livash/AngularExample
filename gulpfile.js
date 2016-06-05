var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');

gulp.task('default', ['watch'], function() {
  return gutil.log("Gulp is running...");
});

// configure the jshint task
gulp.task('lint', function() {
  return gulp.src('./app/js/**/*.js')
      //.pipe(jshint())
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch
gulp.task('watch', function() {
  gulp.watch('./app/js/**/*.js', ['jshint']);
})