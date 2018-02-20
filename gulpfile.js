var fs = require('fs');
var gulp = require('gulp');
var mkdirp = require('mkdirp');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function () {
	var libdir = 'lib';
	var libs = ['math', 'network', 'data', 'compat'];

	var header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	var out = fs.openSync('./index.js', 'w');
	fs.writeSync(out, header);

	libs.forEach(lib => {
		var path = libdir + '/' + lib;
		var files = fs.readdirSync(path);

		files.forEach(file => {
			var functionName = file.substring(0, file.length - 3);
			fs.appendFileSync(out, 'module.exports.' + functionName + ' = require(\'./' + path + '/' + file + '\');\n');
		});
	});

	fs.closeSync(out);
});

gulp.task('dist', function () {
	return browserify({
		debug: true,
		entries: './index.js',
		standalone: 'bci'//,
		/*ignore: [require.resolve('mathjs')]*/
	})
		.transform(babelify.configure({
			presets: ["env"]
		}))
		.bundle()
		.on('error', (...args) => console.log(args))
		.pipe(source('bci.min.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps', { addComment: false }))
		.pipe(gulp.dest('dist'));
});