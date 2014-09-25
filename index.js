'use strict';

var vfs = require( 'vinyl-fs' );

var prefixOpts = { 
	browsers: ['last 4 Chrome versions', 'last 4 Firefox versions', 'Firefox ESR', 'IE >= 9', 'Safari >= 5.1', 'last 4 Opera versions' ] 
};

var clean = function() {

	var rm = require( 'rimraf' ),
		through2 = require( 'through2' );

	var paths = [];

	var inspectIt = function( file, enc, done ) {
		paths.push( file.path );
		done();
	};

	var washIt = function( done ) {
		for ( var i=0; i<paths.length; i++ ) {
			rm.sync( paths[i] );
		}
		done();
	};

	return through2.obj( inspectIt, washIt );

};

var makeCss = function( source, target, opts ) {

	var csslint = require( 'gulp-csslint' ),
		less = require( 'gulp-less' ),
		autoprefixer = require( 'gulp-autoprefixer' );

	return vfs.src( source )
		.pipe( less() )
		.pipe( autoprefixer( prefixOpts ) )
		.pipe( csslint( ( opts && opts.lintOpts ) ? opts.lintOpts : '' ) )
		.pipe( csslint.reporter() )
		.pipe( vfs.dest( target ) );

};

var makeLess = function( source, target ) {

	return vfs.src( source )
		.pipe( vfs.dest( target ) );

};

var test = function( config, js, css ) {

	var karma = require( 'gulp-karma' );

	return vfs.src( 'empty-stream' )
		.pipe( karma( { 
			configFile: config, 
			files: [ 
				'node_modules/vui-helpers/jasmine/matchers.js',
				js, 
				{ pattern: css, included: true }
			],
			action: 'run' 
		} ) );

};

module.exports.clean = clean;

module.exports.makeCss = makeCss;

module.exports.makeLess = makeLess;

module.exports.test = test;