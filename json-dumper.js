var fs = require('fs');

var mergeObjects = function ( aObj, bObj ) {
	var mObj = Object.create(bObj);

    for (var key in aObj) {
		if(mObj.hasOwnProperty(key)) {
			if ( aObj[key]!=null && aObj[key].constructor==Object ) {
				mObj[key] = mObj(aObj[key], mObj[key]);
			}
		} else {
			mObj[key] = aObj[key];
		}
	}
	return mObj;
}

var JSONDumper = function(baseReporterDecorator) {
	baseReporterDecorator(this);

	this.onBrowserLog = function(browser, log, type) {
		if( type != "dump" ) {
			return;
		}

		var logObj = JSON.parse(log.substring(1, log.length-1));
		var fileObj;
		for( file in logObj ) {
			fs.readFile("er/" + file + ".json", function (err, data) {
				fileObj = JSON.parse(data.toString()); 
				fileObj = mergeObjects( fileObj, logObj[file] );
				fs.writeFile("er/" + file + ".json", JSON.stringify(fileObj)); 
			});
		}
	};

};

JSONDumper.$inject = ['baseReporterDecorator'];

module.exports = {
  'reporter:json-dumper': ['type', JSONDumper]
};
