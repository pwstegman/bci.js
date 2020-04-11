const gulp = require('gulp');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const addheader = require('gulp-header');
const moment = require('moment');
const pkg = require('../package.json');

function buildTest(){
    return gulp.src(['./test/browser/requires.js', './test/tests/shared/**/*.test.js'])
        .pipe(concat('bci.test.js'))
        .pipe(gulp.dest('test/browser'));
}

function browserifyTest(){
    let header = ['/**',
        ' * Please do not modify this file. Edit files in test/tests/shared/. \'npm run test-dist\' will',
        ' * automatically rebuild this file.',
        ' *',
        ' * bci.js v<%= pkg.version %> test file for the browser',
        ` * Auto generated ${moment().utc().format()}`,
        ' */'
    ].join('\n') + '\n\n';
    
    let b = browserify({
		debug: false,
        entries: './test/browser/bci.test.js',
    });
    b.plugin('mocaccino');
    return b.bundle()
    .on('error', (...args) => console.log(args))
    .pipe(source('bci.test.js'))
    .pipe(addheader(header, {pkg:pkg}))
	.pipe(gulp.dest('test/browser'))
}

function copyDistFiles(){
    console.log('Start a web server in test/browser for dist test results');

    return gulp.src(['dist/bci.js', 'dist/bci.min.js']).pipe(gulp.dest('test/browser'));
}

gulp.task('test-dist', gulp.series(buildTest, browserifyTest, copyDistFiles));
