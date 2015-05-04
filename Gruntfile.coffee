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
      app:
        files: [
          {
            expand: true
            cwd: 'build/js/'
            src: ['player.js']
            dest: 'lib/'
          }
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
  grunt.loadNpmTasks('grunt-build-atom-shell')
  grunt.loadNpmTasks('grunt-electron-app-builder')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-shell')
  grunt.registerTask('run', ['coffee:compile', 'copy:app', 'package.json',
    'shell:electron'])
  grunt.registerTask('package', ['coffee:compile', 'copy:app', 'package.json',
    'build-atom-shell'])
  grunt.registerTask('default', ['run'])
