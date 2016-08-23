

module.exports = function(config) {
  var webpackTest = require('./webpack.test.js');
  config.set({
    frameworks: ['jasmine'],
    browsers: [
      'Chrome'
    ],
    // ... normal karma configuration
    files: [
      // only specify one entry point
      // and require all tests in there
      './src/spec-bundle.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      './src/spec-bundle.js': ['webpack', 'sourcemap']
    },

    webpack: webpackTest,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    // plugins: [
    //   'karma-webpack',
    //   'karma-chrome-launcher',
    //   'karma-sourcemap-loader',
    //   'karma-jasmine'
    // ]
  });
};