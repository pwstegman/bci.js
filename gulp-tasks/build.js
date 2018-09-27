const gulp = require('gulp');
const createIndex = require('./utils/createIndex.js');

function build(done) {
	let header = "// This file was auto generated, changes will be overwritten\n// Created on " + (new Date()) + "\n";
	header += "/** @module bcijs */\n";

	createIndex('lib/**/*.js', './index.js', {
		header: header
    });
    
    done();
};

gulp.task('build', build);
