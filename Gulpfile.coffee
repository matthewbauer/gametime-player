gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')

gulp.task('coffee', ->
  gulp.src('./src/*.coffee')
    .pipe(coffee().on('error', gutil.log))
    .pipe(gulp.dest('./lib/'))
)

gulp.task('build', ['coffee'])
