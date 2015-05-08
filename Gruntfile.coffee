module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')
  grunt.initConfig(
    pkg: pkg
    'build-atom-shell':
      buildDir: 'build'
      tag: 'master'
      projectName: 'gametime'
      productName: 'GameTime'
    copy:
      lib:
        files: [
          {
            expand: true
            cwd: 'build/js/'
            src: ['player.js']
            dest: 'lib/'
          }
        ]
      app:
        files: [
          {
            expand: true
            src: ['app.html', 'app.css', 'package.json', 'preferences.html',
                  'node_modules/bootstrap/dist/css/bootstrap.min.css']
            dest: 'app/'
          }
          {
            expand: true
            cwd: 'build/js/'
            src: ['*.js']
            dest: 'app/'
          }
          {
            expand: true
            cwd: 'node_modules'
            src: Object.keys(pkg.dependencies).map((pkg) -> pkg + '/**')
            dest: 'app/node_modules/'
          }
        ]
    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'build/js/'
          ext: '.js'
        ]
    mochaTest:
      test:
        options:
          reporter: 'spec',
          require: 'coffee-script/register'
        src: ['test/*.coffee']
    shell:
      electron:
        command: 'electron app'
  )
  grunt.registerTask('package.json', ->
    pkg = grunt.file.readJSON('package.json')
    pkg.main = 'main.js'
    grunt.file.write('app/package.json', JSON.stringify(pkg, null, '  '))
  )
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-build-atom-shell')
  grunt.loadNpmTasks('grunt-electron-app-builder')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-shell')
  grunt.registerTask('run', ['coffee:compile', 'copy:app', 'package.json',
    'shell:electron'])
  grunt.registerTask('build', ['coffee:compile', 'copy:lib'])
  grunt.registerTask('test', ['mochaTest'])
  grunt.registerTask('prepublish', ['coffee:compile', 'copy:lib'])
  grunt.registerTask('package', ['coffee:compile', 'copy:app', 'package.json',
    'build-atom-shell'])
  grunt.registerTask('default', ['run'])
