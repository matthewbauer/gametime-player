retro = require('node-retro')
md5 = require('MD5')

getCore = require('gametime-core')

os = require('os')
fs = require('fs')

module.exports = (window, core, game, settings) ->
  if not fs.existsSync(core)
    getCore core, (path) ->
      module.exports(window, path, game, settings)
    return

  @settings = settings

  canvas = window.document.createElement('canvas')
  window.document.body.appendChild(canvas)

  gl = canvas.getContext('webgl')

  vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, settings.vertexShaderSource)
  gl.compileShader(vertexShader)

  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, settings.fragmentShaderSource)
  gl.compileShader(fragmentShader)

  program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  gl.useProgram(program)
  positionLocation = gl.getAttribLocation(program, 'a_position')

  buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData gl.ARRAY_BUFFER,
    new Float32Array([
           - 1.0, - 1.0,
       1.0, - 1.0,
           - 1.0, 1.0,
           - 1.0, 1.0,
       1.0, - 1.0,
       1.0, 1.0]), gl.STATIC_DRAW
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')

  texCoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
  gl.bufferData gl.ARRAY_BUFFER,
    new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0]), gl.STATIC_DRAW
  gl.enableVertexAttribArray(texCoordLocation)
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

  texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

  @pixelFormat = retro.PIXEL_FORMAT_0RGB1555

  @core = new retro.Core()

  @videorefresh = (data, width, height, pitch) =>
    if width isnt @width or height isnt @height
      @width = width
      @height = height
      gl.viewport(0, 0, width, height)
      canvas.width = width
      canvas.height = height
      window.resizeTo(width, height)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    switch @pixelFormat
      when retro.PIXEL_FORMAT_0RGB1555
        bufferArray = new Uint16Array(data.length / 2)
        line = 0
        while line < height
          x = 0
          while x < width
            bufferArray[line * width + x] = data.readUInt16BE(line * pitch + 2 * x)
            x++
          line++
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                      gl.RGBA, gl.UNSIGNED_SHORT_5_5_5_1, bufferArray
      when retro.PIXEL_FORMAT_XRGB8888
        bufferArray = new Uint8Array(data.length)
        while x < pitch * height
          bufferArray[x] = data.readUInt8(x)
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                      gl.RGBA, gl.UNSIGNED_BYTE, bufferArray
      when retro.PIXEL_FORMAT_RGB565
        bufferArray = new Uint16Array(data.length / 2)
        line = 0
        while line < height
          x = 0
          while x < width
            bufferArray[line * width + x] = data.readUInt16LE(line * pitch + 2 * x)
            x++
          line++
        gl.texImage2D gl.TEXTURE_2D, 0, gl.RGB, width, height, 0,
                      gl.RGB, gl.UNSIGNED_SHORT_5_6_5, bufferArray
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  @core.on 'videorefresh', @videorefresh

  @joypad = [{} ]
  @keyboard = [{} ]

  @keyHandler = (event) =>
    switch event.type
      when 'keydown'
        if event.which of @settings.key2joy
          @joypad[0][@settings.key2joy[event.which]] = true
        @keyboard[0][event.which] = true
        event.preventDefault()
      when 'keyup'
        if event.which of @settings.key2joy
          @joypad[0][@settings.key2joy[event.which]] = false
        @keyboard[0][event.which] = false
        event.preventDefault()
  window.addEventListener('keyup', @keyHandler)
  window.addEventListener('keydown', @keyHandler)

  @inputstate = (port, device, idx, id) =>
    switch device
      when retro.DEVICE_JOYPAD
        if port of @joypad
          return @joypad[port][id]
      when retro.DEVICE_KEYBOARD
        return @keyboard[port][id]
  @core.on 'inputstate', @inputstate

  @inputpoll = ->
    gamepads = window.navigator.getGamepads()
    for i, gamepad in gamepads
      if not gamepad.mapping == 'standard' or not gamepad.connected
        continue
      if not i of @joypad
        @joypad[i] = {}
      for j, button in gamepad.buttons
        @joypad[i][@settings.gp2joy[j]] = button.pressed
  @core.on 'inputpoll', @inputpoll

  @audio = new window.AudioContext()

  @audiosamplebatch = (buffer, frames) =>
    source = @audio.createBufferSource()
    audioBuffer = @audio.createBuffer(2, frames, @sampleRate)
    leftBuffer = audioBuffer.getChannelData(0)
    rightBuffer = audioBuffer.getChannelData(1)
    i = 0
    while i < frames
      leftBuffer[i] = buffer.readFloatLE(i * 8)
      rightBuffer[i] = buffer.readFloatLE(i * 8 + 4)
      i++
    source.buffer = audioBuffer
    source.connect(@audio.destination)
    source.start(0)
    return frames
  @core.on 'audiosamplebatch', @audiosamplebatch

  @audiosample = ->
  @core.on 'audiosample', @audiosample

  @core.on 'log', (level, fmt) -> console.log(fmt)

  @variablesUpdate = false

  @setVariable = (key, value) =>
    @settings.variables[core][key] = value
    @variablesUpdate = true

  @core.on 'environment', (cmd, value) =>
    switch cmd
      when retro.ENVIRONMENT_SET_VARIABLES
        for key of value
          @settings.variables[key] = value[key].split('; ')[1].split('|')[0]
        return true
      when retro.ENVIRONMENT_GET_OVERSCAN
        return @settings.overscan
      when retro.ENVIRONMENT_GET_VARIABLE_UPDATE
        if @settings.variablesUpdate
          @settings.variablesUpdate = false
          return true
        return false
      when retro.ENVIRONMENT_SET_PIXEL_FORMAT
        @pixelFormat = value
        return true
      when retro.ENVIRONMENT_GET_CAN_DUPE
        return true
      when retro.ENVIRONMENT_GET_SYSTEM_DIRECTORY
        return '.'
      when retro.ENVIRONMENT_GET_VARIABLE
        return @settings.variables[value]
      when retro.ENVIRONMENT_SET_INPUT_DESCRIPTORS
        return true
      else
        console.log('Unknown environment command ' + cmd)
        return false

  @running = false

  @save = =>
    path = settings.saveDir + '/' + @hash
    data = @core.serialize()
    fs.writeFileSync(path, data)

  @load = =>
    path = settings.saveDir + '/' + @hash
    if fs.existsSync(path)
      data = fs.readFileSync(path)
      @core.unserialize(data)

  @start = =>
    @running = true
    @loop = setInterval(@core.run, @interval)

  @stop = =>
    clearInterval(@loop)
    @running = false

  @close = =>
    @stop()
    @save()
    @core.close()

  @core.loadCore(core)

  @av_info = @core.getSystemAVInfo()
  @interval = 1000 / @av_info.timing.fps
  @sampleRate = @av_info.timing.sample_rate
  @info = @core.getSystemInfo()

  @hash = md5(game) # use path if provided

  if typeof game is "string"
    @core.loadGamePath(game)
  else
    if @info.need_fullpath
      fs.writeFileSync(settings.romtemp, game)
      @core.loadGamePath(settings.romtemp)
    else
      @core.loadGame(game)

  @load()

  @start()

  window.gametime = @

  @
