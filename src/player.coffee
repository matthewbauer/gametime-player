retro = require 'node-retro'
getCore = require 'node-retro/get-core'
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
  variables: {}
  romTemp: 'temp.rom'
  variablesUpdate: false
  overscan: false
  running: false

  constructor: (@gl, @audio, @input, @core, @game, @save) ->
    @initGL()

    @info = @core.getSystemInfo()

    if typeof @game is 'string'
      @core.loadGamePath @game
    else
      if @info.need_fullpath
        fs.writeFileSync @romTemp, @game
        @core.loadGamePath @romTemp
      else
        @core.loadGame @game

    @core.unserialize @save if @save?

    @av_info = @core.getSystemAVInfo()
    @fpsInterval = 1000 / @av_info.timing.fps

    # audio
    @then = 0
    @sampleRate = @av_info.timing.sample_rate
    @bufferSize = 256
    @latency = 96
    @numBuffers = Math.floor @latency * @sampleRate / (1000 * @bufferSize)
    if @numBuffers < 2
      @numBuffers = 2
    i = 0
    @buffers = []
    while i < @numBuffers
      @buffers[i] = @audio.createBuffer 2, @bufferSize, @sampleRate
      i++
    @bufOffset = 0
    @bufIndex = 0

    @core.on 'videorefresh', @videorefresh
    @core.on 'inputstate', @input
    @core.on 'audiosamplebatch', @audiosamplebatch
    @core.on 'log', @log
    @core.on 'environment', @environment

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
    @gl.pixelStorei @gl.UNPACK_FLIP_Y_WEBGL, true

  videorefresh: (data, w, h) =>
    if not @width and not @height
      @width = w
      @height = h
      @gl.canvas.width = @width
      @gl.canvas.height = @height
      @gl.viewport 0, 0, @width, @height
    # slice is used to prevent issues with old buffer being gc'ed
    switch @pixelFormat
      when retro.PIXEL_FORMAT_0RGB1555
        data = new Uint16Array data.slice 0
        format = @gl.RGB
        type = @gl.UNSIGNED_SHORT_5_5_5_1
      when retro.PIXEL_FORMAT_XRGB8888
        data = new Uint8Array data.slice 0
        format = @gl.RGBA
        type = @gl.UNSIGNED_BYTE
      when retro.PIXEL_FORMAT_RGB565
        data = new Uint16Array data.slice 0
        format = @gl.RGB
        type = @gl.UNSIGNED_SHORT_5_6_5
    @gl.texImage2D @gl.TEXTURE_2D, 0, format, w, h, 0, format, type, data
    @gl.drawArrays @gl.TRIANGLES, 0, 6

  audiosamplebatch: (left, right, frames) =>
    i = 0
    while i < @bufIndex
      if @buffers[i].endTime < @audio.currentTime
        [buf] = @buffers.splice i, 1
        @buffers[@numBuffers - 1] = buf
        i--
        @bufIndex--
      i++
    count = 0
    while frames
      fill = @buffers[@bufIndex].length - @bufOffset
      if fill > frames
        fill = frames
      @buffers[@bufIndex].copyToChannel (new Float32Array left,
      count * 4, fill), 0, @bufOffset
      @buffers[@bufIndex].copyToChannel (new Float32Array right,
      count * 4, fill), 1, @bufOffset
      @bufOffset += fill
      count += fill
      frames -= fill
      if @bufOffset == @bufferSize
        if @bufIndex == @numBuffers - 1
          break
        if @bufIndex
          startTime = @buffers[@bufIndex - 1].endTime
        else
          startTime = @audio.currentTime
        @buffers[@bufIndex].endTime = startTime + @buffers[@bufIndex].duration
        source = @audio.createBufferSource()
        source.buffer = @buffers[@bufIndex]
        source.connect @audio.destination
        source.start startTime
        @bufIndex++
        @bufOffset = 0
    count

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

  frame: (now) =>
    return if not @running
    elapsed = now - @then
    if elapsed > @fpsInterval
      @then = now - elapsed % @fpsInterval
      @core.run()
    requestAnimationFrame @frame
  start: ->
    @running = true
    @frame()
  stop: ->
    @running = false
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
        return Player.unserialize serial
        .then resolve, reject
      if serial.corename and not serial.core
        return getCore serial.corename
        .then (core) ->
          if core
            serial.core = core
            Player.unserialize serial
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

  @Input: Input
  @retro: retro
