const gulp = require('gulp');
const fsThen = require('fs-then-native');
const jsdoc2md = require('jsdoc-to-markdown');

function docsmd(done){
  jsdoc2md.render({ files: ['./src/index.js', './src/math/*.js', './src/data/*.js', './src/network/*.js', './src/metrics/*.js'] })
	.then(output => fsThen.writeFile('docs/docs/api.md', output))
	.then(() => jsdoc2md.render({files: ['./index.js', './lib/compat/*.js']}))
	.then(output => fsThen.writeFile('docs/docs/deprecated.md', output))
	.then(() => done());
};

gulp.task('docs-md', docsmd);
