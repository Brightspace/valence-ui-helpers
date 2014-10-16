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
		loggers: [{
			type: 'file',
			filename: 'log.txt'
		}],
		plugins : [
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-directives-preprocessor',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-script-launcher'
		],
		preprocessors: {
				'node_modules/vui-helpers/jasmine/matchers.js' : ['directives']
			},
		reporters: ['progress','junit','coverage']
	} );
};
