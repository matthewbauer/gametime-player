app = require('app')
BrowserWindow = require('browser-window')

require('crash-reporter').start()

window = null

app.on('window-all-closed', ->
  app.quit()
)

app.on('ready', ->
  window = new BrowserWindow({width: 800, height: 600})
  window.loadUrl('file://' + __dirname + '/../app.html')
  window.on('closed', ->
    window = null
  )
)
