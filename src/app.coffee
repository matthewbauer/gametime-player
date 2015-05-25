unzip = require 'unzip'
streamToBuffer = require 'stream-to-buffer'
createReadStream = require 'filereader-stream'
md5 = require 'MD5'
fs = require 'fs'

toBuffer = require 'typedarray-to-buffer'

retro = require 'node-retro'

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
      Player.unserialize
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
            Player.unserialize
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
