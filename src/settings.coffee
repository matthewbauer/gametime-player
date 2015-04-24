retro = require('node-retro')

exports =
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

#if fs.existsSync(app.getPath('userData') + '/' + 'settings.json')
#  exports =
