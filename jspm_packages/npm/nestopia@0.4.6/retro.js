/* */ 
'format amd';
define(['./core'], function (Core) {
  function addHelpers () {
    this.LANGUAGE_ENGLISH = 0
    this.LANGUAGE_JAPANESE = 1
    this.LANGUAGE_FRENCH = 2
    this.LANGUAGE_SPANISH = 3
    this.LANGUAGE_GERMAN = 4
    this.LANGUAGE_ITALIAN = 5
    this.LANGUAGE_DUTCH = 6
    this.LANGUAGE_PORTUGUESE = 7
    this.LANGUAGE_RUSSIAN = 8
    this.LANGUAGE_KOREAN = 9
    this.LANGUAGE_CHINESE_TRADITIONAL = 10
    this.LANGUAGE_CHINESE_SIMPLIFIED = 11
    this.K_UNDO = 322
    this.K_EURO = 321
    this.K_POWER = 320
    this.K_MENU = 319
    this.K_BREAK = 318
    this.K_SYSREQ = 317
    this.K_PRINT = 316
    this.K_HELP = 315
    this.K_COMPOSE = 314
    this.K_MODE = 313
    this.K_RSUPER = 312
    this.K_LSUPER = 311
    this.K_LMETA = 310
    this.K_RMETA = 309
    this.K_LALT = 308
    this.K_RALT = 307
    this.K_LCTRL = 306
    this.K_RCTRL = 305
    this.K_LSHIFT = 304
    this.K_RSHIFT = 303
    this.K_SCROLLOCK = 302
    this.K_CAPSLOCK = 301
    this.K_NUMLOCK = 300
    this.K_F15 = 296
    this.K_F14 = 295
    this.K_F13 = 294
    this.K_F12 = 293
    this.K_F11 = 292
    this.K_F10 = 291
    this.K_F9 = 290
    this.K_F8 = 289
    this.K_F7 = 288
    this.K_F6 = 287
    this.K_F5 = 286
    this.K_F4 = 285
    this.K_F3 = 284
    this.K_F2 = 283
    this.K_F1 = 282
    this.K_PAGEDOWN = 281
    this.K_PAGEUP = 280
    this.K_END = 279
    this.K_HOME = 278
    this.K_INSERT = 277
    this.K_LEFT = 276
    this.K_RIGHT = 275
    this.K_DOWN = 274
    this.K_UP = 273
    this.K_KP_EQUALS = 272
    this.K_KP_ENTER = 271
    this.K_KP_PLUS = 270
    this.K_KP_MINUS = 269
    this.K_KP_MULTIPLY = 268
    this.K_KP_DIVIDE = 267
    this.K_KP_PERIOD = 266
    this.K_KP9 = 265
    this.K_KP8 = 264
    this.K_KP7 = 263
    this.K_KP6 = 262
    this.K_KP5 = 261
    this.K_KP4 = 260
    this.K_KP3 = 259
    this.K_KP2 = 258
    this.K_KP1 = 257
    this.K_KP0 = 256
    this.K_DELETE = 127
    this.K_z = 122
    this.K_y = 121
    this.K_x = 120
    this.K_w = 119
    this.K_v = 118
    this.K_u = 117
    this.K_t = 116
    this.K_s = 115
    this.K_r = 114
    this.K_q = 113
    this.K_p = 112
    this.K_o = 111
    this.K_n = 110
    this.K_m = 109
    this.K_l = 108
    this.K_k = 107
    this.K_j = 106
    this.K_i = 105
    this.K_h = 104
    this.K_g = 103
    this.K_f = 102
    this.K_e = 101
    this.K_d = 100
    this.K_c = 99
    this.K_b = 98
    this.K_a = 97
    this.K_BACKQUOTE = 96
    this.K_UNDERSCORE = 95
    this.K_CARET = 94
    this.K_RIGHTBRACKET = 93
    this.K_BACKSLASH = 92
    this.K_LEFTBRACKET = 91
    this.K_AT = 64
    this.K_QUESTION = 63
    this.K_GREATER = 62
    this.K_EQUALS = 61
    this.K_LESS = 60
    this.K_SEMICOLON = 59
    this.K_COLON = 58
    this.K_9 = 57
    this.K_8 = 56
    this.K_7 = 55
    this.K_6 = 54
    this.K_5 = 53
    this.K_4 = 52
    this.K_3 = 51
    this.K_2 = 50
    this.K_1 = 49
    this.K_0 = 48
    this.K_SLASH = 47
    this.K_PERIOD = 46
    this.K_MINUS = 45
    this.K_COMMA = 44
    this.K_PLUS = 43
    this.K_ASTERISK = 42
    this.K_RIGHTPAREN = 41
    this.K_LEFTPAREN = 40
    this.K_QUOTE = 39
    this.K_AMPERSAND = 38
    this.K_DOLLAR = 36
    this.K_HASH = 35
    this.K_QUOTEDBL = 34
    this.K_EXCLAIM = 33
    this.K_SPACE = 32
    this.K_ESCAPE = 27
    this.K_PAUSE = 19
    this.K_RETURN = 13
    this.K_CLEAR = 12
    this.K_TAB = 9
    this.K_BACKSPACE = 8
    this.K_UNKNOWN = 0
    this.K_FIRST = 0
    this.KMOD_SCROLLOCK = 64
    this.KMOD_CAPSLOCK = 32
    this.KMOD_NUMLOCK = 16
    this.KMOD_META = 8
    this.KMOD_ALT = 4
    this.KMOD_CTRL = 2
    this.KMOD_SHIFT = 1
    this.KMOD_NONE = 0
    this.LOG_DEBUG = 0
    this.LOG_INFO = 1
    this.LOG_WARN = 2
    this.LOG_ERROR = 3
    this.SENSOR_ACCELEROMETER_ENABLE = 0
    this.SENSOR_ACCELEROMETER_DISABLE = 1
    this.CAMERA_BUFFER_OPENGL_TEXTURE = 0
    this.CAMERA_BUFFER_RAW_FRAMEBUFFER = 1
    this.RUMBLE_STRONG = 0
    this.RUMBLE_WEAK = 1
    this.HW_CONTEXT_OPENGLES_VERSION = 5
    this.HW_CONTEXT_OPENGLES3 = 4
    this.HW_CONTEXT_OPENGL_CORE = 3
    this.HW_CONTEXT_OPENGLES2 = 2
    this.HW_CONTEXT_OPENGL = 1
    this.HW_CONTEXT_NONE = 0
    this.PIXEL_FORMAT_RGB565 = 2
    this.PIXEL_FORMAT_XRGB8888 = 1
    this.PIXEL_FORMAT_0RGB1555 = 0
    this.API_VERSION = 1
    this.DEVICE_TYPE_SHIFT = 8
    this.DEVICE_NONE = 0
    this.DEVICE_JOYPAD = 1
    this.DEVICE_MOUSE = 2
    this.DEVICE_KEYBOARD = 3
    this.DEVICE_LIGHTGUN = 4
    this.DEVICE_ANALOG = 5
    this.DEVICE_POINTER = 6
    this.DEVICE_ID_JOYPAD_B = 0
    this.DEVICE_ID_JOYPAD_Y = 1
    this.DEVICE_ID_JOYPAD_SELECT = 2
    this.DEVICE_ID_JOYPAD_START = 3
    this.DEVICE_ID_JOYPAD_UP = 4
    this.DEVICE_ID_JOYPAD_DOWN = 5
    this.DEVICE_ID_JOYPAD_LEFT = 6
    this.DEVICE_ID_JOYPAD_RIGHT = 7
    this.DEVICE_ID_JOYPAD_A = 8
    this.DEVICE_ID_JOYPAD_X = 9
    this.DEVICE_ID_JOYPAD_L = 10
    this.DEVICE_ID_JOYPAD_R = 11
    this.DEVICE_ID_JOYPAD_L2 = 12
    this.DEVICE_ID_JOYPAD_R2 = 13
    this.DEVICE_ID_JOYPAD_L3 = 14
    this.DEVICE_ID_JOYPAD_R3 = 15
    this.DEVICE_INDEX_ANALOG_LEFT = 0
    this.DEVICE_INDEX_ANALOG_RIGHT = 1
    this.DEVICE_ID_ANALOG_X = 0
    this.DEVICE_ID_ANALOG_Y = 1
    this.DEVICE_ID_MOUSE_X = 0
    this.DEVICE_ID_MOUSE_Y = 1
    this.DEVICE_ID_MOUSE_LEFT = 2
    this.DEVICE_ID_MOUSE_RIGHT = 3
    this.DEVICE_ID_MOUSE_WHEELUP = 4
    this.DEVICE_ID_MOUSE_WHEELDOWN = 5
    this.DEVICE_ID_MOUSE_MIDDLE = 6
    this.DEVICE_ID_MOUSE_HORIZ_WHEELUP = 7
    this.DEVICE_ID_MOUSE_HORIZ_WHEELDOWN = 8
    this.DEVICE_ID_LIGHTGUN_X = 0
    this.DEVICE_ID_LIGHTGUN_Y = 1
    this.DEVICE_ID_LIGHTGUN_TRIGGER = 2
    this.DEVICE_ID_LIGHTGUN_CURSOR = 3
    this.DEVICE_ID_LIGHTGUN_TURBO = 4
    this.DEVICE_ID_LIGHTGUN_PAUSE = 5
    this.DEVICE_ID_LIGHTGUN_START = 6
    this.DEVICE_ID_POINTER_X = 0
    this.DEVICE_ID_POINTER_Y = 1
    this.DEVICE_ID_POINTER_PRESSED = 2
    this.REGION_NTSC = 0
    this.REGION_PAL = 1
    this.MEMORY_SAVE_RAM = 0
    this.MEMORY_RTC = 1
    this.MEMORY_SYSTEM_RAM = 2
    this.MEMORY_VIDEO_RAM = 3
    this.ENVIRONMENT_SET_ROTATION = 1
    this.ENVIRONMENT_GET_OVERSCAN = 2
    this.ENVIRONMENT_GET_CAN_DUPE = 3
    this.ENVIRONMENT_SET_MESSAGE = 6
    this.ENVIRONMENT_SHUTDOWN = 7
    this.ENVIRONMENT_SET_PERFORMANCE_LEVEL = 8
    this.ENVIRONMENT_GET_SYSTEM_DIRECTORY = 9
    this.ENVIRONMENT_SET_PIXEL_FORMAT = 10
    this.ENVIRONMENT_SET_INPUT_DESCRIPTORS = 11
    this.ENVIRONMENT_SET_KEYBOARD_CALLBACK = 12
    this.ENVIRONMENT_SET_DISK_CONTROL_INTERFACE = 13
    this.ENVIRONMENT_SET_HW_RENDER = 14
    this.ENVIRONMENT_GET_VARIABLE = 15
    this.ENVIRONMENT_SET_VARIABLES = 16
    this.ENVIRONMENT_GET_VARIABLE_UPDATE = 17
    this.ENVIRONMENT_SET_SUPPORT_NO_GAME = 18
    this.ENVIRONMENT_GET_LIBRETRO_PATH = 19
    this.ENVIRONMENT_SET_AUDIO_CALLBACK = 22
    this.ENVIRONMENT_SET_FRAME_TIME_CALLBACK = 21
    this.ENVIRONMENT_GET_RUMBLE_INTERFACE = 23
    this.ENVIRONMENT_GET_INPUT_DEVICE_CAPABILITIES = 24
    this.ENVIRONMENT_GET_LOG_INTERFACE = 27
    this.ENVIRONMENT_GET_PERF_INTERFACE = 28
    this.ENVIRONMENT_GET_LOCATION_INTERFACE = 29
    this.ENVIRONMENT_GET_CONTENT_DIRECTORY = 30
    this.ENVIRONMENT_GET_CORE_ASSETS_DIRECTORY = 30
    this.ENVIRONMENT_GET_SAVE_DIRECTORY = 31
    this.ENVIRONMENT_SET_SYSTEM_AV_INFO = 32
    this.ENVIRONMENT_SET_PROC_ADDRESS_CALLBACK = 33
    this.ENVIRONMENT_SET_SUBSYSTEM_INFO = 34
    this.ENVIRONMENT_SET_CONTROLLER_INFO = 35
    this.ENVIRONMENT_SET_GEOMETRY = 37
    this.ENVIRONMENT_GET_USERNAME = 38
    this.ENVIRONMENT_GET_LANGUAGE = 39
    this.MEMDESC_CONST = 1
    this.MEMDESC_BIGENDIAN = 2
    this.MEMDESC_ALIGN_2 = 65536
    this.MEMDESC_ALIGN_4 = 131072
    this.MEMDESC_ALIGN_8 = 196608
    this.MEMDESC_MINSIZE_2 = 16777216
    this.MEMDESC_MINSIZE_4 = 33554432
    this.MEMDESC_MINSIZE_8 = 50331648
    this.SIMD_SSE = 1
    this.SIMD_SSE2 = 2
    this.SIMD_VMX = 4
    this.SIMD_VMX128 = 8
    this.SIMD_AVX = 16
    this.SIMD_NEON = 32
    this.SIMD_SSE3 = 64
    this.SIMD_SSSE3 = 128
    this.SIMD_MMX = 256
    this.SIMD_MMXEXT = 512
    this.SIMD_SSE4 = 1024
    this.SIMD_SSE42 = 2048
    this.SIMD_AVX2 = 4096
    this.SIMD_VFPU = 8192
    this.SIMD_PS = 16384
    this.SIMD_AES = 32768
    this.SIMD_VFPV3 = 65536
    this.SIMD_VFPV4 = 131072
    this.SENSOR_ACCELEROMETER_X = 1
    this.SENSOR_ACCELEROMETER_Y = 1
    this.SENSOR_ACCELEROMETER_Z = 2

    this._ptrs = []

    this._unstringify = function (ptr, str) {
      var _str = this._malloc(str.length + 1)
      this._ptrs.push(_str)
      this.writeStringToMemory(str, _str)
      this.setValue(ptr, _str, '*')
      return ptr
    }

    this._stringify = function (ptr) {
      return this.Pointer_stringify(this.getValue(ptr, '*'))
    }

    this._get_variable = function (ptr) {
      return {
        key: this._stringify(ptr),
        value: this._stringify(ptr + 4)
      }
    }

    this._get_av_info = function (ptr) {
      return {
        geometry: {
          base_width: this.getValue(ptr, 'i32'),
          base_height: this.getValue(ptr + 4, 'i32'),
          max_width: this.getValue(ptr + 8, 'i32'),
          max_height: this.getValue(ptr + 12, 'i32'),
          aspect_ratio: this.getValue(ptr + 16, 'float')
        },
        timing: {
          fps: this.getValue(ptr + 24, 'double'),
          sample_rate: this.getValue(ptr + 32, 'double')
        }
      }
    }

    this._set_info = function (ptr, data) {
      var _data = this._malloc(data.length)
      this._ptrs.push(_data)
      new Uint8Array(this.HEAP8.buffer, _data, data.length).set(data)
      this.setValue(ptr + 4, _data, '*')
      this.setValue(ptr + 8, data.length, 'i32')
    }

    this.get_system_info = function () {
      var _data = this._malloc(20)
      this._retro_get_system_info(_data)
      var obj = {
        library_name: this._stringify(_data),
        library_version: this._stringify(_data + 4),
        valid_extensions: this._stringify(_data + 8),
        need_fullpath: this.getValue(_data + 12, 'i32') > 0,
        block_extract: this.getValue(_data + 16, 'i32') > 0
      }
      this._free(_data)
      return obj
    }

    this.get_system_av_info = function () {
      var _data = this._malloc(40)
      this._retro_get_system_av_info(_data)
      var info = this._get_av_info(_data)
      this._free(_data)
      return info
    }

    this.serialize = function () {
      var size = this._retro_serialize_size()
      var _data = this._malloc(size)
      var data = false
      if (this._retro_serialize(_data, size)) {
        data = new Uint8Array(this.HEAP8.buffer, _data, size)
      }
      this._free(_data)
      return data
    }

    this.unserialize = function (data) {
      var _data = this._malloc(data.length)
      new Uint8Array(this.HEAP8.buffer, _data, data.length).set(data)
      var result = this._retro_unserialize(_data, data.length)
      this._free(_data)
      return result
    }

    this.cheat_set = function (index, enabled, code) {
      var _code = this._malloc(code.length)
      this._ptrs.push(_code)
      this.writeStringToMemory(code, _code)
      this._retro_cheat_set(index, enabled, _code)
    }

    this.load_game = function (data) {
      var _info = this._malloc(16)
      this._ptrs.push(_info)
      this._set_info(_info, data)
      return this._retro_load_game(_info)
    }

    this.load_game_special = function (game_type, datas) {
      var _info = this._malloc(16 * datas.length)
      this._ptrs.push(_info)
      for (var data in datas) {
        this._set_info(_info + 16 * data, datas[data])
      }
      return this._retro_load_game_special(game_type, _info, datas.length)
    }

    this.get_memory_data = function (id) {
      return new Uint8Array(this.HEAP8.buffer, this._retro_get_memory_data(id), this._retro_get_memory_size(id))
    }

    this.set_environment = function (fn) { // complete libretro spec
      this._retro_set_environment(this.Runtime.addFunction(function (fn, cmd, _data) {
        switch (cmd) {
          case this.ENVIRONMENT_SHUTDOWN: {
            return fn(cmd)
          }
          case this.ENVIRONMENT_SET_PERFORMANCE_LEVEL:
          case this.ENVIRONMENT_SET_PIXEL_FORMAT:
          case this.ENVIRONMENT_SET_ROTATION:
          case this.ENVIRONMENT_SET_SUPPORT_NO_GAME: {
            return fn(cmd, this.getValue(_data, 'i32'))
          }
          case this.ENVIRONMENT_SET_GEOMETRY: {
            return fn(cmd, {
              base_width: this.getValue(_data, 'i32'),
              base_height: this.getValue(_data + 4, 'i32'),
              max_width: this.getValue(_data + 8, 'i32'),
              max_height: this.getValue(_data + 12, 'i32'),
              aspect_ratio: this.getValue(_data + 16, 'float')
            })
          }
          case this.ENVIRONMENT_SET_INPUT_DESCRIPTORS: {
            var descriptions = []
            for (var ptr = _data; this.getValue(ptr + 16, '*'); ptr += 20) {
              descriptions.push({
                port: this.getValue(ptr, 'i32'),
                device: this.getValue(ptr + 4, 'i32'),
                index: this.getValue(ptr + 8, 'i32'),
                id: this.getValue(ptr + 12, 'i32'),
                description: this._stringify(ptr + 16)
              })
            }
            return fn(cmd, descriptions)
          }
          case this.ENVIRONMENT_SET_MESSAGE: {
            return fn(cmd, this._stringify(_data), this.getValue(_data + 4, 'i32'))
          }
          case this.ENVIRONMENT_SET_SYSTEM_AV_INFO: {
            return fn(cmd, this._get_av_info(_data))
          }
          case this.ENVIRONMENT_SET_VARIABLES: {
            var variables = []
            for (ptr = _data; this.getValue(ptr, '*'); ptr += 8) {
              variables.push(this._get_variable(ptr))
            }
            return fn(cmd, variables)
          }
          case this.ENVIRONMENT_GET_CAN_DUPE:
          case this.ENVIRONMENT_GET_OVERSCAN:
          case this.ENVIRONMENT_GET_VARIABLE_UPDATE: {
            this.setValue(_data, fn(cmd), 'i16')
            return true
          }
          case this.ENVIRONMENT_GET_LANGUAGE:
          case this.ENVIRONMENT_GET_INPUT_DEVICE_CAPABILITIES: {
            this.setValue(_data, fn(cmd), 'i32')
            return true
          }
          case this.ENVIRONMENT_GET_SYSTEM_DIRECTORY:
          case this.ENVIRONMENT_GET_LIBRETRO_PATH:
          case this.ENVIRONMENT_GET_CORE_ASSETS_DIRECTORY:
          case this.ENVIRONMENT_GET_SAVE_DIRECTORY:
          case this.ENVIRONMENT_GET_USERNAME: {
            this._unstringify(_data, fn(cmd))
            return true
          }
          case this.ENVIRONMENT_GET_VARIABLE: {
            this._unstringify(_data + 4, fn(cmd, this._get_variable(_data)))
            return true
          }
          case this.ENVIRONMENT_GET_LOG_INTERFACE: {
            var func = fn(cmd)
            this.setValue(_data, this.Runtime.addFunction(function (func, level) {
              var args = []
              var varargs = Array.prototype.slice.call(arguments, 3)
              for (var vararg in varargs) {
                args.push(this.Pointer_stringify(varargs[vararg]))
              }
              func.apply(null, [level].concat(args))
            }.bind(this, func)), '*')
            return true
          }
          case this.ENVIRONMENT_GET_PERF_INTERFACE: {
            var perf = fn(cmd)
            this.setValue(_data, this.Runtime.addFunction(perf.get_time_usec), '*')
            this.setValue(_data + 4, this.Runtime.addFunction(perf.get_cpu_features), '*')
            this.setValue(_data + 8, this.Runtime.addFunction(perf.get_perf_counter), '*')
            this.setValue(_data + 12, this.Runtime.addFunction(perf.register), '*')
            this.setValue(_data + 16, this.Runtime.addFunction(perf.start), '*')
            this.setValue(_data + 20, this.Runtime.addFunction(perf.stop), '*')
            this.setValue(_data + 24, this.Runtime.addFunction(perf.log), '*')
            return true
          }
          default: {
            return fn(cmd, _data)
          }
        }
      }.bind(this, fn)))
    }

    this.set_video_refresh = function (fn) {
      this._retro_set_video_refresh(this.Runtime.addFunction(function (fn, _data, width, height, pitch) {
        var data = new Uint16Array(this.HEAPU16.buffer, _data, height * pitch)
        fn(data, width, height, pitch)
      }.bind(this, fn)))
    }

    this.set_audio_sample_batch = function (fn) {
      this._retro_set_audio_sample_batch(this.Runtime.addFunction(function (fn, _data, frames) {
        var left = new Float32Array(frames)
        var right = new Float32Array(frames)
        var data = new Int16Array(this.HEAP16.buffer, _data, frames * 4)
        for (var i = 0; i < frames; i++) {
          left[i] = data[i * 2] / 0x8000
          right[i] = data[i * 2 + 1] / 0x8000
        }
        return fn(left, right, frames)
      }.bind(this, fn)))
    }

    this.set_audio_sample = function (fn) {
      this._retro_set_audio_sample(this.Runtime.addFunction(fn))
    }

    this.set_input_poll = function (fn) {
      this._retro_set_input_poll(this.Runtime.addFunction(fn))
    }

    this.set_input_state = function (fn) {
      this._retro_set_input_state(this.Runtime.addFunction(fn))
    }

    this.init = function () {
      this._retro_init()
    }

    this.deinit = function () {
      this._retro_deinit()
    }

    this.api_version = function () {
      return this._retro_api_version()
    }

    this.reset = function () {
      this._retro_reset()
    }

    this.run = function () {
      this._retro_run()
    }

    this.unload_game = function () {
      this._retro_unload_game()
      // for (var ptr in this._ptrs) {
      //   this._free(this._ptrs[ptr])
      // }
    }

    this.get_region = function () {
      return this._retro_get_region()
    }

    this.cheat_reset = function () {
      this._retro_cheat_reset()
    }

    this.set_controller_port_device = function (port, device) {
      this._retro_set_controller_port_device(port, device)
    }
  }
  addHelpers.call(Core);
  return Core;
});
