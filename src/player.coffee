os = require 'os'
fs = require 'fs'

md5 = require 'MD5'

getCore = require 'gametime-core'
retro = require 'node-retro'

module.exports = (window, gl, audio, core, game, settings) ->
  if not fs.existsSync core
    getCore core, (path) ->
      module.exports window, gl, audio, path, game, settings
    return

  @settings = settings
  @joypad = [{} ]
  @keyboard = [{} ]
  @pixelFormat = retro.PIXEL_FORMAT_0RGB1555
  @variablesUpdate = false
  @core = new retro.Core()

  @videorefresh = (data, width, height, pitch) =>
    if width isnt @width or height isnt @height
      @width = width
      @height = height
      gl.canvas.width = width
      gl.canvas.height = height
      gl.viewport 0, 0, width, height
    gl.bindTexture gl.TEXTURE_2D, texture
    gl.pixelStorei gl.UNPACK_FLIP_Y_WEBGL, true
    switch @pixelFormat
      when retro.PIXEL_FORMAT_0RGB1555
        bufferArray = new Uint16Array data.length / 2
        line = 0
        while line < height
          x = 0
          while x < width
            bufferArray[line * width + x] =
              data.readUInt16BE line * pitch + 2 * x
            x++
          line++
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA,
                      gl.UNSIGNED_SHORT_5_5_5_1, bufferArray
      when retro.PIXEL_FORMAT_XRGB8888
        bufferArray = new Uint8Array data.length
        while x < pitch * height
          bufferArray[x] = data.readUInt8 x
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA,
                      gl.UNSIGNED_BYTE, bufferArray
      when retro.PIXEL_FORMAT_RGB565
        bufferArray = new Uint16Array data.length / 2
        line = 0
        while line < height
          x = 0
          while x < width
            bufferArray[line * width + x] =
              data.readUInt16LE line * pitch + 2 * x
            x++
          line++
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
                      gl.UNSIGNED_SHORT_5_6_5, bufferArray
    gl.drawArrays gl.TRIANGLES, 0, 6
  @core.on 'videorefresh', @videorefresh

  @keyHandler = (event) =>
    switch event.type
      when 'keydown'
        if event.which of @settings.key2joy
          @joypad[0][@settings.key2joy[event.which]] = true
        @keyboard[0][event.which] = true
        event.preventDefault()
      when 'keyup'
        if event.which of @settings.key2joy
          @joypad[0][ @settings.key2joy[event.which]] = false
        @keyboard[0][event.which] = false
        event.preventDefault()

  @inputstate = (port, device, idx, id) =>
    switch device
      when retro.DEVICE_JOYPAD
        if port of @joypad
          return @joypad[port][id]
      when retro.DEVICE_KEYBOARD
        return @keyboard[port][id]
  @core.on 'inputstate', @inputstate

  @inputpoll = =>
    gamepads = window.navigator.getGamepads() # non-standard
    for i, gamepad in gamepads
      if gamepad.mapping isnt 'standard' or not gamepad.connected
        continue
      if not i of @joypad
        @joypad[i] = {}
      for j, button in gamepad.buttons
        @joypad[i][@settings.gp2joy[j]] = button.pressed
  @core.on 'inputpoll', @inputpoll

  @audiosamplebatch = (buffer, frames) =>
    source = audio.createBufferSource()
    audioBuffer = audio.createBuffer 2, frames, @sampleRate
    leftBuffer = audioBuffer.getChannelData 0
    rightBuffer = audioBuffer.getChannelData 1
    i = 0
    while i < frames
      leftBuffer[i] = buffer.readFloatLE i * 8
      rightBuffer[i] = buffer.readFloatLE i * 8 + 4
      i++
    source.buffer = audioBuffer
    source.connect audio.destination
    source.start 0
    frames
  @core.on 'audiosamplebatch', @audiosamplebatch

  @audiosample = ->
  @core.on 'audiosample', @audiosample

  @core.on 'log', (level, fmt) -> console.log fmt

  @setVariable = (key, value) =>
    @settings.variables[core][key] = value
    @variablesUpdate = true

  @core.on 'environment', (cmd, value) =>
    switch cmd
      when retro.ENVIRONMENT_SET_VARIABLES
        for key of value
          @settings.variables[key] = value[key].split('; ')[1].split('|')[0]
        true
      when retro.ENVIRONMENT_GET_OVERSCAN
        @settings.overscan
      when retro.ENVIRONMENT_GET_VARIABLE_UPDATE
        if @settings.variablesUpdate
          @settings.variablesUpdate = false
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
        @settings.variables[value]
      when retro.ENVIRONMENT_SET_INPUT_DESCRIPTORS
        true
      else
        console.log "Unknown environment command #{cmd}"
        false

  @running = false

  @savePath = "#{settings.saveDir}/#{@hash}"

  @save = =>
    data = @core.serialize()
    fs.writeFileSync @savePath, data

  @load = =>
    if fs.existsSync(@savePath)
      data = fs.readFileSync(@savePath)
      @core.unserialize(data)

  @run = =>
    if @running
      window.setTimeout @run, @interval # non-standard
      @core.run()

  @start = =>
    @running = true
    @run()

  @stop = =>
    @running = false
    @core.stop()

  @close = =>
    @stop()
    @save()
    @core.close()

  window.addEventListener 'keyup', @keyHandler # non-standard
  window.addEventListener 'keydown', @keyHandler # non-standard

  vertexShader = gl.createShader gl.VERTEX_SHADER
  gl.shaderSource vertexShader, '
  precision mediump float;
  uniform sampler2D u_image;
  varying vec2 v_texCoord;
  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord) ;
  } '
  gl.compileShader vertexShader

  fragmentShader = gl.createShader gl.FRAGMENT_SHADER
  gl.shaderSource fragmentShader, '
  attribute vec2 a_texCoord;
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0, 1) ;
    v_texCoord = a_texCoord;
  } '
  gl.compileShader fragmentShader

  program = gl.createProgram()
  gl.attachShader program, vertexShader
  gl.attachShader program, fragmentShader
  gl.linkProgram program
  gl.useProgram program

  positionLocation = gl.getAttribLocation program, 'a_position'

  buffer = gl.createBuffer()
  gl.bindBuffer gl.ARRAY_BUFFER, buffer
  gl.bufferData gl.ARRAY_BUFFER,
    new Float32Array([ - 1, - 1, 1, - 1, - 1, 1, - 1, 1, 1, - 1, 1, 1]),
    gl.STATIC_DRAW
  gl.enableVertexAttribArray positionLocation
  gl.vertexAttribPointer positionLocation, 2, gl.FLOAT, false, 0, 0
  texCoordLocation = gl.getAttribLocation program, 'a_texCoord'
  texCoordBuffer = gl.createBuffer()
  gl.bindBuffer gl.ARRAY_BUFFER, texCoordBuffer
  gl.bufferData gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW
  gl.enableVertexAttribArray texCoordLocation
  gl.vertexAttribPointer texCoordLocation, 2, gl.FLOAT, false, 0, 0
  texture = gl.createTexture()
  gl.bindTexture gl.TEXTURE_2D, texture
  gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
  gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
  gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR

  @core.loadCore core

  @av_info = @core.getSystemAVInfo()
  @interval = 1000 / @av_info.timing.fps + 3
  @sampleRate = @av_info.timing.sample_rate
  @info = @core.getSystemInfo()
  @hash = md5 game # path's md5 will be used!!!

  if typeof game is 'string'
    @core.loadGamePath game
  else
    if @info.need_fullpath
      fs.writeFileSync settings.romtemp, game
      @core.loadGamePath settings.romtemp
    else
      @core.loadGame game

  @load()
  @start()
  window.gametime = @

  @
