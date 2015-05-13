unzip = require 'unzip'
remote = require 'remote'
app = remote.require 'app'
streamToBuffer = require 'stream-to-buffer'
createReadStream = require 'filereader-stream'

player = require './player'
settings = require './settings'

toBuffer = (ab) ->
  buffer = new Buffer ab.byteLength
  view = new Uint8Array ab
  for _, i in buffer
    buffer[i] = view[i]
  buffer

window.onload = (event) ->
  hint = document.getElementById('draghint')

  window.ondragover = (event) ->
    event.preventDefault()
    hint.classList.add 'hover'
    false

  window.ondragleave = (event) ->
    event.preventDefault()
    hint.classList.remove 'hover'
    false

  if window.game
    hint.classList.add 'hidden'
    player window, core, window.game, settings

  play = (buffer) ->
    core = settings.cores[extension][0]
    hint.classList.add 'hidden'
    canvas = document.createElement 'canvas'
    document.body.appendChild canvas
    gl = canvas.getContext 'webgl'
    audio = new AudioContext()
    player window, gl, audio, core, buffer, settings

  window.ondrop = (event) ->
    event.preventDefault()
    file = event.dataTransfer.files[0]
    name = file.name
    [..., extension] = name.split '.'
    if settings.cores[extension]
      window.game = file.path
      core = settings.cores[extension][0]
      reader = new FileReader()
      reader.addEventListener 'load', (event) -> play toBuffer reader.result
      reader.readAsArrayBuffer file
    else if extension is 'zip'
      window.game = file.path
      createReadStream(file).pipe(unzip.Parse()).on 'entry', (entry) ->
        if entry.type is 'File'
          name = entry.path
          [..., extension] = name.split('.')
          if settings.cores[extension]
            streamToBuffer entry, (err, buffer) -> play buffer
    false

  window.onbeforeunload = ->
    if window.gametime
      window.gametime.close()
    if window.game
      app.addRecentDocument window.game
