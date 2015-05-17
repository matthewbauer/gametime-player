unzip = require 'unzip'
streamToBuffer = require 'stream-to-buffer'
createReadStream = require 'filereader-stream'
md5 = require 'MD5'
fs = require 'fs'

retro = require 'node-retro'

Player = require './player'
settings = require './settings'

toBuffer = (ab) ->
  buffer = new Buffer ab.byteLength
  view = new Uint8Array ab
  for _, i in buffer
    buffer[i] = view[i]
  buffer

player = null
play = ([core, game, save]) ->
  document.getElementById('draghint').classList.add 'hidden'
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  gl = canvas.getContext 'webgl'
  audio = new AudioContext()
  input = new Player.Input window, settings.key2joy
  player = new Player gl, audio, input.state, core, game, save
  player.start()

statePath = 'gametime.sav'
getSavePath = (game) -> "gametime#{md5 game}.sav"

window.onbeforeunload = ->
  if player
    fs.writeFileSync statePath, JSON.stringify player.serialize()
    if player.core
      fs.writeFileSync getSavePath player.game, player.core.serialize()
if fs.existsSync statePath
  Player.unserialize(JSON.parse fs.readFileSync savePath).then play

window.onload = (event) ->
  window.ondrop = (event) ->
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

  window.ondragover = (event) ->
    event.preventDefault()
    document.getElementById('draghint').classList.add 'hover'
    false

  window.ondragleave = (event) ->
    event.preventDefault()
    document.getElementById('draghint').classList.remove 'hover'
    false
