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
			},

			extractBrowser: function( userAgent, expected ) {

				var result;

				if( userAgent.indexOf("Chrome") > -1 ) {
					result = expected.Chrome;
				} else if( userAgent.indexOf("Safari") > -1 ) {
					result = expected.Safari;
				} else if( userAgent.indexOf("Opera") > -1 ) {
					result = expected.Opera;
				} else if( userAgent.indexOf("Firefox") > -1 ) {
					result = expected.Firefox;
				} else if( userAgent.indexOf("MSIE") > -1 ) {
					result = expected.MSIE;
				}

				if( result === undefined ) {
					result = expected.default;
				}

				return result;

			}

		},

		matchers: {

			toHaveAfterElementContent: function() {
				return d2l.jasmine._private.createCompareStyle( 'content', ':after' );
			},

			toHaveAfterElementBase64Image: function() {
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

			toHaveAfterElementDisplay: function() {
				return d2l.jasmine._private.createCompareStyle( 'display', ':after' );
			},

			toHaveBackgroundColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'background-color' );
			},

			toHaveBeforeElementContent: function() {
				return d2l.jasmine._private.createCompareStyle( 'content', ':before' );
			},

			toHaveBeforeElementBase64Image: function() {
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

			toHaveBeforeElementDisplay: function() {
				return d2l.jasmine._private.createCompareStyle( 'display', ':before' );
			},

			toHaveBottomMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-bottom' );
			},

			toHaveColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'color' );
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

			toHaveListStyleImage: function() {
				return d2l.jasmine._private.createCompareStyle( 'list-style-image' );
			},

			toHaveListStylePosition: function() {
				return d2l.jasmine._private.createCompareStyle( 'list-style-position' );
			},

			toHaveListStyleType: function() {
				return d2l.jasmine._private.createCompareStyle( 'list-style-type' );
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
						
						var expected = d2l.jasmine._private.extractBrowser( 
								navigator.userAgent,
								browserExpected
							);

						return {
								pass: actual == expected,
								message: 'Expected ' + actual + ' to be ' + expected
							};

					}
				};
			},

			toBeOnAgent: function() {
				return {
					compare: function( actual, agentExpected ) {
						var userAgent = navigator.userAgent;

						var expected = d2l.jasmine._private.extractBrowser( 
								userAgent,
								agentExpected
							);

						if( userAgent.indexOf("Windows") > -1 ) {
							expected = expected.Windows;
						} else if( userAgent.indexOf("Linux") > -1 ) {
							expected = expected.Linux;
						}

						if( expected === undefined ) {
							expected = expected.default;
						}

						return {
							pass: actual === expected,
							message: 'Expected ' + actual + ' to be ' + expected
						};

					}
				};
			}

		}

	}

};