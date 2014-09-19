var d2l = {

	jasmine: {

		_private: {

			compareStyle: function( node, property, expected ) {

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

			toHaveFontWeight: function() {
				return {
					compare: function( node, expected ) {
						return d2l.jasmine._private.compareStyle(
								node, 'font-weight', expected
							);
					}
				};
			},

			toHaveRgbColor: function() {
				return {
					compare: function( node, expected ) {
						return d2l.jasmine._private.compareStyle(
								node, 'color', expected
							);
					}
				};
			},

			toHaveTextDecoration: function() {
				return {
					compare: function( node, expected ) {
						return d2l.jasmine._private.compareStyle(
								node, 'text-decoration', expected
							);
					}
				};
			}

		}

	}

};