const fs = require('fs');
const path = require('path');
const upath = require('upath');
const glob = require('glob');

module.exports = function(src, outFile, options) {
	let {includeFunction, header, projectRoot} = Object.assign({
		includeFunction: () => true,
		header: '',
		projectRoot: ''
	}, options);

	let out = fs.openSync(outFile, 'w');
	fs.writeSync(out, header);

	glob(src, function (er, files) {
		files.forEach(filePath => {
			filePath = upath.normalize(filePath);
			if(includeFunction(filePath)){
				filePath = upath.normalize(path.join(projectRoot, filePath));
				let functionName = path.basename(filePath, '.js');
				fs.appendFileSync(out, 'module.exports.' + functionName + " = require('./" + filePath + "');\n");
			}
		});

		let moreCompat = fs.readFileSync('./compat.js', {encoding: 'utf8'});
		fs.appendFileSync(out, moreCompat);

		fs.closeSync(out);
	});
}
