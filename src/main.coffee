app = require 'app'
BrowserWindow = require 'browser-window'
Menu = require 'menu'
process = require 'process'

ipc = require 'ipc'

require('crash-reporter').start()

window = null

process.on 'SIGINT', ->
  window.close()
  process.exit()

app.on 'ready', ->
  window = new BrowserWindow
    width: 800
    height: 600
    title: 'GameTime'
    resizable: true
    center: true
    toolbar: true
    'web-preferences':
      javascript: true
      webgl: true
      webaudio: true
  window.loadUrl "file://#{__dirname}/app.html"
  window.on 'closed', -> window = null
