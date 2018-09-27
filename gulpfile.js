const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

var hub = new HubRegistry(['gulp-tasks/*.js']);
gulp.registry(hub);

gulp.task('docs', gulp.series('docshtml', 'docsmd'));