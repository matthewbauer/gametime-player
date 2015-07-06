localForage = require 'localforage'
md5 = require 'MD5'
JSZip = require 'jszip'
Player = require './player.coffee!'

class KeyboardInput
  constructor: (window, @keys) ->
    window.addEventListener 'keyup', (event) =>
      if event.which of @keys
        @[@keys[event.which]] = false
        event.preventDefault()
    window.addEventListener 'keydown', (event) =>
      if event.which of @keys
        @[@keys[event.which]] = true
        event.preventDefault()

cores =
  ri: 'bluemsx'
  mx1: 'bluemsx'
  mx2: 'bluemsx'
  col: 'bluemsx'
  sg: 'bluemsx'
  sc: 'bluemsx'
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
  gen: 'picodrive'
  smd: 'picodrive'
  md: 'picodrive'
  sms: 'picodrive'
  '32x': 'picodrive'

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

stop = ->
  if player
    localForage.setItem(md5 player.game, player.core.serialize())
    player.core.unload_game()
    player.core.deinit()
    player = null

addEventListener 'beforeunload', ->
  stop() if player and player.core

addEventListener 'drop', (event) ->
  event.preventDefault()
  document.getElementById('draghint').classList.remove 'hover'
  file = event.dataTransfer.files[0]
  name = file.name
  [..., extension] = name.split '.'
  if cores[extension] or extension is 'zip'
    document.getElementById('draghint').classList.add 'hidden'
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
        stop() if player
        return Promise.all([
          System.import(cores[extension])
          localForage.getItem md5 rom
        ]).then ([core, save]) ->
          player = play core, rom, save
          player.start()
        , ->
          document.getElementById('draghint').classList.remove 'hidden'
      else
        document.getElementById('draghint').classList.remove 'hidden'
    reader.readAsArrayBuffer file
  false

addEventListener 'dragover', (event) ->
  event.preventDefault()
  document.getElementById('draghint').classList.add 'hover'
  false

addEventListener 'dragleave', (event) ->
  event.preventDefault()
  document.getElementById('draghint').classList.remove 'hover'
  false

addEventListener 'click', (event) ->
  document.getElementById('chooser').click() if not player
