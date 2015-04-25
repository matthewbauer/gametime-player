app = require('app')
BrowserWindow = require('browser-window')
Menu = require('menu')

autoUpdater = require('auto-updater')
#autoUpdater.setFeedUrl('http://easyretro.herokuapp.com/releases/latest?version=' + app.getVersion())

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
    title: 'easyretro'
    'skip-taskbar': true
    show: true
    'web-preferences':
      javascript: true
  )
  prefWindow.loadUrl('file://' + __dirname + '/preferences.html')
  prefWindow.on('closed', ->
    prefWindow = null
  )

template = [
  {
    label: 'EasyRetro'
    submenu: [
      {
        label: 'About EasyRetro'
        selector: 'orderFrontStandardAboutPanel:'
      }
      {
        type: 'separator'
      }
      {
        label: 'Preferences...'
        accelarator: 'Command+,'
        click: -> openPreferencesWindow()
      }
      {
        type: 'separator'
      }
      {
        label: 'Services'
        submenu: []
      }
      {
        type: 'separator'
      }
      {
        label: 'Hide EasyRetro'
        accelarator: 'Command+H'
        selector: 'hide:'
      }
      {
        label: 'Hide Others'
        accelarator: 'Command+Shift+H'
        selector: 'hideOtherApplications:'
      }
      {
        label: 'Show All'
        selector: 'unhideAllApplications:'
      }
      {
        type: 'separator'
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
    title: 'EasyRetro'
    resizable: true
    center: true
    'skip-taskbar': true
    show: true
    'web-preferences':
      javascript: true
      webgl: true
      webaudio: true
  )
  window.loadUrl('file://' + __dirname + '/app.html')
  window.on('closed', ->
    window = null
  )
)
