gulp = require('gulp')
coffee = require('gulp-coffee')
atomshell = require('gulp-atom-shell')

paths = {
  coffee: './src/*.coffee'
}

gulp.task('package', ->
  gulp.src(['./lib/*.js', 'app.html', 'app.css'])
      .pipe(atomshell({
            version: '0.19.4',
            platform: 'darwin'
      }))
      .pipe(atomshell.zfsdest('app.zip'))
)

gulp.task('coffee', ->
  gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(gulp.dest('./lib/'))
)

gulp.task('build', ['coffee'])

gulp.task('watch', ->
  gulp.watch(paths.coffee, ['coffee'])
)

gulp.task('default', ['watch'])
