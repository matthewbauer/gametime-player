player = require('./player')
settings = require('./settings')
unzip = require('unzip')
remote = require('remote')
app = remote.require('app')
streamToBuffer = require('stream-to-buffer')
createReadStream = require('filereader-stream')

toBuffer = (ab) ->
  buffer = new Buffer(ab.byteLength)
  view = new Uint8Array(ab)
  for _, i in buffer
    buffer[i] = view[i]
  buffer

window.onload = (event) ->
  window.ondragover = (event) ->
    event.preventDefault()
    document.getElementById('draghint').classList.add('hover')
    false

  window.ondragleave = (event) ->
    event.preventDefault()
    document.getElementById('draghint').classList.remove('hover')
    false

  if window.game
    document.getElementById('draghint').classList.add('hidden')
    player.playCore(window, core, window.game, settings)

  window.ondrop = (event) ->
    event.preventDefault()
    file = event.dataTransfer.files[0]
    name = file.name
    [..., extension] = name.split('.')
    if settings.cores[extension]
      window.game = file.path
      #app.setRepresentedFilename(file.path)
      core = settings.cores[extension][0]
      reader = new FileReader()
      reader.addEventListener 'load', (event) ->
        document.getElementById('draghint').classList.add('hidden')
        canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        player(canvas.getContext('webgl'), new AudioContext(),
                core, toBuffer(reader.result), settings)
      reader.readAsArrayBuffer(file)
    else if extension == 'zip'
      window.game = file.path
      #app.setRepresentedFilename(file.path)
      createReadStream(file).pipe(unzip.Parse()).on 'entry', (entry) ->
        if entry.type == 'File'
          name = entry.path
          [..., extension] = name.split('.')
          if settings.cores[extension]
            core = settings.cores[extension][0]
            streamToBuffer(entry, (err, buffer) ->
              document.getElementById('draghint').classList.add('hidden')
              canvas = document.createElement('canvas')
              document.body.appendChild(canvas)
              player(canvas.getContext('webgl'), new AudioContext(),
                      core, buffer, settings)
            )
    false

  window.onbeforeunload = ->
    if window.gametime
      window.gametime.close()
    if window.game
      app.addRecentDocument(window.game)
