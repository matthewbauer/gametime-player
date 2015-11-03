sparkmd5 = require 'sparkmd5'
JSZip = require 'jszip'
localForage = require 'localforage'
require 'x-game'

settings = require './settings.json!'
utils = require './utils'

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

navigator.serviceWorker.register 'worker.js' if navigator.serviceWorker

retro = document.createElement 'canvas', 'x-game'
document.body.appendChild retro

onkey = (event) ->
  if retro.player and settings.keys.hasOwnProperty event.which
    pressed = event.type == 'keydown'
    retro.player.inputs[0].buttons[settings.keys[event.which]] ?= {}
    retro.player.inputs[0].buttons[settings.keys[event.which]].pressed = pressed
    event.preventDefault()

autosaver = 0

stop = ->
  retro.stop()
  # retro.core.deinit()
  window.removeEventListener 'keyup', onkey
  window.removeEventListener 'keydown', onkey
  window.clearInterval autosaver

play = (rom, extension) ->
  Promise.resolve()
  .then ->
    throw 'no rom!' if not rom
    retro.md5 = sparkmd5.ArrayBuffer.hash rom
    Promise.all([
      System.import settings.extensions[extension]
      localForage.getItem retro.md5
    ]).then ([core, save]) ->
      stop() if retro.running
      retro.core = core
      core.load_game rom if rom
      core.unserialize new Uint8Array save if save?
      core.set_input_poll ->
        gamepads = navigator.getGamepads() if navigator.getGamepads
        retro.player.inputs = gamepads if gamepads and gamepads[0]
      retro.player.inputs = [
        buttons: {}
      ]
      autosaver = setInterval ->
        localForage.setItem retro.md5, new Uint8Array core.serialize()
      , 1000
      window.addEventListener 'keydown', onkey
      window.addEventListener 'keyup', onkey
      retro.start()

loadData = (filename, buffer) ->
  draghint.classList.add 'hidden'
  extension = utils.getExtension filename
  rom = null
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
    location.reload() # hacky but a fix

load = (file) ->
  return if not file instanceof Blob
  draghint.classList.add 'hidden'
  reader = new FileReader()
  reader.addEventListener 'load', (event) ->
    loadData file.name, (new Uint8Array reader.result)
  reader.readAsArrayBuffer file

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
