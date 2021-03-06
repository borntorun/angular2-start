module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul')
    ],
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      { pattern: 'dist/vendor/es6-shim/es6-shim.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },

      { pattern: 'config/karma-test-shim.js', included: true, watched: true },

      // Distribution folder.
      { pattern: 'dist/**/*', included: false, watched: true },

      { pattern: 'dist/!(vendor)/**/*.js.map', included: false, watched: false }
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'dist/vendor/**/*.spec.js'
    ],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'dist/!(vendor)/**/!(*spec).js': ['coverage']
    },
    reporters: ['spec', 'coverage', 'karma-remap-istanbul'],
    coverageReporter: {
      dir : 'coverage',
      reporters: [
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
      ]
    },
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        lcovonly: 'coverage/lcov.info',
        html: 'coverage/html',
        text: 'coverage/coverage.txt'
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'PhantomJS'
      // 'Chrome'
    ],
    singleRun: true
  });
};
