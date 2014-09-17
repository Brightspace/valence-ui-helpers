var vfs = require( 'vinyl-fs' );

var clean = function( target ) {

	var clean = require( 'gulp-rimraf' );

	return vfs.src( target )
		.pipe( clean() );

};

var makeCss = function( source, target, opts ) {

	var csslint = require( 'gulp-csslint' ),
		less = require( 'gulp-less' );

	return vfs.src( source )
		.pipe( less() )
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