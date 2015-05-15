fs = require 'fs'

retro = require 'node-retro'

remote = require 'remote'
app = remote.require 'app'

configDir = app.getPath 'userData'
configFile = "#{configDir}/settings.json"
if fs.existsSync configFile
  module.exports = JSON.parse fs.readFileSync configFile
else
  module.exports =
    key2joy:
      32: retro.DEVICE_ID_JOYPAD_B
      91: retro.DEVICE_ID_JOYPAD_Y
      18: retro.DEVICE_ID_JOYPAD_A
      90: retro.DEVICE_ID_JOYPAD_X
      66: retro.DEVICE_ID_JOYPAD_B
      89: retro.DEVICE_ID_JOYPAD_Y
      65: retro.DEVICE_ID_JOYPAD_A
      88: retro.DEVICE_ID_JOYPAD_X
      76: retro.DEVICE_ID_JOYPAD_L
      82: retro.DEVICE_ID_JOYPAD_R
      222: retro.DEVICE_ID_JOYPAD_SELECT
      13: retro.DEVICE_ID_JOYPAD_START
      16: retro.DEVICE_ID_JOYPAD_SELECT
      9: retro.DEVICE_ID_JOYPAD_SELECT
      73: retro.DEVICE_ID_JOYPAD_X
      74: retro.DEVICE_ID_JOYPAD_Y
      75: retro.DEVICE_ID_JOYPAD_B
      76: retro.DEVICE_ID_JOYPAD_A
      38: retro.DEVICE_ID_JOYPAD_UP
      40: retro.DEVICE_ID_JOYPAD_DOWN
      37: retro.DEVICE_ID_JOYPAD_LEFT
      39: retro.DEVICE_ID_JOYPAD_RIGHT
      87: retro.DEVICE_ID_JOYPAD_UP
      83: retro.DEVICE_ID_JOYPAD_DOWN
      65: retro.DEVICE_ID_JOYPAD_LEFT
      68: retro.DEVICE_ID_JOYPAD_RIGHT
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
    cores:
      '32x': ['picodrive_libretro']
      'bat': ['dosbox_libretro']
      'bin': [
        'genesis_plus_gx_libretro'
        'mednafen_vb_libretro'
        'pcsx_rearmed_libretro'
        'picodrive_libretro'
      ]
      'bsx': [
        'snes9x_next_libretro'
        'snes9x_libretro'
      ]
      'cbn': ['pcsx_rearmed_libretro']
      'ccd': ['mednafen_psx_libretro']
      'com': ['dosbox_libretro']
      'conf': ['dosbox_libretro']
      'cue': [
        'genesis_plus_gx_libretro'
        'mednafen_pce_fast_libretro'
        'mednafen_psx_libretro'
        'pcsx_rearmed_libretro'
        'picodrive_libretro'
      ]
      'dmg': ['gambatte_libretro']
      'dx2': [
        'snes9x_next_libretro'
        'snes9x_libretro'
      ]
      'exe': [
        'dosbox_libretro'
        'nxengine_libretro'
      ]
      'fds': ['nestopia_libretro']
      'fig': [
        'snes9x_libretro'
        'snes9x_next_libretro'
      ]
      'flac': ['genesis_plus_gx_libretro']
      'gb': ['gambatte_libretro']
      'gba': [
        'vba_next_libretro'
        'vbam_libretro'
        'mednafen_gba_libretro'
      ]
      'gbc': ['gambatte_libretro']
      'gd3': [
        'snes9x_libretro'
        'snes9x_next_libretro'
      ]
      'gd7': [
        'snes9x_libretro'
        'snes9x_next_libretro'
      ]
      'gen': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'gg': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'img': ['pcsx_rearmed_libretro']
      'ios': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'iwad': ['prboom_libretro']
      'jpeg': ['3dengine_libretro']
      'jpg': ['3dengine_libretro']
      'lnx': ['handy_libretro']
      'md': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'mdf': ['pcsx_rearmed_libretro']
      'mtl': ['3dengine_libretro']
      'n64': ['mupen64plus_libretro']
      'nes': [
        'fceumm_libretro'
        'quicknes_libretro'
        'nestopia_libretro'
      ]
      'ngc': ['mednafen_ngp_libretro']
      'ngp': ['mednafen_ngp_libretro']
      'obj': [
        '3dengine_libretro'
        'modelviewer_libretro'
        'modelviewer_location_libretro'
        'scenewalker_libretro'
      ]
      'pak': ['tyrquake_libretro']
      'pbp': ['pcsx_rearmed_libretro']
      'pce': ['mednafen_pce_fast_libretro']
      'png': [
        '3dengine_libretro'
        'instancingviewer_camera_libretro'
        'instancingviewer_libretro'
      ]
      'sfc': [
        'snes9x_next_libretro'
        'snes9x_libretro'
        'bsnes_cplusplus98_libretro'
        'mednafen_snes_libretro'
      ]
      'sg': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'sgx': ['mednafen_pce_fast_libretro']
      'smc': [
        'snes9x_next_libretro'
        'snes9x_libretro'
        'bsnes_cplusplus98_libretro'
        'mednafen_snes_libretro'
      ]
      'smd': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'sms': [
        'genesis_plus_gx_libretro'
        'picodrive_libretro'
      ]
      'swc': [
        'snes9x_next_libretro'
        'snes9x_libretro'
      ]
      'tga': ['3dengine_libretro']
      'toc': [
        'mednafen_psx_libretro'
        'pcsx_rearmed_libretro'
      ]
      'unif': ['fceumm_libretro']
      'v64': ['mupen64plus_libretro']
      'vb': ['mednafen_vb_libretro']
      'vboy': ['mednafen_vb_libretro']
      'wad': ['prboom_libretro']
      'ws': ['mednafen_wswan_libretro']
      'wsc': ['mednafen_wswan_libretro']
      'z64': ['mupen64plus_libretro']
