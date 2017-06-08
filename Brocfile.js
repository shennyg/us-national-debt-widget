"use strict";

// Babel transpiler
var babel = require('broccoli-babel-transpiler');
// filter trees (subsets of files)
var funnel = require('broccoli-funnel');
// concatenate trees
var concat = require('broccoli-concat');
// merge trees
var mergeTrees = require('broccoli-merge-trees');
// uglify js
var uglifyJs = require('broccoli-uglify-js');

// es6 lint
var eslint = require('broccoli-lint-eslint');

// path to ES6 js
var appJs = 'src';

var lintOptions = {
};
// lint files
appJs = eslint(appJs, lintOptions);

// Transpile the source files
appJs = babel(appJs, { browserPolyfill: true });

// Concatenate all the JS files into a single file
appJs = concat(appJs, {
  // we specify a concatenation order
  inputFiles: ['**/*.js'],
  outputFile: '/debtClock.min.js'
});

// compress and mangle js
appJs = uglifyJs(appJs, {
  compress: true,
  mangle: true
});

// Grab the index file
var index = funnel('src', {files: ['index.html']});

// Grab all our trees and
// export them as a single and final tree
module.exports = mergeTrees([index, appJs]);
