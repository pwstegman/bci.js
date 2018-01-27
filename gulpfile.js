var fs = require('fs');
var gulp = require('gulp');
var mkdirp = require('mkdirp');

gulp.task('build', function () {
	var libdir = 'lib';
	var libs = ['math', 'network', 'ds'];
	var builddir = './build';

	var header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";

	mkdirp(builddir, function (err) {
		if (err) console.error(err)
	});

	// Compile together libraries
	libs.forEach(lib => {
		var path = libdir + '/' + lib;
		var files = fs.readdirSync(path);
		var out = fs.openSync(builddir + '/' + lib + '.js', 'w');

		fs.writeSync(out, header);

		files.forEach(file => {
			var functionName = file.substring(0, file.length - 3);
			fs.appendFileSync(out, 'module.exports.' + functionName + ' = require(\'../' + path + '/' + file + '\');\n');
		});

		fs.closeSync(out);
	});

	var index = fs.openSync(builddir + '/index.js', 'w');
	fs.writeSync(index, header);

	libs.forEach(lib => {
		fs.appendFileSync(index, 'module.exports.' + lib + ' = require(\'./' + lib + '.js\');\n');
	});

	fs.closeSync(index);
});