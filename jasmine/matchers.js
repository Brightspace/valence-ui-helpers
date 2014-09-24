var d2l = {

	jasmine: {

		_private: {

			createCompareBoxValues: function( property ) {

				return {
					compare: function( actual, expected ) {

						var topResult = d2l.jasmine._private.createCompareStyle( property + '-top' ).compare( actual, expected );
						if ( !topResult.pass ) {
							return topResult;
						}

						var rightResult = d2l.jasmine._private.createCompareStyle( property + '-right' ).compare( actual, expected );
						if ( !rightResult.pass ) {
							return rightResult;
						}

						var bottomResult = d2l.jasmine._private.createCompareStyle( property + '-bottom' ).compare( actual, expected );
						if ( !bottomResult.pass ) {
							return bottomResult;
						}

						var leftResult = d2l.jasmine._private.createCompareStyle( property + '-left' ).compare( actual, expected );
						if ( !leftResult.pass ) {
							return leftResult;
						}

						return { pass: true };

					}
				};

			},

			createCompareStyle: function( property, pseudoElement, compareType ) {

				if ( pseudoElement === undefined ) {
					pseudoElement = null;
				}

				if ( compareType === undefined ) {
					compareType = 'equals';
				}

				return {
					compare: function( node, expected ) {

						if ( !node ) {
							return { pass: false, message: 'The node value is not defined.' };
						}
						if ( !expected ) {
							return { pass: false, message: 'The expected value is not defined.' };
						}

						var val = window.getComputedStyle( node, pseudoElement ).getPropertyValue( property );
						if ( compareType === 'equals' && val === expected ) {
							return { pass: true };
						} else if ( compareType === 'startsWith' && val.indexOf( expected ) !== -1 ) {
							return { pass: true };
						} else {
							return { pass: false, message: 'Expected ' + property + ' to be ' + expected + ' but found ' + val + '.' };
						}

					}
				};
			}
		},

		matchers: {

			toHaveBase64ImageBefore: function() {
				return {
					compare: function( actual ) {
						var compareObj = d2l.jasmine._private.createCompareStyle( 
							'content', 
							':before', 
							'startsWith' 
						);
						return compareObj.compare( actual, 'url(data:image/png;base64,' );
					}
				};
			},

			toHaveBase64ImageAfter: function() {
				return {
					compare: function( actual ) {
						var compareObj = d2l.jasmine._private.createCompareStyle( 
							'content', 
							':after', 
							'startsWith' 
						);
						return compareObj.compare( actual, 'url(data:image/png;base64,' );
					}
				};
			},

			toHaveBottomMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-bottom' );
			},

			toHaveContentAfter: function() {
				return d2l.jasmine._private.createCompareStyle( 'content', ':after' );
			},

			toHaveContentBefore: function() {
				return d2l.jasmine._private.createCompareStyle( 'content', ':before' );
			},

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

			toHaveDisplay: function() {
				return d2l.jasmine._private.createCompareStyle( 'display' );
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

			toHaveHeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'height' );
			},

			toHaveLeftMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-left' );
			},

			toHaveLineHeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'line-height' );
			},

			toHaveMargin: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'margin' );
			},

			toHavePadding: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'padding' );
			},

			toHaveRightMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-right' );
			},

			toHaveTextDecoration: function() {
				return d2l.jasmine._private.createCompareStyle( 'text-decoration' );
			},

			toHaveTopMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-top' );
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