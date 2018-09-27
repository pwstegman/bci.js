const gulp = require('gulp');
const fsThen = require('fs-then-native');
const jsdoc2md = require('jsdoc-to-markdown');

function docsmd(done){
  jsdoc2md.render({ files: ['./index.js', './lib/math/*.js', './lib/data/*.js', './lib/network/*.js'] })
	.then(output => fsThen.writeFile('docs/api.md', output))
	.then(() => jsdoc2md.render({files: ['./index.js', './lib/compat/*.js']}))
	.then(output => fsThen.writeFile('docs/deprecated.md', output))
	.then(() => done());
};

gulp.task('docsmd', docsmd);
