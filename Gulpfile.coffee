gulp = require('gulp')
coffee = require('gulp-coffee')
gulpAtom = require('gulp-atom')

paths = {
  coffee: './src/*.coffee'
}

gulp.task('atom', ->
  gulpAtom({
    srcPath: './lib',
    releasePath: './release',
    cachePath: './cache',
    version: 'v0.20.0',
    rebuild: false,
    platforms: ['darwin-x64']
  })
)

gulp.task('coffee', ->
  gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(gulp.dest('./lib/'))
)

gulp.task('build', ['coffee', 'html'])

gulp.task('watch', ->
  gulp.watch(paths.coffee, ['coffee'])
)

gulp.task('default', ['watch'])
