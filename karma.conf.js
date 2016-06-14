// Karma configuration
// Generated on Sun Jun 12 2016 14:41:12 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: './app',
    frameworks: ['jasmine', 'jasmine-sinon'],
    files: [
      'lib/angular/angular.js',
      'lib/angular/angular-*.js',
      'js/**/*.js',
      'test/**/*.js'
    ],
    browsers: ['Chrome'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
}
