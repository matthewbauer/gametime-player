retro = require('node-retro')
remote = require('remote')
app = remote.require('app')
fs = require('fs')

if fs.existsSync(app.getPath('userData') + '/' + 'settings.json')
  module.exports = JSON.parse(fs.readFileSync(app.getPath('userData') + '/' + 'settings.json'))
else
  module.exports =
    key2joy:
      66: retro.DEVICE_ID_JOYPAD_B
      89: retro.DEVICE_ID_JOYPAD_Y
      65: retro.DEVICE_ID_JOYPAD_A
      88: retro.DEVICE_ID_JOYPAD_X
      76: retro.DEVICE_ID_JOYPAD_L
      82: retro.DEVICE_ID_JOYPAD_R
      38: retro.DEVICE_ID_JOYPAD_UP
      40: retro.DEVICE_ID_JOYPAD_DOWN
      37: retro.DEVICE_ID_JOYPAD_LEFT
      39: retro.DEVICE_ID_JOYPAD_RIGHT
      222: retro.DEVICE_ID_JOYPAD_SELECT
      13: retro.DEVICE_ID_JOYPAD_START
    gp2joy:
      0: retro.DEVICE_ID_JOYPAD_B
      1: retro.DEVICE_ID_JOYPAD_A
      2: retro.DEVICE_ID_JOYPAD_Y
      3: retro.DEVICE_ID_JOYPAD_X
      4: retro.DEVICE_ID_JOYPAD_L
      5: retro.DEVICE_ID_JOYPAD_R
      6: retro.DEVICE_ID_JOYPAD_L2
      7: retro.DEVICE_ID_JOYPAD_R2
      8: retro.DEVICE_ID_JOYPAD_SELECT
      9: retro.DEVICE_ID_JOYPAD_START
      12: retro.DEVICE_ID_JOYPAD_UP
      13: retro.DEVICE_ID_JOYPAD_DOWN
      14: retro.DEVICE_ID_JOYPAD_LEFT
      15: retro.DEVICE_ID_JOYPAD_RIGHT
    vertexShaderSource: '
    attribute vec2 a_texCoord;
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
    '
    variables: {}
    overscan: false
    fragmentShaderSource: '
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;
    void main() {
      gl_FragColor = texture2D(u_image, v_texCoord);
    }
    '
