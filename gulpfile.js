var fs = require('fs');
var gulp = require('gulp');

gulp.task('build', function () {
	// Options
	var libDir = 'lib/';
	var libs = ['math', 'network'];
	var outFile = 'lib/index.js';

	// Open file and clear previous contents
	var buildFile = fs.openSync(outFile, 'w');

	// Write header
	var header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	fs.writeSync(buildFile, header);

	// Compile together libraries
	for (var d = 0; d < libs.length; d++) {
		var lib = libs[d];
		fs.appendFileSync(buildFile, 'var ' + lib + ' = {};\n');
		var mathFiles = fs.readdirSync(libDir + lib);
		for (var i = 0; i < mathFiles.length; i++) {
			var file = mathFiles[i];
			var varName = file.substring(0, file.length - 3);

			fs.appendFileSync(buildFile, lib + '.' + varName + ' = require(\'./' + lib + '/' + file + '\');\n');
		}
		fs.appendFileSync(buildFile, 'exports.' + lib + ' = ' + lib + ';\n');
	}

	// Close file
	fs.closeSync(buildFile);
});