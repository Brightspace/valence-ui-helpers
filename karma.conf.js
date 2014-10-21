module.exports = function( config ) {
	'use strict';

	config.set( {
		autoWatch: false,
		basePath: '../../',
		browsers: ['PhantomJS'],
		coverageReporter: {
			reporters: [
				{ type: 'html', dir: 'test/output/coverage/' },
				{ type: 'cobertura', dir: 'test/output/coverage/' }
			]
		},
		exclude: [],
		frameworks: ['jasmine'],
		junitReporter : {
			outputFile: 'test/output/unit.xml',
			suite: 'unit'
		},
		plugins : [
			require('./json-dumper.js'),
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-directives-preprocessor',
			'karma-jasmine',
			'karma-json-fixtures-preprocessor',
			'karma-junit-reporter',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-script-launcher'
		],
		reporters: ['progress','junit','coverage']
	} );
};
