var d2l = {

	jasmine: {

		_private: {

			createCompareStyle: function( property ) {
				return {
					compare: function( node, expected ) {

						if ( !node ) {
							return { pass: false, message: 'The node value is not defined.' };
						}
						if ( !expected ) {
							return { pass: false, message: 'The expected value is not defined.' };
						}

						var val = window.getComputedStyle( node, null ).getPropertyValue( property );
						if ( val === expected ) {
							return { pass: true };
						} else {
							return { pass: false, message: 'Expected to find ' + expected + ' but found ' + val + '.' };
						}

					}
				};
			}
		},

		matchers: {

			toHaveCssSelector: function() {
				return {
					compare: function( doc, expected ) {

						if ( !doc ) {
							return { pass: false, message: 'The document value is not defined.' };
						}
						if ( !expected ) {
							return { pass: false, message: 'The expected value is not defined.' };
						}

						for ( var i=0; i<doc.styleSheets.length; ++i ) {
							for ( var j=0; j<doc.styleSheets[i].cssRules.length; ++j ) {
								var selectors = doc.styleSheets[i].cssRules[j].selectorText.split( ',' );
								for ( var k=0; k<selectors.length; k++ ) {
									if ( selectors[k].replace( /(^\s+|\s+$)/g,'' ) === expected ) {
										return { pass: true };
									}
								}
							}
						}

						return { pass: false, message: 'Expected to find ' + expected + ' css selector but did not.' };

					}
				};
			},

			toHaveColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'color' );
			},

			toHaveFontFamily: function() {
				return d2l.jasmine._private.createCompareStyle( 'font-family' );
			},

			toHaveFontSize: function() {
				return d2l.jasmine._private.createCompareStyle( 'font-size' );
			},

			toHaveFontWeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'font-weight' );
			},

			toHaveLineHeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'line-height' );
			},

			toHaveTextDecoration: function() {
				return d2l.jasmine._private.createCompareStyle( 'text-decoration' );
			},

			toHaveTopMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-top' );
			},

			toHaveBottomMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-bottom' );
			},

			toHaveLeftMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-left' );
			},

			toHaveRightMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-right' );
			},

			toBeOnBrowser: function( ) {
				return {
					compare: function( actual, browserExpected ) {
						var userAgent = navigator.userAgent;
						var expected;

						if(userAgent.indexOf("Chrome") > -1) {
						    expected = browserExpected.Chrome;
						} else if (userAgent.indexOf("Safari") > -1) {
						    expected = browserExpected.Safari;
						} else if (userAgent.indexOf("Opera") > -1) {
						    expected = browserExpected.Opera;
						} else if (userAgent.indexOf("Firefox") > -1) {
						    expected = browserExpected.Firefox;
						} else if (userAgent.indexOf("MSIE") > -1) {
						    expected = browserExpected.MSIE;
						}

						return { pass: actual == (expected || browserExpected.default), message: 'Expected ' + actual + ' to be ' + (expected || browserExpected.default) }
					}
				};
			}

		}

	}

};