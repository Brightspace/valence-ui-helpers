var d2l = {

	jasmine: {

		matchers: {

			toHaveCssSelector: function() {
				return {
					compare: function( actual, expected ) {

					if ( !actual ) {
						return { pass: false, message: 'The actual value is not defined.' };
					}

					if ( !expected ) {
						return { pass: false, message: 'The expected value is not defined.' };
					}

					var pattern = new RegExp( expected );

					for ( var i=0; i<document.styleSheets.length; ++i ) {
						for ( var j=0; j<document.styleSheets[i].cssRules.length; ++j ) {
							var selectors = document.styleSheets[i].cssRules[j].selectorText.split( ',' );
							for ( var k=0; k<selectors.length; k++ ) {
								if ( pattern.test( selectors[k] ) ) {
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