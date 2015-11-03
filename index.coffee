sparkmd5 = require 'sparkmd5'
JSZip = require 'jszip'
require 'x-game'

settings = require './settings.json!'
utils = require './utils'

draghint = document.getElementById 'draghint'
chooser = document.getElementById 'chooser'

service = analytics.getService 'GPemu'
service.getConfig().addCallback (config) ->
  config.setTrackingPermitted true
tracker = service.getTracker 'UA-6667993-15'
tracker.sendAppView 'MainView'

if window.url and window.filename
  xhr = new XMLHttpRequest()
  xhr.open 'GET', window.url, true
  xhr.responseType = 'arraybuffer'
  xhr.onload = (e) ->
    loadData window.filename, new Uint8Array this.response if this.status == 200
  xhr.send()
else
  draghint.classList.remove 'hidden'

window.retro = retro = document.createElement 'canvas', 'x-game'
document.body.appendChild retro

cores =
  'snes9x-next': require 'snes9x-next'
  'vba-next': require 'vba-next'
  'nestopia': require 'nestopia'
  'gambatte': require 'gambatte'

readFile = (file) ->
  new Promise (resolve, reject) ->
    reader = new FileReader()
    reader.readAsArrayBuffer file
    reader.onload = (event) ->
      resolve new Uint8Array reader.result
    reader.onerror = reject

readFileEntry = (entry) ->
  new Promise (resolve, reject) ->
    entry.file resolve, reject
  .then (file) ->
    readFile file

getSave = (filename) ->
  new Promise (resolve, reject) ->
    chrome.syncFileSystem.requestFileSystem (fs) ->
      if chrome.runtime.lastError
        reject chrome.runtime.lastError
        return
      fs.root.getFile filename, create: true, resolve, reject

autosaver = 0

stop = ->
  retro.stop()
  # retro.core.deinit()
  window.removeEventListener 'keyup', onkey
  window.removeEventListener 'keydown', onkey
  window.clearInterval autosaver

onkey = (event) ->
  if retro.player and settings.keys.hasOwnProperty event.which
    pressed = event.type == 'keydown'
    retro.player.inputs[0].buttons[settings.keys[event.which]] ?= {}
    retro.player.inputs[0].buttons[settings.keys[event.which]].pressed = pressed
    event.preventDefault()

init = (rom, extension, save) ->
  stop() if retro.running
  Promise.resolve cores[settings.extensions[extension]]
  .then (core) ->
    retro.core = core
    core.load_game rom if rom
    core.unserialize new Uint8Array save if save?
    core.set_input_poll ->
      gamepads = navigator.getGamepads() if navigator.getGamepads
      retro.player.inputs = gamepads if gamepads and gamepads[0]
    retro.player.inputs = [
      buttons: {}
    ]
    window.addEventListener 'keydown', onkey
    window.addEventListener 'keyup', onkey
    retro

play = (rom, extension) ->
  getSave (sparkmd5.ArrayBuffer.hash rom) + '.sav'
  .then (save) ->
    readFileEntry save
    .then (data) ->
      init rom, extension, data
      .then (retro) ->
        save.createWriter (writer) ->
          autosaver = setInterval ->
            writer.write new Blob [retro.save], type: 'application/octet-binary'
          , 10000
        retro.start()
  .catch (err) ->
    init rom, extension
    .then (retro) ->
      retro.start()

loadData = (filename, buffer) ->
  draghint.classList.add 'hidden'
  extension = utils.getExtension filename
  rom = null
  tracker.sendEvent 'play', filename
  if extension is 'zip'
    zip = new JSZip buffer
    for file in zip.file /.*/ # any way to predict name of file?
      extension = utils.getExtension file.name
      if settings.extensions[extension]
        rom = new Uint8Array file.asArrayBuffer()
        break
  else if settings.extensions[extension]
    rom = buffer
  play rom, extension
  .catch (e) ->
    console.error e
    alert "that file couldn't be loaded"
    draghint.classList.remove 'hidden'

load = (file) ->
  draghint.classList.add 'hidden'
  readFile file
  .then (buffer) ->
    loadData file.name, buffer

window.addEventListener 'drop', (event) ->
  return if draghint.classList.contains 'hidden'
  event.preventDefault()
  draghint.classList.remove 'hover'
  if event.dataTransfer.files.length > 0
    load event.dataTransfer.files[0]
  false

window.addEventListener 'dragover', (event) ->
  event.preventDefault()
  draghint.classList.add 'hover'
  false

window.addEventListener 'dragleave', (event) ->
  event.preventDefault()
  draghint.classList.remove 'hover'
  false

window.addEventListener 'click', (event) ->
  if not draghint.classList.contains 'hidden'
    draghint.classList.add 'hover'
    chooser.click()

window.addEventListener 'focus', () ->
  draghint.classList.remove 'hover'

chooser.addEventListener 'change', ->
  draghint.classList.remove 'hover'
  load this.files[0]
