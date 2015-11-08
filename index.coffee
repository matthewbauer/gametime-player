sparkmd5 = require 'sparkmd5'
JSZip = require 'jszip'
localForage = require 'localforage'
require 'x-game'

settings = require './settings.json!'
utils = require './utils'

draghint = document.getElementById 'draghint'
loading = document.getElementById 'loading'

if location.search? and location.search.substr(1)
  window.url = location.search.substr(1)
  if window.url.startsWith 'http'
    window.url = settings.urlPrefix + window.url
  [..., window.filename] = location.search.substr(1).split('/')

if window.url and window.filename
  xhr = new XMLHttpRequest()
  xhr.open 'GET', window.url, true
  xhr.responseType = 'arraybuffer'
  xhr.onload = (e) ->
    loadData window.filename, new Uint8Array this.response if this.status == 200
  xhr.send()
else
  loading.classList.add 'hidden'
  draghint.classList.remove 'hidden'

navigator.serviceWorker.register 'worker.js' if navigator.serviceWorker

window.retro = retro = document.createElement 'canvas', 'x-game'
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
  window.clearInterval autosaver if autosaver

gain = null

play = (rom, extension) ->
  Promise.resolve()
  .then ->
    throw new Error 'no rom!' if not rom
    retro.md5 = sparkmd5.ArrayBuffer.hash rom
    retro.name = settings.extensions[extension]
    Promise.all([
      System.import settings.extensions[extension]
      localForage.getItem retro.md5
    ]).then ([core, save]) ->
      loading.classList.add 'hidden'
      stop() if retro.running
      document.getElementById('core-name').textContent = settings.extensions[extension]
      document.getElementById('system-info').textContent = JSON.stringify core.get_system_info(), null, '  '
      retro.core = core
      core.load_game rom if rom
      core.unserialize new Uint8Array save if save?
      core.set_input_poll ->
        gamepads = navigator.getGamepads() if navigator.getGamepads
        retro.player.inputs = gamepads if gamepads and gamepads[0]
      retro.player.inputs = [
        buttons: {}
      ]
      document.getElementById('av-info').textContent = JSON.stringify retro.player.av_info, null, '  '
      #autosaver = setInterval ->
      #  localForage.setItem retro.md5, new Uint8Array core.serialize()
      #, 1000
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
    loading.classList.add 'hidden'
    console.error e
    alert "that file couldn't be loaded"
    location.reload() # hacky but a fix

load = (file) ->
  return if not file instanceof Blob
  draghint.classList.add 'hidden'
  reader = new FileReader()
  reader.addEventListener 'load', (event) ->
    loadData file.name, new Uint8Array reader.result
  reader.readAsArrayBuffer file

window.addEventListener 'drop', (event) ->
  return if draghint.classList.contains 'hidden'
  loading.classList.remove 'hidden'
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

window.addEventListener 'focus', ->
  draghint.classList.remove 'hover'

menu = document.getElementById 'menu'
window.addEventListener 'contextmenu', (event) ->
  if draghint.classList.contains 'hidden'
    if retro.classList.contains 'hidden'
      retro.start()
    else
      retro.stop()
    retro.classList.toggle 'hidden'
    menu.classList.toggle 'hidden'
    event.preventDefault()

window.resume = ->
  retro.classList.remove 'hidden'
  menu.classList.add 'hidden'
  retro.start()
document.getElementById('resume').addEventListener 'click', window.resume

window.reset = ->
  retro.stop()
  retro.core.reset()
  window.resume()
document.getElementById('reset').addEventListener 'click', window.reset

window.mute = ->
  if retro.player.destination.gain.value == 0
    retro.player.destination.gain.value = 1
    document.getElementById('mute').textContent = 'mute'
  else
    retro.player.destination.gain.value = 0
    document.getElementById('mute').textContent = 'unmute'
  window.resume()
document.getElementById('mute').addEventListener 'click', window.mute

window.save = ->
  a = document.createElement 'a'
  document.body.appendChild a
  a.classList.add 'hidden'
  blob = new Blob [new Uint8Array retro.core.serialize()],
    type: 'application/octet-binary'
  url = URL.createObjectURL blob
  a.href = url
  a.download = retro.md5 + '.' + retro.name + '.sav'
  a.click()
  URL.revokeObjectURL url
document.getElementById('save').addEventListener 'click', window.save

savechooser = document.getElementById 'savechooser'
savechooser.addEventListener 'change', ->
  file = this.files[0]
  return if not file instanceof Blob
  draghint.classList.add 'hidden'
  reader = new FileReader()
  reader.addEventListener 'load', (event) ->
    retro.core.unserialize new Uint8Array reader.result
    window.resume()
  reader.readAsArrayBuffer file
window.load = ->
  savechooser.click()
document.getElementById('load').addEventListener 'click', window.load

chooser = document.getElementById 'chooser'
chooser.addEventListener 'change', ->
  draghint.classList.remove 'hover'
  loading.classList.remove 'hidden'
  load this.files[0]
window.addEventListener 'click', (event) ->
  if not draghint.classList.contains 'hidden'
    draghint.classList.add 'hover'
    chooser.click()
