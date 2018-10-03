const gulp = require('gulp');
const fs = require('fs');
const createIndex = require('./utils/createIndex.js');

function build(done) {
	let header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	header += "/** @module bcijs */\n";
	createIndex('lib/**/*.js', './index.js', {
		header: header
	});
	
	let browserHeader = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	browserHeader += "// This module excludes Node.js specific methods so it can be used in the browser\n";
	browserHeader += "/** @module bcijs */\n";
	createIndex('lib/**/*.js', './browser.js', {
		header: browserHeader,
		includeFunction: (filePath) => {
			let moduleCode = fs.readFileSync(filePath);
			// Exclude modules marked as 'exclusive to Node' in the function documentation
			return moduleCode.indexOf('exclusive to Node') == -1;
		}
	});
    
    done();
};

gulp.task('build', build);
