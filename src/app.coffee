unzip = require 'unzip'
streamToBuffer = require 'stream-to-buffer'
createReadStream = require 'filereader-stream'
md5 = require 'MD5'
fs = require 'fs'

retro = require 'node-retro'

GamePlayer = require './player'
settings = require './settings'

toBuffer = (ab) ->
  buffer = new Buffer ab.byteLength
  view = new Uint8Array ab
  for _, i in buffer
    buffer[i] = view[i]
  buffer

class Input
  states: {}
  constructor: (@key2joy) ->
    addEventListener 'keyup', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][retro.DEVICE_JOYPAD] ?= {}
        @states[0][retro.DEVICE_JOYPAD][0] ?= {}
        @states[0][retro.DEVICE_JOYPAD][0][@key2joy[event.which]] = false
      event.preventDefault()
    addEventListener 'keydown', (event) =>
      if event.which of @key2joy
        @states[0] ?= {}
        @states[0][retro.DEVICE_JOYPAD] ?= {}
        @states[0][retro.DEVICE_JOYPAD][0] ?= {}
        @states[0][retro.DEVICE_JOYPAD][0][@key2joy[event.which]] = true
      event.preventDefault()
  state: (port, device, idx, id) =>
    if port of @states
      if device of @states[port]
        if idx of @states[port][device]
          if id of @states[port][device][idx]
            if @states[port][device][idx][id]
              return 1
    0

player = null

ipc = require 'ipc'

state = {}

savePath = 'serial.sav'
serialize = (state) ->
  serial = {}
  serial.corename = state.corename
  serial.game = state.game.toString 'binary'
  serial.save = state.save.toString 'binary'
  serial

save = ->
  if player
    state.save = player.core.serialize()
  fs.writeFileSync savePath, JSON.stringify serialize state

unserialize = (serial) ->
  new Promise (resolve, reject) ->
    if typeof serial.game is "string"
      serial.game = new Buffer serial.game, 'binary'
    if typeof serial.save is "string"
      serial.save = new Buffer serial.save, 'binary'
    if serial.corepath and not serial.core
      serial.core = new retro.Core(serial.corepath)
      return unserialize(serial).then resolve, reject
    if serial.corename and not serial.core
      return retro.getCore(serial.corename).then (core) ->
        serial.core = core
        unserialize(serial).then resolve, reject
    if serial.gamepath and not serial.game
      return fs.readFile serial.path, (err, data) ->
        if err
          reject()
        else
          serial.game = data
          unserialize(serial).then resolve, reject
    if serial.savepath and not serial.save
      return fs.readFile serial.savepath, (err, data) ->
        if err
          reject()
        else
          serial.save = data
          unserialize(serial).then resolve, reject
    if serial.core and serial.game
      return resolve serial
    reject()

load = ->
  new Promise (resolve, reject) ->
    fs.exists savePath, (exists) ->
      if exists
        fs.readFile savePath, (err, data) ->
          if err
            reject()
          else
            unserialize(JSON.parse data).then resolve, reject
      else
        reject()

window.onbeforeunload = ->
  save()
  player?.deinit()

play = (core, game, save) ->
  state.core = core
  state.game = game
  state.save = save
  document.getElementById('draghint').classList.add 'hidden'
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  gl = canvas.getContext 'webgl'
  audio = new AudioContext()
  input = new Input settings.key2joy
  player = new GamePlayer gl, audio, input.state, core, game, save
  player.start()

if fs.existsSync savePath
  load().then (_state) ->
    state = _state
    play state.core, state.game, state.save

window.onload = (event) ->
  hint = document.getElementById 'draghint'

  window.ondragover = (event) ->
    event.preventDefault()
    hint.classList.add 'hover'
    false

  window.ondragleave = (event) ->
    event.preventDefault()
    hint.classList.remove 'hover'
    false

  window.ondrop = (event) ->
    event.preventDefault()
    file = event.dataTransfer.files[0]
    name = file.name
    [..., extension] = name.split '.'
    if settings.cores[extension]
      reader = new FileReader()
      reader.addEventListener 'load', (event) ->
        state.corename = settings.cores[extension][0]
        retro.getCore settings.cores[extension][0]
        .then (core) ->
          buffer = toBuffer reader.result
          play core, buffer
      reader.readAsArrayBuffer file
    else if extension is 'zip'
      createReadStream file
      .pipe unzip.Parse()
      .on 'entry', (entry) ->
        if entry.type is 'File'
          name = entry.path
          [..., extension] = name.split '.'
          if settings.cores[extension]
            streamToBuffer entry, (err, buffer) ->
              state.corename = settings.cores[extension][0]
              retro.getCore settings.cores[extension][0]
              .then (core) ->
                play core, buffer
    false
