const gulp = require('gulp');
const fs = require('fs');
const babel = require('gulp-babel');
const createIndex = require('./utils/createIndex.js');

// Generate es6 module-style index.js in ./src/
function buildESM(done) {
	let header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	createIndex('src/*/*.js', './src/modules.js', {
		header: header
	});
	
	let browserHeader = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	browserHeader += "// This module excludes Node.js specific methods so it can be used in the browser\n";
	createIndex('src/*/*.js', './src/modules_browser.js', {
		header: browserHeader,
		includeFunction: (filePath) => {
			let moduleCode = fs.readFileSync(filePath);
			// Exclude modules marked as 'exclusive to Node' in the function documentation
			return moduleCode.indexOf('exclusive to Node') == -1;
		}
	});
    
    done();
};

// Generate CommonJS module in new directory ./lib/
function buildCommonJS() {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('lib'));
}

gulp.task('build', gulp.series(buildESM, buildCommonJS));
