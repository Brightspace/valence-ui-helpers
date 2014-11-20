'use strict';

var vfs = require( 'vinyl-fs' );
var fs = require( 'fs' );

var prefixOpts = {
	browsers: [
		'last 4 Chrome versions',
		'last 4 Firefox versions',
		'Firefox ESR', 'IE >= 9',
		'Safari >= 5.1',
		'last 4 Opera versions'
	]
};

var makeCss = function( source, target, opts ) {

	var csslint = require( 'gulp-csslint' ),
		less = require( 'gulp-less' ),
		autoprefixer = require( 'gulp-autoprefixer' ),
		rename = require('gulp-rename');

	var paths = ( opts && opts.paths ) ? opts.paths : [ './' ];

	return vfs.src( source )
		.pipe( less( { paths: paths } ) )
		.pipe( autoprefixer( prefixOpts ) )
		.pipe( csslint( ( opts && opts.lintOpts ) ? opts.lintOpts : '' ) )
		.pipe( csslint.reporter() )
		.pipe( rename( target ) )
		.pipe( vfs.dest( './' ) );

};

var makeLess = function( source, target ) {

	return vfs.src( source )
		.pipe( vfs.dest( target ) );

};

var test = function( config, isRecordingResults ) {

	if ( !config ) {
		console.log( 'No config specified.' );
		return;
	}

	var karmaConfig = {
		configFile: 'node_modules/vui-helpers/karma.conf.js',
		files: [
			'node_modules/vui-helpers/node_modules/vui-jasmine-dom-matchers/matchers.js'
		],
		action: 'run'
	};

	for( var key in config ) {
		if ( key === 'files' ) {

			// merge files
			for( var i=0; i<config.files.length; i++ ) {
				var file = config.files[i];
				if ( typeof file === 'string' ) {
					var ext = file.substr( file.lastIndexOf( '.' ) );
					if ( ext && ext.toLowerCase() === '.css' ) {

						// karma requires that css files be explicitly included
						karmaConfig.files.push( { pattern: file, included: true } );

					} else {
						karmaConfig.files.push( file );
					}
				} else if ( typeof file === 'object' ) {
					karmaConfig.files.push( file );
				}
			}

		} else if ( key == 'preprocessors' ) {

			if ( karmaConfig.preprocessors === undefined ) {
				karmaConfig.preprocessors = {};
			}

			for( var fKey in config.preprocessors ) {
				karmaConfig.preprocessors[fKey] = config.preprocessors[fKey];
			}

		} else {

			// copy forward other configs
			karmaConfig[ key ] = config[ key ];

		}
	}

	var karma = require( 'gulp-karma' );

	return vfs.src( 'empty-stream' )
		.pipe( karma( karmaConfig ) );

};

module.exports.makeCss = makeCss;

module.exports.makeLess = makeLess;

module.exports.test = test;
