cores = require('./cores')
buildbot = require('./buildbot')
easyretro = require('./easyplayer')
settings = require('./settings')
unzip = require('unzip')
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

  window.ondrop = (event) ->
    event.preventDefault()
    file = event.dataTransfer.files[0]
    name = file.name
    [..., extension] = name.split('.')
    if cores[extension]
      core = cores[extension][0]
      reader = new FileReader()
      reader.addEventListener 'load', (event) ->
        document.getElementById('draghint').classList.add('hidden')
        easyretro.playCore(window, core, toBuffer(reader.result), settings)
      reader.readAsArrayBuffer(file)
    else if extension == 'zip'
      createReadStream(file).pipe(unzip.Parse()).on 'entry', (entry) ->
        if entry.type == 'File'
          name = entry.path
          [..., extension] = name.split('.')
          if cores[extension]
            core = cores[extension][0]
            streamToBuffer(entry, (err, buffer) ->
              document.getElementById('draghint').classList.add('hidden')
              easyretro.playCore(window, core, buffer, settings)
            )
    false
