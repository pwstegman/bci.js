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
				// remove .js and src/
				filePath = filePath.substring(4, filePath.length - 3);
				fs.appendFileSync(out, `export * from './${filePath}';\n`);
			}
		});

		fs.closeSync(out);
	});
}
