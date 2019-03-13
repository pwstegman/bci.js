const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const gulpPug = require('gulp-pug');
const pug = require('pug');
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;


function docshtml(done){
	let config = require('../jsdoc.json');
	let files = [
		'README.md',
		'index.js',
		'lib/data',
		'lib/math',
		'lib/network',
		'lib/metrics'
	];
	return gulp.src(files, {read: false}).pipe(jsdoc(config, done));
};

function copyStatic(){
	return gulp.src(['static/**/*']).pipe(gulp.dest('docs/docs/static'));
}

function copyExamples(){
	return gulp.src(['examples/browser/**/*']).pipe(gulp.dest('docs/docs/examples'));
}

function homepage(){
	let config = require('../website/config.json');
	let locals = require('../website/templates/locals.json');

    /* Convert each filename in the config to the file contents, because
       pug doesn't support variable names in includes */
    config.examples.forEach(examples => {
        locals[examples.id] = examples.files.map(filename => {
            return {
                filename: path.basename(filename, '.txt'),
                contents: pug.render('include ' + filename, {filename: 'website/index.pug'})
            };
        });
    });

    return gulp.src('website/index.pug')
        .pipe(gulpPug({
            locals: locals
        }))
        .pipe(gulp.dest('docs'));
}

function css(){
	return gulp.src('website/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('docs/css'));
}

function js(){
	return pipeline(
        gulp.src('website/js/*.js'),
        uglify(),
        gulp.dest('docs/js')
  	);
}

gulp.task('docs-html', gulp.parallel([
	gulp.series(docshtml, copyStatic, copyExamples),
	homepage,
	css,
	js
]));
