const gulp = require('gulp');
const concat = require('gulp-concat');
const browserify = require('browserify');
const headerComment = require('gulp-header-comment');
const source = require('vinyl-source-stream');

function buildTest(){
    return gulp.src(['./test/tests/shared/requires.js', './test/tests/shared/**/*.test.js'])
        .pipe(concat('bci.test.js'))
        .pipe(gulp.dest('test/browser'));
}

function browserifyTest(){
    let header = `
        Please do not modify this file. Edit files in test/tests/shared/. 'npm run test-dist' will
        automatically rebuild this file.

		bci.js v<%= pkg.version %> test file for the browser
        Auto generated <%= moment.utc().format() %>
    `;
    
    let b = browserify({
		debug: false,
        entries: './test/browser/bci.test.js',
    });
    b.plugin('mocaccino');
    return b.bundle()
    .on('error', (...args) => console.log(args))
    .pipe(source('bci.test.js'))
    .pipe(headerComment(header))
	.pipe(gulp.dest('test/browser'))
}

function copyDistFiles(){
    return gulp.src(['dist/bci.js', 'dist/bci.min.js']).pipe(gulp.dest('test/browser'));
}

gulp.task('test-dist', gulp.series(buildTest, browserifyTest, copyDistFiles));
