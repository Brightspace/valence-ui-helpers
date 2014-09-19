var d2l = {

	jasmine: {

		matchers: {

			toHaveCssSelector: function() {
				return {
					compare: function( doc, expected ) {

						if ( !doc ) {
							return { pass: false, message: 'The actual document is not defined.' };
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
			}

		}

	}

};