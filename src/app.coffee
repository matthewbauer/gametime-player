fs = require 'fs'

unzip = require 'unzip'
streamToBuffer = require 'stream-to-buffer'
createReadStream = require 'filereader-stream'
md5 = require 'MD5'
toBuffer = require 'typedarray-to-buffer'

retro = require 'node-retro'
getCore = require 'node-retro/get-core'

Player = require './player'
settings = require './settings'

statePath = 'gametime.sav'
getSavePath = (game) -> "gametime#{md5 game}.sav"

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
  input = new Player.Input window, settings.key2joy
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
      .then (core) ->
        if core
          serial.core = core
          load serial
          .then resolve, reject
        else
          reject()
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
    createReadStream file
    .pipe unzip.Parse()
    .on 'entry', (entry) ->
      if entry.type is 'File'
        name = entry.path
        [..., extension] = name.split '.'
        if settings.cores[extension]
          streamToBuffer entry, (err, buffer) ->
            load
              corename: settings.cores[extension][0]
              game: buffer
            .then play
  false

addEventListener 'dragover', (event) ->
  event.preventDefault()
  document.getElementById('draghint').classList.add 'hover'
  false

addEventListener 'dragleave', (event) ->
  event.preventDefault()
  document.getElementById('draghint').classList.remove 'hover'
  false
