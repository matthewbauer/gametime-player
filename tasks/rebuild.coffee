fs = require 'fs'
async = require 'async'
child_process = require('child_process')
npm = require.resolve('npm/bin/npm-cli')

module.exports = (grunt) ->
  grunt.registerTask 'electron-rebuild', ->
    done = @async()
    nodeVersion = grunt.config('pkg.electronVersion')
    async.eachSeries Object.keys(grunt.config('pkg.dependencies')), (dep, callback) ->
      console.log dep
      child_process.execFile npm, ['install', dep,
        "--target=#{nodeVersion}"
        "--dist-url=https://atom.io/download/atom-shell"], callback
    , done
