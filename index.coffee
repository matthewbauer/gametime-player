sparkmd5 = require 'sparkmd5'
JSZip = require 'jszip'
localForage = require 'localforage'
require 'x-retro'

settings = require './settings.json!'
utils = require './utils'

draghint = document.getElementById 'draghint'
loading = document.getElementById 'loading'

if location.search? and location.search.substr(1)
  window.url = location.search.substr(1)
  if window.url.startsWith 'http'
    window.url = settings.urlPrefix + window.url
  [..., window.filename] = location.search.substr(1).split('/')

service = analytics.getService 'GPemu'
service.getConfig().addCallback (config) ->
  config.setTrackingPermitted true
tracker = service.getTracker 'UA-6667993-15'
tracker.sendAppView 'drag-and-drop'
tracker.startTiming 'js', 'load'

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

retro = null

onkey = (event) ->
  if retro.player and settings.keys.hasOwnProperty event.which
    pressed = event.type == 'keydown'
    retro.player.inputs[0].buttons[settings.keys[event.which]] ?= {}
    retro.player.inputs[0].buttons[settings.keys[event.which]].pressed = pressed
    event.preventDefault()

autosaver = 0

createOverlay = (buttons, prefix) ->
  buttons.forEach (button) ->
    el = null
    if button.src
      el = document.createElement 'img'
      el.setAttribute('src', prefix + button.src)
    else
      el = document.createElement 'div'
    el.style['z-index'] = 1
    el.style.position = 'absolute'
    el.style.transform = 'translate(-50%, -50%)'
    el.style.left = 100 * button.x + '%'
    el.style.top = 100 * button.y + '%'
    el.style.width = 100 * button.width + '%'
    el.style.height = 100 * button.height + '%'
    if button.circle
      el.style['border-radius'] = '100%'
    if button.id?
      el.style['z-index'] = 2
      press = (event) ->
        if retro.player
          retro.player.inputs[0].buttons[button.id] ?= {}
          retro.player.inputs[0].buttons[button.id].pressed = (event.type == 'mousedown' || event.type == 'touchstart')
          event.preventDefault()
      el.addEventListener 'mousedown', press
      el.addEventListener 'mousemove', press
      el.addEventListener 'mouseup', press
      el.addEventListener 'touchstart', press
      el.addEventListener 'touchmove', press
      el.addEventListener 'touchend', press
    document.getElementById('overlay').appendChild(el)

error = (e) ->
  loading.classList.add 'hidden'
  document.getElementById('error').classList.remove 'hidden'
  console.error e
  tracker.sendException e.message if tracker?

writeSave = (retro) ->
  try
    return localForage.setItem retro.md5, new Uint8Array retro.core.serialize()
  catch err
    error err

loadSave = (retro) ->
  try
    return localForage.getItem retro.md5
  catch err
    error err

play = (rom, extension) ->
  Promise.resolve()
  .then ->
    throw new Error 'no rom!' if not rom
    window.retro = retro = document.createElement 'canvas', 'x-retro'
    document.body.appendChild retro
    retro.md5 = sparkmd5.ArrayBuffer.hash rom
    retro.name = settings.extensions[extension]
    Promise.all([
      System.import settings.extensions[extension]
      loadSave retro
      System.import settings.overlays[retro.name] + 'index.json!' if settings.overlays[retro.name] and 'ontouchstart' in window
    ]).then ([core, save, _overlay]) ->
      tracker.sendAppView 'play' if tracker?
      createOverlay _overlay, settings.overlays[retro.name] if _overlay?
      document.getElementById('core-name').textContent = settings.extensions[extension]
      document.getElementById('system-info').textContent = JSON.stringify core.get_system_info(), null, '  '
      retro.core = core
      retro.game = rom
      core.unserialize new Uint8Array save if save?
      core.set_input_poll ->
        gamepads = navigator.getGamepads() if navigator.getGamepads
        retro.player.inputs = gamepads if gamepads and gamepads[0]
      retro.player.inputs = [
        buttons: {}
      ]
      loading.classList.add 'hidden'
      overlay.classList.remove 'hidden'
      document.getElementById('av-info').textContent = JSON.stringify retro.player.av_info, null, '  '
      autosaver = setInterval ->
        writeSave retro
      , 1000
      window.addEventListener 'keydown', onkey
      window.addEventListener 'keyup', onkey
      retro.start()

loadData = (filename, buffer) ->
  draghint.classList.add 'hidden'
  tracker.sendEvent 'play', filename if tracker?
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
  .catch error

load = (file) ->
  tracker.sendEvent 'file' if tracker?
  return if not file instanceof Blob
  draghint.classList.add 'hidden'
  reader = new FileReader()
  reader.addEventListener 'load', (event) ->
    loadData file.name, new Uint8Array reader.result
  reader.readAsArrayBuffer file

window.addEventListener 'drop', (event) ->
  return if draghint.classList.contains 'hidden'
  tracker.sendEvent 'drop' if tracker?
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
      tracker.sendAppView 'play' if tracker?
      retro.start()
    else
      tracker.sendAppView 'settings' if tracker?
      retro.stop()
    retro.classList.toggle 'hidden'
    overlay.classList.toggle 'hidden'
    menu.classList.toggle 'hidden'
    event.preventDefault()

window.resume = ->
  tracker.sendEvent 'play' if tracker?
  retro.classList.remove 'hidden'
  overlay.classList.toggle 'hidden'
  menu.classList.add 'hidden'
  retro.start()
document.getElementById('resume').addEventListener 'click', window.resume

window.reset = ->
  tracker.sendEvent 'reset' if tracker?
  retro.stop()
  retro.core.reset()
  window.resume()
document.getElementById('reset').addEventListener 'click', window.reset

window.mute = ->
  if retro.player.destination.gain.value == 0
    tracker.sendEvent 'unmute' if tracker?
    retro.player.destination.gain.value = 1
    document.getElementById('mute').textContent = 'mute'
  else
    tracker.sendEvent 'mute' if tracker?
    retro.player.destination.gain.value = 0
    document.getElementById('mute').textContent = 'unmute'
  window.resume()
document.getElementById('mute').addEventListener 'click', window.mute

window.save = ->
  tracker.sendEvent 'save' if tracker?
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
  tracker.sendEvent 'load' if tracker?
  savechooser.click()
document.getElementById('load').addEventListener 'click', window.load

chooser = document.getElementById 'chooser'
chooser.addEventListener 'change', ->
  draghint.classList.remove 'hover'
  loading.classList.remove 'hidden'
  load this.files[0]
window.addEventListener 'click', (event) ->
  if not draghint.classList.contains 'hidden'
    tracker.sendEvent 'click' if tracker?
    draghint.classList.add 'hover'
    chooser.click()

window.addEventListener 'touchstart', (e) ->
  e.preventDefault()

window.addEventListener 'error', error
