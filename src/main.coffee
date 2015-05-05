app = require('app')
BrowserWindow = require('browser-window')
Menu = require('menu')

autoUpdater = require('auto-updater')
#autoUpdater.setFeedUrl('http://easyretro.herokuapp.com/releases/latest' +
#  '?version=' + app.getVersion())

require('crash-reporter').start()

window = null
prefWindow = null

app.on('window-all-closed', ->
  app.quit()
)

openPreferencesWindow = ->
  prefWindow = new BrowserWindow(
    width: 400
    height: 600
    title: 'gametime'
    'web-preferences':
      javascript: true
  )
  prefWindow.loadUrl('file://' + __dirname + '/preferences.html')
  prefWindow.on('closed', -> prefWindow = null)

template = [
  {
    label: 'GameTime'
    submenu: [
      {
        label: 'About GameTime'
        selector: 'orderFrontStandardAboutPanel:'
      }
      {
        label: 'Preferences...'
        accelarator: 'Command+,'
        click: -> openPreferencesWindow()
      }
      {
        label: 'Quit'
        accelarator: 'Command+Q'
        click: -> app.quit()
      }
    ]
  }
  {
    label: 'Core' #TODO: implement later
    submenu: []
  }
  {
    label: 'Game' #TODO: implement later
    submenu: []
  }
]

menu = Menu.buildFromTemplate(template)

app.on('ready', ->
  Menu.setApplicationMenu(menu)
  window = new BrowserWindow(
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
  )
  window.loadUrl('file://' + __dirname + '/app.html')
  window.openDevTools()
  window.on('closed', ->
    window = null
  )
)
