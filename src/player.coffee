cores = require('./lib/cores')
buildbot = require('./lib/buildbot')

remote = require('remote')
retro = require('../../lib/retro')

RETRO = retro.RETRO

keyBindings =
  66: RETRO.DEVICE_ID_JOYPAD_B
  89: RETRO.DEVICE_ID_JOYPAD_Y
  65: RETRO.DEVICE_ID_JOYPAD_A
  88: RETRO.DEVICE_ID_JOYPAD_X
  76: RETRO.DEVICE_ID_JOYPAD_L
  82: RETRO.DEVICE_ID_JOYPAD_R
  38: RETRO.DEVICE_ID_JOYPAD_UP
  40: RETRO.DEVICE_ID_JOYPAD_DOWN
  37: RETRO.DEVICE_ID_JOYPAD_LEFT
  39: RETRO.DEVICE_ID_JOYPAD_RIGHT
  222: RETRO.DEVICE_ID_JOYPAD_SELECT
  13: RETRO.DEVICE_ID_JOYPAD_START

toBuffer = (ab) ->
  buffer = new Buffer(ab.byteLength)
  view = new Uint8Array(ab)
  for _, i in buffer
    buffer[i] = view[i]
  buffer

window.addEventListener 'load', (event) ->
  gl = document.getElementById('canvas').getContext('webgl')
  vertexShaderSource = document.getElementById('vertex-shader').text
  fragmentShaderSource = document.getElementById('fragment-shader').text
  audio = new retro.Audio(new window.AudioContext())
  input = new retro.Input(keyBindings)
  video = new retro.Video(gl, vertexShaderSource, fragmentShaderSource)

  play = (gameBuffer, core) ->
    buildbot.getCore core, (corepath) ->
      gl.canvas.classList.remove('hide')
      document.getElementById('draghint').classList.add('hide')

      core = new retro.Core(corepath, audio, input, video)

      window.addEventListener('keyup', input.eventHandler)
      window.addEventListener('keydown', input.eventHandler)
      window.onclose = ->
        core.close()

      core.loadGame(gameBuffer)
      core.start()

  window.ondragover = (event) ->
    event.preventDefault()
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
        play(toBuffer(reader.result), core)
      reader.readAsArrayBuffer(file)
    false
