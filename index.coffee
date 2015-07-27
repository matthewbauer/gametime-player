localForage = require 'localforage'
md5 = require 'MD5'
JSZip = require 'jszip'
KeyPad = require('keypad').default

Retro = require('./x-retro').default
retro = document.createElement 'canvas', 'x-retro'
document.body.appendChild retro

draghint = document.getElementById 'draghint'
chooser = document.getElementById 'chooser'

cores =
  nes: 'fceumm'
  fds: 'fceumm'
  gb: 'gambatte'
  gbc: 'gambatte'
  mgw: 'gw'
  smc: 'snes9x-next'
  fig: 'snes9x-next'
  sfc: 'snes9x-next'
  swc: 'snes9x-next'
  gba: 'vba-next'
  vec: 'vecx'

play = (core, game, save) ->
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  gl = canvas.getContext 'webgl'
  audio = new AudioContext()
  input = new KeyboardInput window,
    32: core.DEVICE_ID_JOYPAD_B
    91: core.DEVICE_ID_JOYPAD_Y
    18: core.DEVICE_ID_JOYPAD_A
    90: core.DEVICE_ID_JOYPAD_X
    66: core.DEVICE_ID_JOYPAD_B
    89: core.DEVICE_ID_JOYPAD_Y
    65: core.DEVICE_ID_JOYPAD_A
    88: core.DEVICE_ID_JOYPAD_X
    76: core.DEVICE_ID_JOYPAD_L
    82: core.DEVICE_ID_JOYPAD_R
    222: core.DEVICE_ID_JOYPAD_SELECT
    13: core.DEVICE_ID_JOYPAD_START
    16: core.DEVICE_ID_JOYPAD_SELECT
    9: core.DEVICE_ID_JOYPAD_SELECT
    73: core.DEVICE_ID_JOYPAD_X
    74: core.DEVICE_ID_JOYPAD_Y
    75: core.DEVICE_ID_JOYPAD_B
    76: core.DEVICE_ID_JOYPAD_A
    38: core.DEVICE_ID_JOYPAD_UP
    40: core.DEVICE_ID_JOYPAD_DOWN
    37: core.DEVICE_ID_JOYPAD_LEFT
    39: core.DEVICE_ID_JOYPAD_RIGHT
    87: core.DEVICE_ID_JOYPAD_UP
    83: core.DEVICE_ID_JOYPAD_DOWN
    65: core.DEVICE_ID_JOYPAD_LEFT
    68: core.DEVICE_ID_JOYPAD_RIGHT
  new Player gl, audio, [input], core, game, save

player = null

save = ->
  localForage.setItem (md5 player.game), player.core.serialize() if player

stop = ->
  retro.stop()
  save()
  player.core.unload_game()
  player.core.deinit()
  player = null

window.setInterval save, 10000

window.addEventListener 'beforeunload', ->
  stop() if player

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
        return Promise.all([
          System.import cores[extension]
          localForage.getItem md5 rom
        ]).then ([core, save]) ->
          input = new KeyPad window,
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
          retro.inputs.push input
          retro.core = core
          retro.rom = rom if rom
          retro.save = save if save
          retro.start()
        , ->
          draghint.classList.remove 'hidden'
      else
        draghint.classList.remove 'hidden'
    reader.readAsArrayBuffer file

addEventListener 'drop', (event) ->
  event.preventDefault()
  draghint.classList.remove 'hover'
  if event.dataTransfer.files.length > 0
    load event.dataTransfer.files[0]
  false

addEventListener 'dragover', (event) ->
  event.preventDefault()
  draghint.classList.add 'hover'
  false

addEventListener 'dragleave', (event) ->
  event.preventDefault()
  draghint.classList.remove 'hover'
  false

addEventListener 'click', (event) ->
  if not draghint.classList.contains 'hidden'
    draghint.classList.add 'hover'
    chooser.click()
  else if retro.running
    retro.stop()
  else
    retro.start()

addEventListener 'focus', () ->
  draghint.classList.remove 'hover'

chooser.addEventListener 'change', ->
  draghint.classList.remove 'hover'
  load this.files[0]
