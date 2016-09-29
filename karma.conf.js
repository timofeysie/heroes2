// #docregion
module.exports = function(config) {

  var appBase    = 'app/';       // transpiled app JS and map files
  var appSrcBase = 'app/';       // app source TS files
  var appAssets  = '/base/app/'; // component assets fetched by Angular's compiler

  var testBase    = 'app/';       // transpiled test JS and map files
  var testSrcBase = 'app/';       // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
      require('karma-ng-html2js-preprocessor')
    ],

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      {pattern: appBase + '**/*.js', included: false, watched: true},
      {pattern: testBase + '**/*.js', included: false, watched: true},


      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: appBase + '**/*.html', included: false, watched: true},
      {pattern: appBase + '**/*.css', included: false, watched: true},

      // Paths for debugging with source maps in dev tools
      {pattern: appSrcBase + '**/*.ts', included: false, watched: false},
      {pattern: appBase + '**/*.js.map', included: false, watched: false},
      {pattern: testSrcBase + '**/*.ts', included: false, watched: false},
      {pattern: testBase + '**/*.js.map', included: false, watched: false}
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": appAssets
    },

    exclude: [],
    // to compile the template urls.
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/',
      stripSuffix: '.ext',
      // prepend this to the
      prependPrefix: 'served/',

      // or define a custom transform function
      // - cacheId returned is used to load template
      //   module(cacheId) will return template at filepath
      cacheIdFromPath: function(filepath) {
        // example strips 'public/' from anywhere in the path
        // module(app/templates/template.html) => app/public/templates/template.html
        var cacheId = filepath.replace('public/', '');
        return cacheId;
      },

      // - setting this option will create only a single module that contains templates
      //   from all the files, so you can load them all with module('foo')
      // - you may provide a function(htmlPath, originalPath) instead of a string
      //   if you'd like to generate modules dynamically
      //   htmlPath is a originalPath stripped and/or prepended
      //   with all provided suffixes and prefixes
      moduleName: 'foo'
    },

    reporters: ['progress', 'html'],

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: '_test-output/tests.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
