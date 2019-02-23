const gulp = require('gulp');
const fs = require('fs');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const addheader = require('gulp-header');
const moment = require('moment');
const pkg = require('../package.json');

function distfiles() {
	let header = ['/**',
		' * bci.js v<%= pkg.version %>',
		' * https://github.com/pwstegman/bcijs',
		' *',
		' * License: <%= pkg.license %>',
		` * Generated ${moment().utc().format()}`,
		' */',
	].join('\n') + '\n\n';
	
	return browserify({
		debug: false,
		entries: './browser.js',
		standalone: 'bci'
	})
		.transform('babelify', {
			presets : ['@babel/preset-env'],
			global: true, // Allows files required from node_modules to be transformed as well
			ignore: [/\/node_modules\/(?!app\/)/]
		})
		.bundle()
		.on('error', (...args) => console.log(args))
		.pipe(source('bci.js'))
		.pipe(buffer())
		.pipe(addheader(header, {pkg:pkg}))
		.pipe(gulp.dest('dist'))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(uglify())
		.pipe(addheader(header, {pkg:pkg}))
		.pipe(gulp.dest('dist'));
};

gulp.task('distfiles', distfiles);
