module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)
  grunt.loadTasks 'tasks'
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
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
    mochaTest:
      test:
        options:
          reporter: 'spec',
          require: [
            'coffee-script/register'
            'coffee-coverage/register-istanbul'
          ]
        src: 'spec/*'
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
        command: 'electron run.js'
  grunt.registerTask 'run', ['shell:electron']
  grunt.registerTask 'test', ['run']
  grunt.registerTask 'build', ['coffee:compile', 'copy:lib']
  grunt.registerTask 'prepublish', ['build']
  grunt.registerTask 'default', ['run']
