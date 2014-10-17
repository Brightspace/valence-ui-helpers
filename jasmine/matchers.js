var d2l = {

	jasmine: {

		_private: {

			createCompareBoxValues: function( propertyPrefix, propertySuffix ) {
				return {
					compare: function( actual, expected ) {
						propertyPrefix = propertyPrefix ? propertyPrefix + "-" : "";
						propertySuffix = propertySuffix ? "-" + propertySuffix : "";

						var topResult = d2l.jasmine._private.createCompareStyle( propertyPrefix + 'top' + propertySuffix ).compare( actual, expected );
						if ( !topResult.pass ) {
							return topResult;
						}

						var rightResult = d2l.jasmine._private.createCompareStyle( propertyPrefix + 'right' + propertySuffix ).compare( actual, expected );
						if ( !rightResult.pass ) {
							return rightResult;
						}

						var bottomResult = d2l.jasmine._private.createCompareStyle( propertyPrefix + 'bottom' + propertySuffix ).compare( actual, expected );
						if ( !bottomResult.pass ) {
							return bottomResult;
						}

						var leftResult = d2l.jasmine._private.createCompareStyle( propertyPrefix + 'left' + propertySuffix ).compare( actual, expected );
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

		differs : {

			diffDefaultStyle: function( classStyledElement ) {
				var defaultElement = classStyledElement.cloneNode(true);
				defaultElement.className="";
				classStyledElement.parentNode.appendChild( defaultElement );

		    	var actualComputed = window.getComputedStyle( classStyledElement );
				var defaultComputed = window.getComputedStyle( defaultElement );

		        if (!actualComputed || !defaultComputed) {
					classStyledElement.parentNode.removeChild( defaultElement );
		            return null;
		        }

		        var diff = {};

		        for (var i = 0; i < actualComputed.length; i++) {
		        	var aName = actualComputed.item(i);

		            var actualValue = actualComputed.getPropertyValue(aName);
		            var defaultValue = defaultComputed.getPropertyValue(aName);

		            if ( actualValue === defaultValue ) {
		                continue;
		            }

		            diff[aName] = actualValue;
		        }

				classStyledElement.parentNode.removeChild( defaultElement );

				return diff;
			},

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

			toHaveBackgroundPosition: function() {
				return d2l.jasmine._private.createCompareStyle( 'background-position' );
			},

			toHaveBackgroundRepeat: function() {
				return d2l.jasmine._private.createCompareStyle( 'background-repeat' );
			},

			toHaveBase64BackgroundImage: function() {
				return {
					compare: function( actual ) {
						var compareObj = d2l.jasmine._private.createCompareStyle( 
							'background-image', 
							null, 
							'startsWith' 
						);
						return compareObj.compare( actual, 'url(data:image/png;base64,' );
					}
				};
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

			toHaveBorder: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'border' );
			},

			toHaveBorderStyle: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'border', 'style' );
			},

			toHaveBorderWidth: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'border', 'width' );
			},

			toHaveBorderColor: function() {
				return d2l.jasmine._private.createCompareBoxValues( 'border', 'color' );
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

			toHaveBottomPadding: function() {
				return d2l.jasmine._private.createCompareStyle( 'padding-bottom' );
			},

			toHaveBottomRightBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-bottom-right-radius' );
			},

			toHaveBoxShadow: function() {
				return d2l.jasmine._private.createCompareStyle( 'box-shadow' );
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
								var selectorText = doc.styleSheets[i].cssRules[j].selectorText;
								if ( selectorText !== undefined ) {
									var selectors = selectorText.split( ',' );
									for ( var k=0; k<selectors.length; k++ ) {
										if ( selectors[k].replace( /(^\s+|\s+$)/g,'' ) === expected ) {
											return { pass: true };
										}
									}
								}
							}
						}

						return { pass: false, message: 'Expected to find ' + expected + ' css selector but did not.' };

					}
				};
			},

			toHaveCursor: function() {
				return d2l.jasmine._private.createCompareStyle( 'cursor' );
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

			toHaveFontStyle: function() {
				return d2l.jasmine._private.createCompareStyle( 'font-style' );
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

			toHaveLeftPadding: function() {
				return d2l.jasmine._private.createCompareStyle( 'padding-left' );
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

			toHaveMaxHeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'max-height' );
			},

			toHaveMaxWidth: function() {
				return d2l.jasmine._private.createCompareStyle( 'max-width' );
			},

			toHaveMinHeight: function() {
				return d2l.jasmine._private.createCompareStyle( 'min-height' );
			},

			toHaveMinWidth: function() {
				return d2l.jasmine._private.createCompareStyle( 'min-width' );
			},

			toHaveOutlineColor: function() {
				return d2l.jasmine._private.createCompareStyle( 'outline-color' );
			},

			toHaveOutlineStyle: function() {
				return d2l.jasmine._private.createCompareStyle( 'outline-style' );
			},

			toHaveOutlineWidth: function() {
				return d2l.jasmine._private.createCompareStyle( 'outline-width' );
			},

			toHaveOverflow: function() {
				return d2l.jasmine._private.createCompareStyle( 'overflow' );
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

			toHaveTextAlign: function() {
				return d2l.jasmine._private.createCompareStyle( 'text-align' );
			},

			toHaveRightPadding: function() {
				return d2l.jasmine._private.createCompareStyle( 'padding-right' );
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

			toHaveTopPadding: function() {
				return d2l.jasmine._private.createCompareStyle( 'padding-top' );
			},

			toHaveTopRightBorderRadius: function() {
				return d2l.jasmine._private.createCompareStyle( 'border-top-right-radius' );
			},

			toHaveWidth: function() {
				return d2l.jasmine._private.createCompareStyle( 'width' );
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
			},

			toMatchER: function(util, customEqualityTesters) {

				return {
					compare: function ( actual, expected ) {
						var er = __ER__;
						var path = expected.split(".");
					    var arRoot = {};
					    var ar = arRoot;
					   	for( var i = 0; i < path.length; i++ ) {
					       	er = er[path[i]] || {};
							arRoot[path[i]] = i != path.length - 1 ? {} : actual;
							arRoot = arRoot[path[i]];
					    };

			       		// @if ER_GEN
						dump(JSON.stringify(ar));
						// @endif

			       		var retStr = "";
				        for( var p in actual ) {
							if(actual[p] === er[p]) {
								continue;
							}
			       			retStr = retStr + "Expected " + p + " to be " + er[p] + " but got " + actual[p] + " \n";
			       		}

						return {
							pass: retStr == "",
							message: retStr
						};
					}
				};
			}			

		}

	}

};