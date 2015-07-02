localForage = require 'localforage'
md5 = require 'MD5'
JSZip = require 'jszip'
Player = require './player.coffee!'

class Input
  states: {}
  constructor: (core, window, @key2joy) ->
    window.addEventListener 'keyup', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][core.DEVICE_JOYPAD] ?= {}
        @states[0][core.DEVICE_JOYPAD][@key2joy[event.which]] = false
      event.preventDefault()
    window.addEventListener 'keydown', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][core.DEVICE_JOYPAD] ?= {}
        @states[0][core.DEVICE_JOYPAD][@key2joy[event.which]] = true
      event.preventDefault()
  state: (port, device, idx, id) =>
    if port of @states
      if device of @states[port]
        return 1 if @states[port][device][id]
    return 0

snes9x_next = require 'snes9x-next'

cores =
  'bsx': [
    snes9x_next
  ]
  'dx2': [
    snes9x_next
  ]
  'fig': [
    snes9x_next
  ]
  'gd3': [
    snes9x_next
  ]
  'gd7': [
    snes9x_next
  ]
  'sfc': [
    snes9x_next
  ]
  'smc': [
    snes9x_next
  ]
  'swc': [
    snes9x_next
  ]

player = null
play = (core, game, save) ->
  document.getElementById('draghint').classList.add 'hidden'
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  gl = canvas.getContext 'webgl'
  audio = new AudioContext()
  key2joy =
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
  input = new Input core, window, key2joy
  player = new Player gl, audio, input.state, core, new Uint8Array(game), save
  player.start()
  #player.stop()

stop = ->
  if player
    #localForage.setItem(md5 player.game, player.core.serialize())
    player.core.unload_game()
    player.core.deinit()
    player = null

addEventListener 'beforeunload', ->
  #if player and player.core
    #localForage.setItem(md5 player.game, player.core.serialize())

addEventListener 'drop', (event) ->
  event.preventDefault()
  file = event.dataTransfer.files[0]
  name = file.name
  [..., extension] = name.split '.'
  if cores[extension] or extension is 'zip'
    reader = new FileReader()
    reader.addEventListener 'load', (event) ->
      rom = null
      if extension is 'zip'
        zip = new JSZip reader.result
        files = zip.file /.*/ # any way to predict name of file?
        for file in files
          [..., extension] = file.name.split '.'
          if cores[extesion]
            rom = file.asArrayBuffer()
            break
      else if cores[extension]
        rom = reader.result
      if rom
        if player
          stop()
        #localForage.getItem(md5 rom).then (save) ->
        play cores[extension][0], rom
        #, console.error
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

#addEventListener 'click', (event) ->
#  document.getElementById('chooser').click()
