#VUI Helpers [![Build Status](https://travis-ci.org/Desire2Learn-Valence/valence-ui-helpers.svg?branch=master)](https://travis-ci.org/Desire2Learn-Valence/valence-ui-helpers)

This project contains GULP helper scripts for building VUI components.

##Usage

Install as a development dependency:

```shell
npm install --save-dev vui-helpers
```

Then add it to your `gulpfile.js`:

```javascript
var vuiHelpers = require('vui-helpers');
```

##API

###clean

Deletes directories or files.

```javascript
gulp.task( 'clean', function() {
  return vuiHelpers.clean( [ 'dir1', 'dir2' ] );
} );
```

The only parameter is an array of directories/files to delete.

###makeCss

Performs a [lint](https://www.npmjs.org/package/gulp-csslint) of the CSS files
to validate syntax and CSS best practices, does a
[LESS compilation](https://www.npmjs.org/package/gulp-less) of any LESS files,
and finally [auto-prefixes](https://www.npmjs.org/package/autoprefixer) the CSS
to add vendor-specific prefixes based on our currently supported browsers.

```javascript
var vuiHelpers = require('vui-helpers');
gulp.task( 'css', function() {
  return vuiHelpers.makeCss( 'source/*', 'dist' );
} );
```

The first parameter is a glob which defines your CSS input files, followed by
an output directory.

###makeLess

Copies LESS files from source to target.

```javascript
var vuiHelpers = require('vui-helpers');
gulp.task( 'less', function() {
  return vui.makeLess( 'src/**/*.less', 'dist/' );
} );
```

The first parameter is a glob which defines the LESS input files, followed by
an output location.

###test

Helper for testing with [Karma](https://www.npmjs.org/package/gulp-karma).

```javascript
gulp.task( 'test', function () {
  return vui.test( {
    files: [
      'my-component.js',
      'my-component.css',
      'test/unit/**/*Spec.js'
    ],
    preprocessors: {
      'my-component.js': ['coverage']
    }
  } );
} );
```

The test helper configures the Karma test runner to use PhantomJS, coverage reporters, and Jasmine. It also includes custom Jasmine matchers that may be used in your specs. A config object must be provided to the test helper to specify the files/patterns for the test. Other Karma config properties may be provided, for instance to include files for coverage via the preprocessor property.

## Contributiing

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) rules and contributions should make use of them. See the valence-ui [Code Style wiki page](https://github.com/Desire2Learn-Valence/valence-ui-helpers/wiki/Code-Style) for details.
