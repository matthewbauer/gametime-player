module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  pkg = grunt.file.readJSON 'package.json'
  grunt.initConfig
    pkg: pkg
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

  grunt.registerTask 'package.json', ->
    pkg = grunt.file.readJSON 'package.json'
    pkg.main = 'main.js'
    grunt.file.write 'app/package.json', JSON.stringify(pkg, null, '  ')

  grunt.registerTask 'run', ['app', 'shell:electron']
  grunt.registerTask 'build', ['coffee:compile', 'copy:lib']
  grunt.registerTask 'test', ['mochaTest']
  grunt.registerTask 'prepublish', ['coffee:compile', 'copy:lib']
  grunt.registerTask 'package', ['app', 'electron']
  grunt.registerTask 'app', ['coffee:compile', 'copy:app', 'package.json']
  grunt.registerTask 'default', ['run']
