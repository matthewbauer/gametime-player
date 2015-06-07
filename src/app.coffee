fs = require 'fs'

md5 = require 'MD5'
toBuffer = require 'typedarray-to-buffer'

retro = require 'node-retro'
{getCore} = require 'gametime-retro'

Player = require './player'
settings = require './settings'

statePath = 'gametime.sav'
getSavePath = (game) -> "gametime#{md5 game}.sav"

class Input
  states: {}
  constructor: (window, @key2joy) ->
    window.addEventListener 'keyup', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][retro.DEVICE_JOYPAD] ?= {}
        @states[0][retro.DEVICE_JOYPAD][@key2joy[event.which]] = false
      event.preventDefault()
    window.addEventListener 'keydown', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][retro.DEVICE_JOYPAD] ?= {}
        @states[0][retro.DEVICE_JOYPAD][@key2joy[event.which]] = true
      event.preventDefault()
  state: (port, device, idx, id) =>
    if port of @states
      if device of @states[port]
        return 1 if @states[port][device][id]
    return 0

player = null
play = ([core, game, save]) ->
  if not save
    savePath = getSavePath game
    if fs.existsSync savePath
      save = fs.readFileSync savePath
  document.getElementById('draghint').classList.add 'hidden'
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  gl = canvas.getContext 'webgl'
  audio = new AudioContext()
  input = new Input window, settings.key2joy
  player = new Player gl, audio, input.state, core, game, save
  player.start()

load = (serial) ->
  new Promise (resolve, reject) ->
    if serial.corepath and not serial.core
      serial.core = new retro.Core serial.corepath
      return load serial
      .then resolve, reject
    if serial.corename and not serial.core
      return getCore serial.corename
      .then (path) ->
        if not path
          reject()
        serial.corepath = path
        load serial
        .then resolve, reject
    if serial.game and typeof serial.game is 'string'
      serial.game = new Buffer serial.game, 'binary'
    if serial.save and typeof serial.save is 'string'
      serial.save = new Buffer serial.save, 'binary'
    if serial.core and serial.game
      return resolve [serial.core, serial.game, serial.save]
    reject()

addEventListener 'beforeunload', ->
  if player and player.core
    fs.writeFileSync (getSavePath player.game), player.core.serialize()

addEventListener 'drop', (event) ->
  event.preventDefault()
  file = event.dataTransfer.files[0]
  name = file.name
  [..., extension] = name.split '.'
  if settings.cores[extension]
    reader = new FileReader()
    reader.addEventListener 'load', (event) ->
      load
        corename: settings.cores[extension][0]
        game: toBuffer reader.result
        gamepath: file.path
      .then play
    reader.readAsArrayBuffer file
  else if extension is 'zip'
    reader = new FileReader()
    reader.addEventListener 'load', (event) ->
      zip = new JSZip reader.result
      files = zip.file /.*/
      rom = null
      for file in files
        [..., extension] = file.name.split '.'
        if settings.cores[extesion]
          rom = file
          break
      if rom is not null
        load
          corename: settings.cores[extension][0]
          game: file.asNodeBuffer()
          gamepath: file.path
        .then play
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
