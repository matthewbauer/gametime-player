retro = require 'node-retro'
fs = require 'fs'

AudioBuffer::copyToChannel = (source, channelNumber, startInChannel) ->
  @getChannelData(channelNumber|0).set(source, startInChannel|0)

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

# Player:
#  @gl: WebGLContext
#  @audio: AudioContext
#  @input: custom class, see Input for implementation
#  @core: retro.Core
#  @game: buffer of game data or path
#  @save: buffer of save data (optional)
module.exports = class Player
  pixelFormat: retro.PIXEL_FORMAT_0RGB1555
  variablesUpdate: false
  variables: {}
  overscan: false
  romTemp: 'temp.rom'

  constructor: (@gl, @audio, @input, @core, @game, @save) ->
    @initGL()

    @av_info = @core.getSystemAVInfo()
    @interval = Math.ceil(1000 / @av_info.timing.fps)
    @sampleRate = @av_info.timing.sample_rate
    @info = @core.getSystemInfo()

    @core.on 'videorefresh', @videorefresh
    @core.on 'inputstate', @input
    @core.on 'audiosamplebatch', @audiosamplebatch
    @core.on 'log', @log
    @core.on 'environment', @environment

    if typeof @game is "string"
      @core.loadGamePath(@game)
    else
      if @info.need_fullpath
        fs.writeFileSync(@romTemp, @game)
        @core.loadGamePath(@romTemp)
      else
        @core.loadGame(@game)

    @core.unserialize @save if @save?

  initGL: ->
    fragmentShader = @gl.createShader @gl.FRAGMENT_SHADER
    @gl.shaderSource fragmentShader, '
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
    }
    '
    @gl.compileShader fragmentShader

    vertexShader = @gl.createShader @gl.VERTEX_SHADER
    @gl.shaderSource vertexShader, '
    attribute vec2 a_texCoord;
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
    '
    @gl.compileShader vertexShader

    program = @gl.createProgram()
    @gl.attachShader program, vertexShader
    @gl.attachShader program, fragmentShader
    @gl.linkProgram program
    @gl.useProgram program

    positionLocation = @gl.getAttribLocation program, 'a_position'
    buffer = @gl.createBuffer()
    @gl.bindBuffer @gl.ARRAY_BUFFER, buffer

    pArray = new Float32Array [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    @gl.bufferData @gl.ARRAY_BUFFER, pArray, @gl.STATIC_DRAW
    @gl.enableVertexAttribArray positionLocation
    @gl.vertexAttribPointer positionLocation, 2, @gl.FLOAT, false, 0, 0

    texCoordLocation = @gl.getAttribLocation program, 'a_texCoord'
    texCoordBuffer = @gl.createBuffer()
    @gl.bindBuffer @gl.ARRAY_BUFFER, texCoordBuffer

    texArray = new Float32Array [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]
    @gl.bufferData @gl.ARRAY_BUFFER, texArray, @gl.STATIC_DRAW
    @gl.enableVertexAttribArray texCoordLocation
    @gl.vertexAttribPointer texCoordLocation, 2, @gl.FLOAT, false, 0, 0

    @texture = @gl.createTexture()
    @gl.bindTexture @gl.TEXTURE_2D, @texture
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_S, @gl.CLAMP_TO_EDGE
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_T, @gl.CLAMP_TO_EDGE
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MIN_FILTER, @gl.LINEAR

  videorefresh: (data, width, height) =>
    if width isnt @width or height isnt @height
      @width = width
      @height = height
      @gl.canvas.width = width
      @gl.canvas.height = height
      @gl.viewport 0, 0, width, height
    @gl.pixelStorei @gl.UNPACK_FLIP_Y_WEBGL, true
    # slice is used to prevent issues with old buffer being gc'ed
    switch @pixelFormat
      when retro.PIXEL_FORMAT_0RGB1555
        @gl.texImage2D @gl.TEXTURE_2D, 0, @gl.RGBA, width, height, 0, @gl.RGBA,
        @gl.UNSIGNED_SHORT_5_5_5_1, new Uint16Array(data.slice(0))
      when retro.PIXEL_FORMAT_XRGB8888
        @gl.texImage2D @gl.TEXTURE_2D, 0, @gl.RGBA, width, height, 0, @gl.RGBA,
        @gl.UNSIGNED_BYTE, new Uint8Array(data.slice(0))
      when retro.PIXEL_FORMAT_RGB565
        @gl.texImage2D @gl.TEXTURE_2D, 0, @gl.RGB, width, height, 0, @gl.RGB,
        @gl.UNSIGNED_SHORT_5_6_5, new Uint16Array(data.slice(0))
    @gl.drawArrays @gl.TRIANGLES, 0, 6

  audiosamplebatch: (left, right, frames) =>
    source = @audio.createBufferSource()
    audioBuffer = @audio.createBuffer 2, frames, @sampleRate
    audioBuffer.copyToChannel new Float32Array(left), 0
    audioBuffer.copyToChannel new Float32Array(right), 1
    source.buffer = audioBuffer
    source.connect @audio.destination
    source.start 0
    frames

  setVariable: (key, value) ->
    @variables[core][key] = value
    @variablesUpdate = true

  log: (level, msg) ->
    console.log msg

  environment: (cmd, value) =>
    switch cmd
      when retro.ENVIRONMENT_GET_OVERSCAN
        @overscan
      when retro.ENVIRONMENT_GET_VARIABLE_UPDATE
        if @variablesUpdate
          @variablesUpdate = false
          return true
        false
      when retro.ENVIRONMENT_SET_PIXEL_FORMAT
        @pixelFormat = value
        true
      when retro.ENVIRONMENT_GET_CAN_DUPE
        true
      when retro.ENVIRONMENT_GET_SYSTEM_DIRECTORY
        '.'
      when retro.ENVIRONMENT_GET_VARIABLE
        @variables[value]
      when retro.ENVIRONMENT_SET_INPUT_DESCRIPTORS
        true
      else
        console.log "Unknown environment command #{cmd}"
        false

  start: ->
    @core.start @interval

  stop: ->
    @core.stop()

  deinit: ->
    @stop()

  serialize: (state) ->
    serial =
      corename: @core.name
      save: @core.serialize().toString 'binary'
    if @gamepath
      serial.gamepath = @game
    else
      serial.game = @game.toString 'binary'
    serial

  @unserialize: (serial) ->
    new Promise (resolve, reject) ->
      if serial.corepath and not serial.core
        serial.core = new retro.Core serial.corepath
        return Player.unserialize(serial).then resolve, reject
      if serial.corename and not serial.core
        return retro.getCore(serial.corename).then (core) ->
          if core
            serial.core = core
            Player.unserialize(serial).then resolve, reject
          else
            reject()
      if serial.game and typeof serial.game is 'string'
        serial.game = new Buffer serial.game, 'binary'
      if serial.save and typeof serial.save is 'string'
        serial.save = new Buffer serial.save, 'binary'
      if serial.core and serial.game
        return resolve [serial.core, serial.game, serial.save]
      reject()

  @Input: Input
  @retro: retro
