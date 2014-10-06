var d2l = {

	jasmine: {

		_private: {

			createCompareBorderValues: function( property ) {

				return {
					compare: function( actual, expected ) {

						var topResult = d2l.jasmine._private.createCompareStyle( 'border-top-' + property ).compare( actual, expected );
						if ( !topResult.pass ) {
							return topResult;
						}

						var rightResult = d2l.jasmine._private.createCompareStyle( 'border-right-' + property ).compare( actual, expected );
						if ( !rightResult.pass ) {
							return rightResult;
						}

						var bottomResult = d2l.jasmine._private.createCompareStyle( 'border-bottom-' + property ).compare( actual, expected );
						if ( !bottomResult.pass ) {
							return bottomResult;
						}

						var leftResult = d2l.jasmine._private.createCompareStyle( 'border-left-' + property ).compare( actual, expected );
						if ( !leftResult.pass ) {
							return leftResult;
						}

						return { pass: true };

					}
				};

			},

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

			toHaveBorderColor: function() {
				return d2l.jasmine._private.createCompareBorderValues( 'color' );
			},

			toHaveBorderRadius: function() {
				return {
					compare: function( actual, expected ) {

						var topRightResult = d2l.jasmine._private.createCompareStyle( 'border-top-right-radius' ).compare( actual, expected );
						if ( !topRightResult.pass ) {
							return topRightResult;
						}

						var bottomRightResult = d2l.jasmine._private.createCompareStyle( 'border-bottom-right-radius' ).compare( actual, expected );
						if ( !bottomRightResult.pass ) {
							return bottomRightResult;
						}

						var bottomLeftResult = d2l.jasmine._private.createCompareStyle( 'border-bottom-left-radius' ).compare( actual, expected );
						if ( !bottomLeftResult.pass ) {
							return bottomLeftResult;
						}

						var topLeftResult = d2l.jasmine._private.createCompareStyle( 'border-top-left-radius' ).compare( actual, expected );
						if ( !topLeftResult.pass ) {
							return topLeftResult;
						}

						return { pass: true };

					}
				};
			},

			toHaveBottomBorderColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-bottom-color' );
			},

			toHaveBottomLeftBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-bottom-left-radius' );
			},

			toHaveBottomMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-bottom' );
			},

			toHaveBottomRightBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-bottom-right-radius' );
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

			toHaveLeftBorderColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-left-color' );
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

			toHaveRightBorderColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-right-color' );
			},

			toHaveRightMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-right' );
			},

			toHaveTextDecoration: function() {
				return d2l.jasmine._private.createCompareStyle( 'text-decoration' );
			},

			toHaveTopBorderColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-top-color' );
			},

			toHaveTopLeftBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-top-left-radius' );
			},

			toHaveTopMargin: function() {
				return d2l.jasmine._private.createCompareStyle( 'margin-top' );
			},

			toHaveTopRightBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-top-right-radius' );
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

						var osExpected;
						if( userAgent.indexOf("Windows") > -1 ) {
							osExpected = expected.Windows;
						} else if( userAgent.indexOf("Linux") > -1 ) {
							osExpected = expected.Linux;
						}

						if( osExpected === undefined ) {
							osExpected = expected.default;
						}

						return {
							pass: actual === osExpected,
							message: 'Expected ' + actual + ' to be ' + osExpected
						};

					}
				};
			}

		}

	}

};