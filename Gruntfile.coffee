
module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  pkg = grunt.file.readJSON 'package.json'
  electron_version = '0.26.0'

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
    electron:
      osxBuild:
        options:
          name: 'GameTime'
          dir: 'app'
          out: 'dist'
          version: electron_version
          platform: 'darwin'
          arch: 'x64'
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
    pkg = grunt.file.readJSON('package.json')
    pkg.main = 'main.js'
    grunt.file.write 'app/package.json', JSON.stringify(pkg, null, '  ')

  grunt.registerTask 'electron-rebuild', ->
    rebuild = require 'electron-rebuild'
    headerResult = rebuild.installNodeHeaders "v#{electron_version}"
    headerResult.then ->
      rebuild.rebuildNativeModules "v#{electron_version}" './node_modules'

  grunt.registerTask 'run', ['app', 'shell:electron']
  grunt.registerTask 'build', ['coffee:compile', 'copy:lib']
  grunt.registerTask 'test', ['mochaTest']
  grunt.registerTask 'prepublish', ['coffee:compile', 'copy:lib']
  grunt.registerTask 'package', ['app', 'electron']
  grunt.registerTask 'app', ['electron-rebuild', 'coffee:compile', 'copy:app',
                             'package.json']
  grunt.registerTask 'default', ['run']
