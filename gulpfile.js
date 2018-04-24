var fs = require('fs');
var gulp = require('gulp');
var mkdirp = require('mkdirp');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');

var jsdoc = require('gulp-jsdoc3');

var fsThen = require('fs-then-native');
var jsdoc2md = require('jsdoc-to-markdown');

gulp.task('build', function () {
	var libdir = 'lib';
	var libs = ['math', 'network', 'data', 'compat'];

	var header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	header += "/** @module webbci */\n";
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

	var moreCompat = fs.readFileSync('./compat.js', {encoding: 'utf8'});
	fs.appendFileSync(out, moreCompat);

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

gulp.task('dist-nobabel', function () {
	return browserify({
		debug: true,
		entries: './index.js',
		standalone: 'bci'
	})
		.bundle()
		.on('error', (...args) => console.log(args))
		.pipe(source('bci.min.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});

gulp.task('docs-html', function(cb){
	var config = require('./jsdoc.json');
	var files = [
		'README.md',
		'index.js',
		'lib/data',
		'lib/math',
		'lib/network'
	];
	gulp.src(files, {read: false})
		.pipe(jsdoc(config, cb));
});

gulp.task('docs-md', function(cb){
  return jsdoc2md.render({ files: ['./index.js', './lib/math/*.js', './lib/data/*.js', './lib/network/*.js'] })
	.then(output => fsThen.writeFile('docs/api.md', output))
	.then(() => jsdoc2md.render({files: ['./index.js', './lib/compat/*.js']}))
	.then(output => fsThen.writeFile('docs/deprecated.md', output));
});