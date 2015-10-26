sparkmd5 = require 'sparkmd5'
JSZip = require 'jszip'
require 'x-game'

settings = require './settings.json!'

draghint = document.getElementById 'draghint'
chooser = document.getElementById 'chooser'

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

init = (rom, extension, save) ->
  Promise.resolve cores[settings.extensions[extension]]
  .then (core) ->
    retro.core = core
    retro.game = rom if rom
    retro.save = new Uint8Array save if save?
    retro.core.set_input_poll ->
      gamepads = navigator.getGamepads()
      retro.player.inputs = gamepads if gamepads[0]
    retro.player.inputs = [
      buttons: {}
    ]
    onkey = (event) ->
      if retro.player and settings.keys.hasOwnProperty event.which
        pressed = event.type == 'keydown'
        retro.player.inputs[0].buttons[settings.keys[event.which]] ?= {}
        retro.player.inputs[0].buttons[settings.keys[event.which]].pressed = pressed
        event.preventDefault()
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
          setInterval ->
            writer.write new Blob [retro.save], type: 'application/octet-binary'
          , 10000
        retro.start()
  .catch (err) ->
    init rom, extension
    .then (retro) ->
      retro.start()

loadData = (filename, buffer) ->
  draghint.classList.add 'hidden'
  [..., extension] = filename.split '.'
  rom = null
  if extension is 'zip'
    zip = new JSZip buffer
    for file in zip.file /.*/ # any way to predict name of file?
      [..., extension] = file.name.split '.'
      if settings.extensions[extension]
        rom = new Uint8Array file.asArrayBuffer()
        break
  else if settings.extensions[extension]
    rom = buffer
  if rom
    stop() if retro.running
    play rom, extension
    .catch ->
      draghint.classList.remove 'hidden'
  else
    draghint.classList.remove 'hidden'

load = (file) ->
  draghint.classList.add 'hidden'
  readFile file
  .then (buffer) ->
    loadData file.name, buffer

window.addEventListener 'drop', (event) ->
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
