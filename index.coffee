navigator.serviceWorker.register 'worker.js' if navigator.serviceWorker

# localForage = require('localforage').default
md5 = require('sparkmd5').ArrayBuffer.hash
JSZip = require 'jszip'
KeyPad = require('keypad').default

Retro = require('./x-retro').default
retro = document.createElement 'canvas', 'x-retro'
document.body.appendChild retro

draghint = document.getElementById 'draghint'
chooser = document.getElementById 'chooser'

cores =
  gb: 'gambatte'
  gbc: 'gambatte'
  smc: 'snes9x-next'
  fig: 'snes9x-next'
  sfc: 'snes9x-next'
  swc: 'snes9x-next'
  gba: 'vba-next'
  vec: 'vecx'
  mgw: 'gw'
  nes: 'nestopia'

save = ->
  # localForage.setItem retro.md5, retro.save if retro.running

stop = ->
  retro.stop()
  save()

window.addEventListener 'beforeunload', ->
  stop() if retro.player

play = (data, extension) ->
  retro.md5 = md5 rom
  return Promise.all([
    System.import cores[extension]
    # localForage.getItem retro.md5
  ]).then ([core, save]) ->
    retro.inputs = []
    if navigator.getGamepads?
      retro.inputs = navigator.getGamepads()
    if not retro.inputs[0]
      retro.inputs[0] = new KeyPad window,
        9: 8
        13: 9
        16: 8
        18: 1
        32: 0
        37: 14
        38: 12
        39: 15
        40: 13
        65: 1
        66: 0
        68: 15
        73: 3
        74: 2
        75: 0
        76: 1
        82: 5
        83: 13
        87: 12
        88: 3
        89: 2
        90: 3
        91: 2
        222: 8
    retro.core = core
    retro.game = rom if rom
    retro.save = save if save
    retro.start()

load = (file) ->
  [..., extension] = file.name.split '.'
  if cores[extension] or extension is 'zip'
    draghint.classList.add 'hidden'
    reader = new FileReader()
    reader.addEventListener 'load', (event) ->
      rom = null
      if extension is 'zip'
        zip = new JSZip reader.result
        for file in zip.file /.*/ # any way to predict name of file?
          [..., extension] = file.name.split '.'
          if cores[extesion]
            rom = new Uint8Array file.asArrayBuffer()
            break
      else if cores[extension]
        rom = new Uint8Array reader.result
      if rom
        stop() if retro.running
        play rom, extension
        , ->
          draghint.classList.remove 'hidden'
      else
        draghint.classList.remove 'hidden'
    reader.readAsArrayBuffer file

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
