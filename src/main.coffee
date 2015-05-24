app = require 'app'
BrowserWindow = require 'browser-window'
Menu = require 'menu'

ipc = require 'ipc'
url = require 'url'
path = require 'path'

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
  loadSettings =
    bootstrapScript: path.resolve(__dirname, 'app.coffee')
  window.loadUrl url.format
    protocol: 'file'
    pathname: path.resolve(__dirname, 'app.html')
    slashes: true
    query: {loadSettings: JSON.stringify(loadSettings)}
  window.on 'closed', -> window = null
