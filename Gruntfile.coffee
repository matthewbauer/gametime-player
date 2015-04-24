module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    'build-electron-app':
      options:
        platforms: [ 'darwin', 'win32' ]
    copy:
      app:
        files: [
          {
            expand: true
            cwd: 'build/js/'
            src: ['retroplayer.js', 'buildbot.js']
            dest: 'lib/'
          }
          {
            expand: true
            src: ['app.html', 'app.css', 'package.json']
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
            src: ['node-retro/**', 'request/**', 'unzip/**']
            dest: 'app/node_modules/'
          }
        ]
    browserify:
      compile:
        files:
          'app/app.js': ['build/js/app.js']
        options:
          exclude: ['../build/Release/retro']
    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'build/js/'
          ext: '.js'
        ]
    shell:
      electron:
        command: 'electron app'
  )
  grunt.registerTask('package.json', ->
    pkg = grunt.file.readJSON('package.json')
    pkg.main = 'main.js'
    grunt.file.write('app/package.json', JSON.stringify(pkg, null, '  '))
  )
  grunt.loadNpmTasks('grunt-electron-app-builder')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-shell')
  grunt.registerTask('run', ['coffee:compile', 'copy:app', 'package.json', 'shell:electron'])
  grunt.registerTask('package', ['coffee:compile', 'copy:app', 'package.json', 'build-electron-app'])
  grunt.registerTask('default', ['run'])
