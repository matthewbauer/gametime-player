requestAnimationFrame = require('window').requestAnimationFrame
cancelAnimationFrame = require('window').cancelAnimationFrame

# Player:
#  @gl: WebGLContext
#  @audio: AudioContext
#  @input: custom class, see Input for implementation
#  @core: retro.Core
#  @game: ArrayBuffer of game data or path (optional)
#  @save: ArrayBuffer of save data (optional)
module.exports = class Player
  update: false
  overscan: false
  can_dupe: true
  latency: 90
  bufferSize: 2480

  constructor: (@gl, @audio, @inputs, @core, @game, @save) ->
    @initGL()

    @pixelFormat = @core.PIXEL_FORMAT_0RGB1555

    @core.print = (args) ->
      console.log args

    @core.printErr = (args) ->
      console.error args

    @core.set_environment @environment
    @core.set_video_refresh @video_refresh
    @core.set_audio_sample @audio_sample
    @core.set_audio_sample_batch @audio_sample_batch
    @core.set_input_state @input_state
    @core.set_input_poll @input_poll

    @then = 0
    @core.init()

    @av_info = @core.get_system_av_info()

    @fpsInterval = 1000 / @av_info.timing.fps

    @initAudio()

    @core.load_game @game if @game?
    @core.unserialize @save if @save?

  initAudio: ->
    @then = 0
    @sampleRate = @av_info.timing.sample_rate
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
    @destination = @audio.createGain()
    @destination.gain.value = 1
    @destination.connect @audio.destination

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

    @gl.bufferData @gl.ARRAY_BUFFER, (new Float32Array [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), @gl.STATIC_DRAW
    @gl.enableVertexAttribArray positionLocation
    @gl.vertexAttribPointer positionLocation, 2, @gl.FLOAT, false, 0, 0

    texCoordLocation = @gl.getAttribLocation program, 'a_texCoord'
    texCoordBuffer = @gl.createBuffer()
    @gl.bindBuffer @gl.ARRAY_BUFFER, texCoordBuffer

    @gl.bufferData @gl.ARRAY_BUFFER, (new Float32Array [
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]), @gl.STATIC_DRAW
    @gl.enableVertexAttribArray texCoordLocation
    @gl.vertexAttribPointer texCoordLocation, 2, @gl.FLOAT, false, 0, 0

    @texture = @gl.createTexture()
    @gl.bindTexture @gl.TEXTURE_2D, @texture
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_S, @gl.CLAMP_TO_EDGE
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_WRAP_T, @gl.CLAMP_TO_EDGE
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MIN_FILTER, @gl.NEAREST
    @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MAG_FILTER, @gl.NEAREST
    @gl.pixelStorei @gl.UNPACK_FLIP_Y_WEBGL, true

  input_state: (port, device, index, id) =>
    if id == @core.DEVICE_ID_JOYPAD_LEFT && @inputs[port]?.axes?[0] < -.5
      return true
    if id == @core.DEVICE_ID_JOYPAD_RIGHT && @inputs[port]?.axes?[0] > .5
      return true
    if id == @core.DEVICE_ID_JOYPAD_UP && @inputs[port]?.axes?[1] < -.5
      return true
    if id == @core.DEVICE_ID_JOYPAD_DOWN && @inputs[port]?.axes?[1] > .5
      return true
    @inputs[port]?.buttons[{
      0: 0
      1: 2
      2: 8
      3: 9
      4: 12
      5: 13
      6: 14
      7: 15
      8: 1
      9: 3
      10: 4
      11: 5
      12: 6
      13: 7
      14: 10
      15: 11
    }[id]]?.pressed

  audio_sample: ->

  input_poll: ->

  video_refresh: (data, @width, @height, pitch) =>
    @gl.canvas.width = @width
    @gl.canvas.height = @height
    switch @pixelFormat
      when @core.PIXEL_FORMAT_0RGB1555
        type = @gl.UNSIGNED_SHORT_5_5_5_1
        format = @gl.RGBA
        _data = new Uint16Array data.length
        for pixel, i in data
          _data[i] = pixel & 0b1000000000000000 >> 15 | pixel & 0b01111100000000000 << 1 | pixel & 0b0000001111100000 << 1 | pixel & 0b0000000000011111 << 1
        @gl.viewport 0, 0, pitch / 2, @height
        @gl.texImage2D @gl.TEXTURE_2D, 0, format, pitch / 2, @height, 0, format, type, _data
      when @core.PIXEL_FORMAT_XRGB8888
        type = @gl.UNSIGNED_BYTE
        format = @gl.RGBA
        data = new Uint8Array data
        _data = new Uint8Array pitch * @height
        for i in [0...pitch*@height] by 4
          _data[i] = data[i+3]
          _data[i+1] = data[i]
          _data[i+2] = data[i+2]
        @gl.viewport 0, 0, @width, @height
        @gl.texImage2D @gl.TEXTURE_2D, 0, format, @width / 2, @height, 0, format, type, _data
      when @core.PIXEL_FORMAT_RGB565
        type = @gl.UNSIGNED_SHORT_5_6_5
        format = @gl.RGB
        @gl.viewport 0, 0, pitch / 2, @height
        @gl.texImage2D @gl.TEXTURE_2D, 0, format, pitch / 2, @height, 0, format, type, data
    @gl.drawArrays @gl.TRIANGLES, 0, 6

  audio_sample_batch: (left, right, frames) =>
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
      if @bufOffset + fill >= @bufferSize
        if @bufIndex >= @numBuffers - 1
          break
        if @bufIndex
          startTime = @buffers[@bufIndex - 1].endTime
        else
          startTime = @audio.currentTime
        @buffers[@bufIndex].endTime = startTime + @buffers[@bufIndex].duration
        source = @audio.createBufferSource()
        source.buffer = @buffers[@bufIndex]
        source.connect @destination
        source.start startTime
        @bufIndex++
        @bufOffset = 0
      @buffers[@bufIndex].copyToChannel (new Float32Array left, count * 4, fill), 0, @bufOffset
      @buffers[@bufIndex].copyToChannel (new Float32Array right, count * 4, fill), 1, @bufOffset
      @bufOffset += fill
      count += fill
      frames -= fill
    count

  setVariable: (key, value) ->
    @[key] = value
    @update = true

  log: (level, msg) ->
    console.log msg

  environment: (cmd, value) =>
    switch cmd
      when @core.ENVIRONMENT_GET_LOG_INTERFACE
        @log
      when @core.ENVIRONMENT_SET_PIXEL_FORMAT
        @pixelFormat = value
        true
      when @core.ENVIRONMENT_GET_VARIABLE_UPDATE
        if @update
          @update = false
          true
        else
          false
      when @core.ENVIRONMENT_GET_OVERSCAN
        @overscan
      when @core.ENVIRONMENT_GET_CAN_DUPE
        @can_dupe
      when @core.ENVIRONMENT_GET_VARIABLE
        return "rgb" if value.key == "nestopia_palette"
        return "rgb" if value.key == "nestopia_blargg_ntsc_filter"
        true
      when @core.ENVIRONMENT_SET_PERFORMANCE_LEVEL
        true
      when @core.ENVIRONMENT_SET_VARIABLES
        true
      when @core.ENVIRONMENT_SET_MEMORY_MAPS
        true
      else
        console.log "Unknown environment command #{cmd}"
        true

  frame: (now) =>
    @requestID = requestAnimationFrame @frame
    elapsed = now - @then
    if elapsed > @fpsInterval
      @then = now - (elapsed % @fpsInterval)
      @core.run()

  start: ->
    @frame()

  stop: ->
    cancelAnimationFrame @requestID
