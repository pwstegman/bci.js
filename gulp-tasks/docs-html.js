const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

function docshtml(done){
	let config = require('../jsdoc.json');
	let files = [
		'README.md',
		'index.js',
		'lib/data',
		'lib/math',
		'lib/network'
	];
	return gulp.src(files, {read: false}).pipe(jsdoc(config, done));
};

function copyStatic(){
	return gulp.src(['static/**/*']).pipe(gulp.dest('docs/static'));
}

gulp.task('docshtml', gulp.series(docshtml, copyStatic));
