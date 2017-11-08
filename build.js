"bundle";
(function() {
var define = System.amdDefine;
(function(factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define("github:satazor/js-spark-md5@1.0.1/spark-md5.js", [], factory);
  } else {
    var glob;
    try {
      glob = window;
    } catch (e) {
      glob = self;
    }
    glob.SparkMD5 = factory();
  }
}(function(undefined) {
  'use strict';
  var add32 = function(a, b) {
    return (a + b) & 0xFFFFFFFF;
  },
      hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  function md5cycle(x, k) {
    var a = x[0],
        b = x[1],
        c = x[2],
        d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function md5blk(s) {
    var md5blks = [],
        i;
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  function md5blk_array(a) {
    var md5blks = [],
        i;
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
    }
    return md5blks;
  }
  function md51(s) {
    var n = s.length,
        state = [1732584193, -271733879, -1732584194, 271733878],
        i,
        length,
        tail,
        tmp,
        lo,
        hi;
    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    length = s.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < length; i += 1) {
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }
  function md51_array(a) {
    var n = a.length,
        state = [1732584193, -271733879, -1732584194, 271733878],
        i,
        length,
        tail,
        tmp,
        lo,
        hi;
    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
    }
    a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);
    length = a.length;
    tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < length; i += 1) {
      tail[i >> 2] |= a[i] << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i += 1) {
        tail[i] = 0;
      }
    }
    tmp = n * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(state, tail);
    return state;
  }
  function rhex(n) {
    var s = '',
        j;
    for (j = 0; j < 4; j += 1) {
      s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    }
    return s;
  }
  function hex(x) {
    var i;
    for (i = 0; i < x.length; i += 1) {
      x[i] = rhex(x[i]);
    }
    return x.join('');
  }
  if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
    add32 = function(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
          msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };
  }
  if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
    (function() {
      function clamp(val, length) {
        val = (val | 0) || 0;
        if (val < 0) {
          return Math.max(val + length, 0);
        }
        return Math.min(val, length);
      }
      ArrayBuffer.prototype.slice = function(from, to) {
        var length = this.byteLength,
            begin = clamp(from, length),
            end = length,
            num,
            target,
            targetArray,
            sourceArray;
        if (to !== undefined) {
          end = clamp(to, length);
        }
        if (begin > end) {
          return new ArrayBuffer(0);
        }
        num = end - begin;
        target = new ArrayBuffer(num);
        targetArray = new Uint8Array(target);
        sourceArray = new Uint8Array(this, begin, num);
        targetArray.set(sourceArray);
        return target;
      };
    })();
  }
  function toUtf8(str) {
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }
    return str;
  }
  function utf8Str2ArrayBuffer(str, returnUInt8Array) {
    var length = str.length,
        buff = new ArrayBuffer(length),
        arr = new Uint8Array(buff),
        i;
    for (i = 0; i < length; i++) {
      arr[i] = str.charCodeAt(i);
    }
    return returnUInt8Array ? arr : buff;
  }
  function arrayBuffer2Utf8Str(buff) {
    return String.fromCharCode.apply(null, new Uint8Array(buff));
  }
  function concatenateArrayBuffers(first, second, returnUInt8Array) {
    var result = new Uint8Array(first.byteLength + second.byteLength);
    result.set(new Uint8Array(first));
    result.set(new Uint8Array(second), first.byteLength);
    return returnUInt8Array ? result : result.buffer;
  }
  function SparkMD5() {
    this.reset();
  }
  SparkMD5.prototype.append = function(str) {
    this.appendBinary(toUtf8(str));
    return this;
  };
  SparkMD5.prototype.appendBinary = function(contents) {
    this._buff += contents;
    this._length += contents.length;
    var length = this._buff.length,
        i;
    for (i = 64; i <= length; i += 64) {
      md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
    }
    this._buff = this._buff.substring(i - 64);
    return this;
  };
  SparkMD5.prototype.end = function(raw) {
    var buff = this._buff,
        length = buff.length,
        i,
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ret;
    for (i = 0; i < length; i += 1) {
      tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._hash : hex(this._hash);
    this.reset();
    return ret;
  };
  SparkMD5.prototype.reset = function() {
    this._buff = '';
    this._length = 0;
    this._hash = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.prototype.getState = function() {
    return {
      buff: this._buff,
      length: this._length,
      hash: this._hash
    };
  };
  SparkMD5.prototype.setState = function(state) {
    this._buff = state.buff;
    this._length = state.length;
    this._hash = state.hash;
    return this;
  };
  SparkMD5.prototype.destroy = function() {
    delete this._hash;
    delete this._buff;
    delete this._length;
  };
  SparkMD5.prototype._finish = function(tail, length) {
    var i = length,
        tmp,
        lo,
        hi;
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(this._hash, tail);
      for (i = 0; i < 16; i += 1) {
        tail[i] = 0;
      }
    }
    tmp = this._length * 8;
    tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
    lo = parseInt(tmp[2], 16);
    hi = parseInt(tmp[1], 16) || 0;
    tail[14] = lo;
    tail[15] = hi;
    md5cycle(this._hash, tail);
  };
  SparkMD5.hash = function(str, raw) {
    return SparkMD5.hashBinary(toUtf8(str), raw);
  };
  SparkMD5.hashBinary = function(content, raw) {
    var hash = md51(content);
    return !!raw ? hash : hex(hash);
  };
  SparkMD5.ArrayBuffer = function() {
    this.reset();
  };
  SparkMD5.ArrayBuffer.prototype.append = function(arr) {
    var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
        length = buff.length,
        i;
    this._length += arr.byteLength;
    for (i = 64; i <= length; i += 64) {
      md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
    }
    this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.end = function(raw) {
    var buff = this._buff,
        length = buff.length,
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        i,
        ret;
    for (i = 0; i < length; i += 1) {
      tail[i >> 2] |= buff[i] << ((i % 4) << 3);
    }
    this._finish(tail, length);
    ret = !!raw ? this._hash : hex(this._hash);
    this.reset();
    return ret;
  };
  SparkMD5.ArrayBuffer.prototype.reset = function() {
    this._buff = new Uint8Array(0);
    this._length = 0;
    this._hash = [1732584193, -271733879, -1732584194, 271733878];
    return this;
  };
  SparkMD5.ArrayBuffer.prototype.getState = function() {
    var state = SparkMD5.prototype.getState.call(this);
    state.buff = arrayBuffer2Utf8Str(state.buff);
    return state;
  };
  SparkMD5.ArrayBuffer.prototype.setState = function(state) {
    state.buff = utf8Str2ArrayBuffer(state.buff, true);
    return SparkMD5.prototype.setState.call(this, state);
  };
  SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
  SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
  SparkMD5.ArrayBuffer.hash = function(arr, raw) {
    var hash = md51_array(new Uint8Array(arr));
    return !!raw ? hash : hex(hash);
  };
  return SparkMD5;
}));

})();
(function() {
var define = System.amdDefine;
define("github:satazor/js-spark-md5@1.0.1.js", ["github:satazor/js-spark-md5@1.0.1/spark-md5.js"], function(main) {
  return main;
});

})();
(function() {
var define = System.amdDefine;
(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define("github:stuk/jszip@2.6.1/dist/jszip.js", [], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.JSZip = f();
  }
})(function() {
  var define,
      module,
      exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      'use strict';
      var DataReader = require('./dataReader');
      function ArrayReader(data) {
        if (data) {
          this.data = data;
          this.length = this.data.length;
          this.index = 0;
          this.zero = 0;
          for (var i = 0; i < this.data.length; i++) {
            data[i] = data[i] & 0xFF;
          }
        }
      }
      ArrayReader.prototype = new DataReader();
      ArrayReader.prototype.byteAt = function(i) {
        return this.data[this.zero + i];
      };
      ArrayReader.prototype.lastIndexOfSignature = function(sig) {
        var sig0 = sig.charCodeAt(0),
            sig1 = sig.charCodeAt(1),
            sig2 = sig.charCodeAt(2),
            sig3 = sig.charCodeAt(3);
        for (var i = this.length - 4; i >= 0; --i) {
          if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
          }
        }
        return -1;
      };
      ArrayReader.prototype.readData = function(size) {
        this.checkOffset(size);
        if (size === 0) {
          return [];
        }
        var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
        this.index += size;
        return result;
      };
      module.exports = ArrayReader;
    }, {"./dataReader": 6}],
    2: [function(require, module, exports) {
      'use strict';
      var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      exports.encode = function(input, utf8) {
        var output = "";
        var chr1,
            chr2,
            chr3,
            enc1,
            enc2,
            enc3,
            enc4;
        var i = 0;
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
      };
      exports.decode = function(input, utf8) {
        var output = "";
        var chr1,
            chr2,
            chr3;
        var enc1,
            enc2,
            enc3,
            enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        return output;
      };
    }, {}],
    3: [function(require, module, exports) {
      'use strict';
      function CompressedObject() {
        this.compressedSize = 0;
        this.uncompressedSize = 0;
        this.crc32 = 0;
        this.compressionMethod = null;
        this.compressedContent = null;
      }
      CompressedObject.prototype = {
        getContent: function() {
          return null;
        },
        getCompressedContent: function() {
          return null;
        }
      };
      module.exports = CompressedObject;
    }, {}],
    4: [function(require, module, exports) {
      'use strict';
      exports.STORE = {
        magic: "\x00\x00",
        compress: function(content, compressionOptions) {
          return content;
        },
        uncompress: function(content) {
          return content;
        },
        compressInputType: null,
        uncompressInputType: null
      };
      exports.DEFLATE = require('./flate');
    }, {"./flate": 9}],
    5: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
      module.exports = function crc32(input, crc) {
        if (typeof input === "undefined" || !input.length) {
          return 0;
        }
        var isArray = utils.getTypeOf(input) !== "string";
        if (typeof(crc) == "undefined") {
          crc = 0;
        }
        var x = 0;
        var y = 0;
        var b = 0;
        crc = crc ^ (-1);
        for (var i = 0,
            iTop = input.length; i < iTop; i++) {
          b = isArray ? input[i] : input.charCodeAt(i);
          y = (crc ^ b) & 0xFF;
          x = table[y];
          crc = (crc >>> 8) ^ x;
        }
        return crc ^ (-1);
      };
    }, {"./utils": 22}],
    6: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      function DataReader(data) {
        this.data = null;
        this.length = 0;
        this.index = 0;
        this.zero = 0;
      }
      DataReader.prototype = {
        checkOffset: function(offset) {
          this.checkIndex(this.index + offset);
        },
        checkIndex: function(newIndex) {
          if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
          }
        },
        setIndex: function(newIndex) {
          this.checkIndex(newIndex);
          this.index = newIndex;
        },
        skip: function(n) {
          this.setIndex(this.index + n);
        },
        byteAt: function(i) {},
        readInt: function(size) {
          var result = 0,
              i;
          this.checkOffset(size);
          for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
          }
          this.index += size;
          return result;
        },
        readString: function(size) {
          return utils.transformTo("string", this.readData(size));
        },
        readData: function(size) {},
        lastIndexOfSignature: function(sig) {},
        readDate: function() {
          var dostime = this.readInt(4);
          return new Date(((dostime >> 25) & 0x7f) + 1980, ((dostime >> 21) & 0x0f) - 1, (dostime >> 16) & 0x1f, (dostime >> 11) & 0x1f, (dostime >> 5) & 0x3f, (dostime & 0x1f) << 1);
        }
      };
      module.exports = DataReader;
    }, {"./utils": 22}],
    7: [function(require, module, exports) {
      'use strict';
      exports.base64 = false;
      exports.binary = false;
      exports.dir = false;
      exports.createFolders = false;
      exports.date = null;
      exports.compression = null;
      exports.compressionOptions = null;
      exports.comment = null;
      exports.unixPermissions = null;
      exports.dosPermissions = null;
    }, {}],
    8: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      exports.string2binary = function(str) {
        return utils.string2binary(str);
      };
      exports.string2Uint8Array = function(str) {
        return utils.transformTo("uint8array", str);
      };
      exports.uint8Array2String = function(array) {
        return utils.transformTo("string", array);
      };
      exports.string2Blob = function(str) {
        var buffer = utils.transformTo("arraybuffer", str);
        return utils.arrayBuffer2Blob(buffer);
      };
      exports.arrayBuffer2Blob = function(buffer) {
        return utils.arrayBuffer2Blob(buffer);
      };
      exports.transformTo = function(outputType, input) {
        return utils.transformTo(outputType, input);
      };
      exports.getTypeOf = function(input) {
        return utils.getTypeOf(input);
      };
      exports.checkSupport = function(type) {
        return utils.checkSupport(type);
      };
      exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;
      exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;
      exports.pretty = function(str) {
        return utils.pretty(str);
      };
      exports.findCompression = function(compressionMethod) {
        return utils.findCompression(compressionMethod);
      };
      exports.isRegExp = function(object) {
        return utils.isRegExp(object);
      };
    }, {"./utils": 22}],
    9: [function(require, module, exports) {
      'use strict';
      var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');
      var pako = require("pako");
      exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
      exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
      exports.magic = "\x08\x00";
      exports.compress = function(input, compressionOptions) {
        return pako.deflateRaw(input, {level: compressionOptions.level || -1});
      };
      exports.uncompress = function(input) {
        return pako.inflateRaw(input);
      };
    }, {"pako": 25}],
    10: [function(require, module, exports) {
      'use strict';
      var base64 = require('./base64');
      function JSZip(data, options) {
        if (!(this instanceof JSZip))
          return new JSZip(data, options);
        this.files = {};
        this.comment = null;
        this.root = "";
        if (data) {
          this.load(data, options);
        }
        this.clone = function() {
          var newObj = new JSZip();
          for (var i in this) {
            if (typeof this[i] !== "function") {
              newObj[i] = this[i];
            }
          }
          return newObj;
        };
      }
      JSZip.prototype = require('./object');
      JSZip.prototype.load = require('./load');
      JSZip.support = require('./support');
      JSZip.defaults = require('./defaults');
      JSZip.utils = require('./deprecatedPublicUtils');
      JSZip.base64 = {
        encode: function(input) {
          return base64.encode(input);
        },
        decode: function(input) {
          return base64.decode(input);
        }
      };
      JSZip.compressions = require('./compressions');
      module.exports = JSZip;
    }, {
      "./base64": 2,
      "./compressions": 4,
      "./defaults": 7,
      "./deprecatedPublicUtils": 8,
      "./load": 11,
      "./object": 14,
      "./support": 18
    }],
    11: [function(require, module, exports) {
      'use strict';
      var base64 = require('./base64');
      var utf8 = require('./utf8');
      var utils = require('./utils');
      var ZipEntries = require('./zipEntries');
      module.exports = function(data, options) {
        var files,
            zipEntries,
            i,
            input;
        options = utils.extend(options || {}, {
          base64: false,
          checkCRC32: false,
          optimizedBinaryString: false,
          createFolders: false,
          decodeFileName: utf8.utf8decode
        });
        if (options.base64) {
          data = base64.decode(data);
        }
        zipEntries = new ZipEntries(data, options);
        files = zipEntries.files;
        for (i = 0; i < files.length; i++) {
          input = files[i];
          this.file(input.fileNameStr, input.decompressed, {
            binary: true,
            optimizedBinaryString: true,
            date: input.date,
            dir: input.dir,
            comment: input.fileCommentStr.length ? input.fileCommentStr : null,
            unixPermissions: input.unixPermissions,
            dosPermissions: input.dosPermissions,
            createFolders: options.createFolders
          });
        }
        if (zipEntries.zipComment.length) {
          this.comment = zipEntries.zipComment;
        }
        return this;
      };
    }, {
      "./base64": 2,
      "./utf8": 21,
      "./utils": 22,
      "./zipEntries": 23
    }],
    12: [function(require, module, exports) {
      (function(Buffer) {
        'use strict';
        module.exports = function(data, encoding) {
          return new Buffer(data, encoding);
        };
        module.exports.test = function(b) {
          return Buffer.isBuffer(b);
        };
      }).call(this, (typeof Buffer !== "undefined" ? Buffer : undefined));
    }, {}],
    13: [function(require, module, exports) {
      'use strict';
      var Uint8ArrayReader = require('./uint8ArrayReader');
      function NodeBufferReader(data) {
        this.data = data;
        this.length = this.data.length;
        this.index = 0;
        this.zero = 0;
      }
      NodeBufferReader.prototype = new Uint8ArrayReader();
      NodeBufferReader.prototype.readData = function(size) {
        this.checkOffset(size);
        var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
        this.index += size;
        return result;
      };
      module.exports = NodeBufferReader;
    }, {"./uint8ArrayReader": 19}],
    14: [function(require, module, exports) {
      'use strict';
      var support = require('./support');
      var utils = require('./utils');
      var crc32 = require('./crc32');
      var signature = require('./signature');
      var defaults = require('./defaults');
      var base64 = require('./base64');
      var compressions = require('./compressions');
      var CompressedObject = require('./compressedObject');
      var nodeBuffer = require('./nodeBuffer');
      var utf8 = require('./utf8');
      var StringWriter = require('./stringWriter');
      var Uint8ArrayWriter = require('./uint8ArrayWriter');
      var getRawData = function(file) {
        if (file._data instanceof CompressedObject) {
          file._data = file._data.getContent();
          file.options.binary = true;
          file.options.base64 = false;
          if (utils.getTypeOf(file._data) === "uint8array") {
            var copy = file._data;
            file._data = new Uint8Array(copy.length);
            if (copy.length !== 0) {
              file._data.set(copy, 0);
            }
          }
        }
        return file._data;
      };
      var getBinaryData = function(file) {
        var result = getRawData(file),
            type = utils.getTypeOf(result);
        if (type === "string") {
          if (!file.options.binary) {
            if (support.nodebuffer) {
              return nodeBuffer(result, "utf-8");
            }
          }
          return file.asBinary();
        }
        return result;
      };
      var dataToString = function(asUTF8) {
        var result = getRawData(this);
        if (result === null || typeof result === "undefined") {
          return "";
        }
        if (this.options.base64) {
          result = base64.decode(result);
        }
        if (asUTF8 && this.options.binary) {
          result = out.utf8decode(result);
        } else {
          result = utils.transformTo("string", result);
        }
        if (!asUTF8 && !this.options.binary) {
          result = utils.transformTo("string", out.utf8encode(result));
        }
        return result;
      };
      var ZipObject = function(name, data, options) {
        this.name = name;
        this.dir = options.dir;
        this.date = options.date;
        this.comment = options.comment;
        this.unixPermissions = options.unixPermissions;
        this.dosPermissions = options.dosPermissions;
        this._data = data;
        this.options = options;
        this._initialMetadata = {
          dir: options.dir,
          date: options.date
        };
      };
      ZipObject.prototype = {
        asText: function() {
          return dataToString.call(this, true);
        },
        asBinary: function() {
          return dataToString.call(this, false);
        },
        asNodeBuffer: function() {
          var result = getBinaryData(this);
          return utils.transformTo("nodebuffer", result);
        },
        asUint8Array: function() {
          var result = getBinaryData(this);
          return utils.transformTo("uint8array", result);
        },
        asArrayBuffer: function() {
          return this.asUint8Array().buffer;
        }
      };
      var decToHex = function(dec, bytes) {
        var hex = "",
            i;
        for (i = 0; i < bytes; i++) {
          hex += String.fromCharCode(dec & 0xff);
          dec = dec >>> 8;
        }
        return hex;
      };
      var prepareFileAttrs = function(o) {
        o = o || {};
        if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
          o.binary = true;
        }
        o = utils.extend(o, defaults);
        o.date = o.date || new Date();
        if (o.compression !== null)
          o.compression = o.compression.toUpperCase();
        return o;
      };
      var fileAdd = function(name, data, o) {
        var dataType = utils.getTypeOf(data),
            parent;
        o = prepareFileAttrs(o);
        if (typeof o.unixPermissions === "string") {
          o.unixPermissions = parseInt(o.unixPermissions, 8);
        }
        if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
          o.dir = true;
        }
        if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
          o.dir = true;
        }
        if (o.dir) {
          name = forceTrailingSlash(name);
        }
        if (o.createFolders && (parent = parentFolder(name))) {
          folderAdd.call(this, parent, true);
        }
        if (o.dir || data === null || typeof data === "undefined") {
          o.base64 = false;
          o.binary = false;
          data = null;
          dataType = null;
        } else if (dataType === "string") {
          if (o.binary && !o.base64) {
            if (o.optimizedBinaryString !== true) {
              data = utils.string2binary(data);
            }
          }
        } else {
          o.base64 = false;
          o.binary = true;
          if (!dataType && !(data instanceof CompressedObject)) {
            throw new Error("The data of '" + name + "' is in an unsupported format !");
          }
          if (dataType === "arraybuffer") {
            data = utils.transformTo("uint8array", data);
          }
        }
        var object = new ZipObject(name, data, o);
        this.files[name] = object;
        return object;
      };
      var parentFolder = function(path) {
        if (path.slice(-1) == '/') {
          path = path.substring(0, path.length - 1);
        }
        var lastSlash = path.lastIndexOf('/');
        return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
      };
      var forceTrailingSlash = function(path) {
        if (path.slice(-1) != "/") {
          path += "/";
        }
        return path;
      };
      var folderAdd = function(name, createFolders) {
        createFolders = (typeof createFolders !== 'undefined') ? createFolders : false;
        name = forceTrailingSlash(name);
        if (!this.files[name]) {
          fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
          });
        }
        return this.files[name];
      };
      var generateCompressedObjectFrom = function(file, compression, compressionOptions) {
        var result = new CompressedObject(),
            content;
        if (file._data instanceof CompressedObject) {
          result.uncompressedSize = file._data.uncompressedSize;
          result.crc32 = file._data.crc32;
          if (result.uncompressedSize === 0 || file.dir) {
            compression = compressions['STORE'];
            result.compressedContent = "";
            result.crc32 = 0;
          } else if (file._data.compressionMethod === compression.magic) {
            result.compressedContent = file._data.getCompressedContent();
          } else {
            content = file._data.getContent();
            result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
          }
        } else {
          content = getBinaryData(file);
          if (!content || content.length === 0 || file.dir) {
            compression = compressions['STORE'];
            content = "";
          }
          result.uncompressedSize = content.length;
          result.crc32 = crc32(content);
          result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
        }
        result.compressedSize = result.compressedContent.length;
        result.compressionMethod = compression.magic;
        return result;
      };
      var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
        var result = unixPermissions;
        if (!unixPermissions) {
          result = isDir ? 0x41fd : 0x81b4;
        }
        return (result & 0xFFFF) << 16;
      };
      var generateDosExternalFileAttr = function(dosPermissions, isDir) {
        return (dosPermissions || 0) & 0x3F;
      };
      var generateZipParts = function(name, file, compressedObject, offset, platform, encodeFileName) {
        var data = compressedObject.compressedContent,
            useCustomEncoding = encodeFileName !== utf8.utf8encode,
            encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
            utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
            comment = file.comment || "",
            encodedComment = utils.transformTo("string", encodeFileName(comment)),
            utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
            useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
            useUTF8ForComment = utfEncodedComment.length !== comment.length,
            o = file.options,
            dosTime,
            dosDate,
            extraFields = "",
            unicodePathExtraField = "",
            unicodeCommentExtraField = "",
            dir,
            date;
        if (file._initialMetadata.dir !== file.dir) {
          dir = file.dir;
        } else {
          dir = o.dir;
        }
        if (file._initialMetadata.date !== file.date) {
          date = file.date;
        } else {
          date = o.date;
        }
        var extFileAttr = 0;
        var versionMadeBy = 0;
        if (dir) {
          extFileAttr |= 0x00010;
        }
        if (platform === "UNIX") {
          versionMadeBy = 0x031E;
          extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
        } else {
          versionMadeBy = 0x0014;
          extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
        }
        dosTime = date.getHours();
        dosTime = dosTime << 6;
        dosTime = dosTime | date.getMinutes();
        dosTime = dosTime << 5;
        dosTime = dosTime | date.getSeconds() / 2;
        dosDate = date.getFullYear() - 1980;
        dosDate = dosDate << 4;
        dosDate = dosDate | (date.getMonth() + 1);
        dosDate = dosDate << 5;
        dosDate = dosDate | date.getDate();
        if (useUTF8ForFileName) {
          unicodePathExtraField = decToHex(1, 1) + decToHex(crc32(encodedFileName), 4) + utfEncodedFileName;
          extraFields += "\x75\x70" + decToHex(unicodePathExtraField.length, 2) + unicodePathExtraField;
        }
        if (useUTF8ForComment) {
          unicodeCommentExtraField = decToHex(1, 1) + decToHex(this.crc32(encodedComment), 4) + utfEncodedComment;
          extraFields += "\x75\x63" + decToHex(unicodeCommentExtraField.length, 2) + unicodeCommentExtraField;
        }
        var header = "";
        header += "\x0A\x00";
        header += !useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment) ? "\x00\x08" : "\x00\x00";
        header += compressedObject.compressionMethod;
        header += decToHex(dosTime, 2);
        header += decToHex(dosDate, 2);
        header += decToHex(compressedObject.crc32, 4);
        header += decToHex(compressedObject.compressedSize, 4);
        header += decToHex(compressedObject.uncompressedSize, 4);
        header += decToHex(encodedFileName.length, 2);
        header += decToHex(extraFields.length, 2);
        var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
        var dirRecord = signature.CENTRAL_FILE_HEADER + decToHex(versionMadeBy, 2) + header + decToHex(encodedComment.length, 2) + "\x00\x00" + "\x00\x00" + decToHex(extFileAttr, 4) + decToHex(offset, 4) + encodedFileName + extraFields + encodedComment;
        return {
          fileRecord: fileRecord,
          dirRecord: dirRecord,
          compressedObject: compressedObject
        };
      };
      var out = {
        load: function(stream, options) {
          throw new Error("Load method is not defined. Is the file jszip-load.js included ?");
        },
        filter: function(search) {
          var result = [],
              filename,
              relativePath,
              file,
              fileClone;
          for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
              continue;
            }
            file = this.files[filename];
            fileClone = new ZipObject(file.name, file._data, utils.extend(file.options));
            relativePath = filename.slice(this.root.length, filename.length);
            if (filename.slice(0, this.root.length) === this.root && search(relativePath, fileClone)) {
              result.push(fileClone);
            }
          }
          return result;
        },
        file: function(name, data, o) {
          if (arguments.length === 1) {
            if (utils.isRegExp(name)) {
              var regexp = name;
              return this.filter(function(relativePath, file) {
                return !file.dir && regexp.test(relativePath);
              });
            } else {
              return this.filter(function(relativePath, file) {
                return !file.dir && relativePath === name;
              })[0] || null;
            }
          } else {
            name = this.root + name;
            fileAdd.call(this, name, data, o);
          }
          return this;
        },
        folder: function(arg) {
          if (!arg) {
            return this;
          }
          if (utils.isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
              return file.dir && arg.test(relativePath);
            });
          }
          var name = this.root + arg;
          var newFolder = folderAdd.call(this, name);
          var ret = this.clone();
          ret.root = newFolder.name;
          return ret;
        },
        remove: function(name) {
          name = this.root + name;
          var file = this.files[name];
          if (!file) {
            if (name.slice(-1) != "/") {
              name += "/";
            }
            file = this.files[name];
          }
          if (file && !file.dir) {
            delete this.files[name];
          } else {
            var kids = this.filter(function(relativePath, file) {
              return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
              delete this.files[kids[i].name];
            }
          }
          return this;
        },
        generate: function(options) {
          options = utils.extend(options || {}, {
            base64: true,
            compression: "STORE",
            compressionOptions: null,
            type: "base64",
            platform: "DOS",
            comment: null,
            mimeType: 'application/zip',
            encodeFileName: utf8.utf8encode
          });
          utils.checkSupport(options.type);
          if (options.platform === 'darwin' || options.platform === 'freebsd' || options.platform === 'linux' || options.platform === 'sunos') {
            options.platform = "UNIX";
          }
          if (options.platform === 'win32') {
            options.platform = "DOS";
          }
          var zipData = [],
              localDirLength = 0,
              centralDirLength = 0,
              writer,
              i,
              encodedComment = utils.transformTo("string", options.encodeFileName(options.comment || this.comment || ""));
          for (var name in this.files) {
            if (!this.files.hasOwnProperty(name)) {
              continue;
            }
            var file = this.files[name];
            var compressionName = file.options.compression || options.compression.toUpperCase();
            var compression = compressions[compressionName];
            if (!compression) {
              throw new Error(compressionName + " is not a valid compression method !");
            }
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var compressedObject = generateCompressedObjectFrom.call(this, file, compression, compressionOptions);
            var zipPart = generateZipParts.call(this, name, file, compressedObject, localDirLength, options.platform, options.encodeFileName);
            localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize;
            centralDirLength += zipPart.dirRecord.length;
            zipData.push(zipPart);
          }
          var dirEnd = "";
          dirEnd = signature.CENTRAL_DIRECTORY_END + "\x00\x00" + "\x00\x00" + decToHex(zipData.length, 2) + decToHex(zipData.length, 2) + decToHex(centralDirLength, 4) + decToHex(localDirLength, 4) + decToHex(encodedComment.length, 2) + encodedComment;
          var typeName = options.type.toLowerCase();
          if (typeName === "uint8array" || typeName === "arraybuffer" || typeName === "blob" || typeName === "nodebuffer") {
            writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length);
          } else {
            writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length);
          }
          for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].fileRecord);
            writer.append(zipData[i].compressedObject.compressedContent);
          }
          for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].dirRecord);
          }
          writer.append(dirEnd);
          var zip = writer.finalize();
          switch (options.type.toLowerCase()) {
            case "uint8array":
            case "arraybuffer":
            case "nodebuffer":
              return utils.transformTo(options.type.toLowerCase(), zip);
            case "blob":
              return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip), options.mimeType);
            case "base64":
              return (options.base64) ? base64.encode(zip) : zip;
            default:
              return zip;
          }
        },
        crc32: function(input, crc) {
          return crc32(input, crc);
        },
        utf8encode: function(string) {
          return utils.transformTo("string", utf8.utf8encode(string));
        },
        utf8decode: function(input) {
          return utf8.utf8decode(input);
        }
      };
      module.exports = out;
    }, {
      "./base64": 2,
      "./compressedObject": 3,
      "./compressions": 4,
      "./crc32": 5,
      "./defaults": 7,
      "./nodeBuffer": 12,
      "./signature": 15,
      "./stringWriter": 17,
      "./support": 18,
      "./uint8ArrayWriter": 20,
      "./utf8": 21,
      "./utils": 22
    }],
    15: [function(require, module, exports) {
      'use strict';
      exports.LOCAL_FILE_HEADER = "PK\x03\x04";
      exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
      exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
      exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
      exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
      exports.DATA_DESCRIPTOR = "PK\x07\x08";
    }, {}],
    16: [function(require, module, exports) {
      'use strict';
      var DataReader = require('./dataReader');
      var utils = require('./utils');
      function StringReader(data, optimizedBinaryString) {
        this.data = data;
        if (!optimizedBinaryString) {
          this.data = utils.string2binary(this.data);
        }
        this.length = this.data.length;
        this.index = 0;
        this.zero = 0;
      }
      StringReader.prototype = new DataReader();
      StringReader.prototype.byteAt = function(i) {
        return this.data.charCodeAt(this.zero + i);
      };
      StringReader.prototype.lastIndexOfSignature = function(sig) {
        return this.data.lastIndexOf(sig) - this.zero;
      };
      StringReader.prototype.readData = function(size) {
        this.checkOffset(size);
        var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
        this.index += size;
        return result;
      };
      module.exports = StringReader;
    }, {
      "./dataReader": 6,
      "./utils": 22
    }],
    17: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      var StringWriter = function() {
        this.data = [];
      };
      StringWriter.prototype = {
        append: function(input) {
          input = utils.transformTo("string", input);
          this.data.push(input);
        },
        finalize: function() {
          return this.data.join("");
        }
      };
      module.exports = StringWriter;
    }, {"./utils": 22}],
    18: [function(require, module, exports) {
      (function(Buffer) {
        'use strict';
        exports.base64 = true;
        exports.array = true;
        exports.string = true;
        exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
        exports.nodebuffer = typeof Buffer !== "undefined";
        exports.uint8array = typeof Uint8Array !== "undefined";
        if (typeof ArrayBuffer === "undefined") {
          exports.blob = false;
        } else {
          var buffer = new ArrayBuffer(0);
          try {
            exports.blob = new Blob([buffer], {type: "application/zip"}).size === 0;
          } catch (e) {
            try {
              var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
              var builder = new Builder();
              builder.append(buffer);
              exports.blob = builder.getBlob('application/zip').size === 0;
            } catch (e) {
              exports.blob = false;
            }
          }
        }
      }).call(this, (typeof Buffer !== "undefined" ? Buffer : undefined));
    }, {}],
    19: [function(require, module, exports) {
      'use strict';
      var ArrayReader = require('./arrayReader');
      function Uint8ArrayReader(data) {
        if (data) {
          this.data = data;
          this.length = this.data.length;
          this.index = 0;
          this.zero = 0;
        }
      }
      Uint8ArrayReader.prototype = new ArrayReader();
      Uint8ArrayReader.prototype.readData = function(size) {
        this.checkOffset(size);
        if (size === 0) {
          return new Uint8Array(0);
        }
        var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
        this.index += size;
        return result;
      };
      module.exports = Uint8ArrayReader;
    }, {"./arrayReader": 1}],
    20: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      var Uint8ArrayWriter = function(length) {
        this.data = new Uint8Array(length);
        this.index = 0;
      };
      Uint8ArrayWriter.prototype = {
        append: function(input) {
          if (input.length !== 0) {
            input = utils.transformTo("uint8array", input);
            this.data.set(input, this.index);
            this.index += input.length;
          }
        },
        finalize: function() {
          return this.data;
        }
      };
      module.exports = Uint8ArrayWriter;
    }, {"./utils": 22}],
    21: [function(require, module, exports) {
      'use strict';
      var utils = require('./utils');
      var support = require('./support');
      var nodeBuffer = require('./nodeBuffer');
      var _utf8len = new Array(256);
      for (var i = 0; i < 256; i++) {
        _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
      }
      _utf8len[254] = _utf8len[254] = 1;
      var string2buf = function(str) {
        var buf,
            c,
            c2,
            m_pos,
            i,
            str_len = str.length,
            buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
        }
        if (support.uint8array) {
          buf = new Uint8Array(buf_len);
        } else {
          buf = new Array(buf_len);
        }
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          if (c < 0x80) {
            buf[i++] = c;
          } else if (c < 0x800) {
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
          } else if (c < 0x10000) {
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          } else {
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          }
        }
        return buf;
      };
      var utf8border = function(buf, max) {
        var pos;
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return (pos + _utf8len[buf[pos]] > max) ? pos : max;
      };
      var buf2string = function(buf) {
        var str,
            i,
            out,
            c,
            c_len;
        var len = buf.length;
        var utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          c = buf[i++];
          if (c < 0x80) {
            utf16buf[out++] = c;
            continue;
          }
          c_len = _utf8len[c];
          if (c_len > 4) {
            utf16buf[out++] = 0xfffd;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
          while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 0xfffd;
            continue;
          }
          if (c < 0x10000) {
            utf16buf[out++] = c;
          } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
          }
        }
        if (utf16buf.length !== out) {
          if (utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
          } else {
            utf16buf.length = out;
          }
        }
        return utils.applyFromCharCode(utf16buf);
      };
      exports.utf8encode = function utf8encode(str) {
        if (support.nodebuffer) {
          return nodeBuffer(str, "utf-8");
        }
        return string2buf(str);
      };
      exports.utf8decode = function utf8decode(buf) {
        if (support.nodebuffer) {
          return utils.transformTo("nodebuffer", buf).toString("utf-8");
        }
        buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
        var result = [],
            k = 0,
            len = buf.length,
            chunk = 65536;
        while (k < len) {
          var nextBoundary = utf8border(buf, Math.min(k + chunk, len));
          if (support.uint8array) {
            result.push(buf2string(buf.subarray(k, nextBoundary)));
          } else {
            result.push(buf2string(buf.slice(k, nextBoundary)));
          }
          k = nextBoundary;
        }
        return result.join("");
      };
    }, {
      "./nodeBuffer": 12,
      "./support": 18,
      "./utils": 22
    }],
    22: [function(require, module, exports) {
      'use strict';
      var support = require('./support');
      var compressions = require('./compressions');
      var nodeBuffer = require('./nodeBuffer');
      exports.string2binary = function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
          result += String.fromCharCode(str.charCodeAt(i) & 0xff);
        }
        return result;
      };
      exports.arrayBuffer2Blob = function(buffer, mimeType) {
        exports.checkSupport("blob");
        mimeType = mimeType || 'application/zip';
        try {
          return new Blob([buffer], {type: mimeType});
        } catch (e) {
          try {
            var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            return builder.getBlob(mimeType);
          } catch (e) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      function identity(input) {
        return input;
      }
      function stringToArrayLike(str, array) {
        for (var i = 0; i < str.length; ++i) {
          array[i] = str.charCodeAt(i) & 0xFF;
        }
        return array;
      }
      function arrayLikeToString(array) {
        var chunk = 65536;
        var result = [],
            len = array.length,
            type = exports.getTypeOf(array),
            k = 0,
            canUseApply = true;
        try {
          switch (type) {
            case "uint8array":
              String.fromCharCode.apply(null, new Uint8Array(0));
              break;
            case "nodebuffer":
              String.fromCharCode.apply(null, nodeBuffer(0));
              break;
          }
        } catch (e) {
          canUseApply = false;
        }
        if (!canUseApply) {
          var resultStr = "";
          for (var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
          }
          return resultStr;
        }
        while (k < len && chunk > 1) {
          try {
            if (type === "array" || type === "nodebuffer") {
              result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            } else {
              result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
          } catch (e) {
            chunk = Math.floor(chunk / 2);
          }
        }
        return result.join("");
      }
      exports.applyFromCharCode = arrayLikeToString;
      function arrayLikeToArrayLike(arrayFrom, arrayTo) {
        for (var i = 0; i < arrayFrom.length; i++) {
          arrayTo[i] = arrayFrom[i];
        }
        return arrayTo;
      }
      var transform = {};
      transform["string"] = {
        "string": identity,
        "array": function(input) {
          return stringToArrayLike(input, new Array(input.length));
        },
        "arraybuffer": function(input) {
          return transform["string"]["uint8array"](input).buffer;
        },
        "uint8array": function(input) {
          return stringToArrayLike(input, new Uint8Array(input.length));
        },
        "nodebuffer": function(input) {
          return stringToArrayLike(input, nodeBuffer(input.length));
        }
      };
      transform["array"] = {
        "string": arrayLikeToString,
        "array": identity,
        "arraybuffer": function(input) {
          return (new Uint8Array(input)).buffer;
        },
        "uint8array": function(input) {
          return new Uint8Array(input);
        },
        "nodebuffer": function(input) {
          return nodeBuffer(input);
        }
      };
      transform["arraybuffer"] = {
        "string": function(input) {
          return arrayLikeToString(new Uint8Array(input));
        },
        "array": function(input) {
          return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
        },
        "arraybuffer": identity,
        "uint8array": function(input) {
          return new Uint8Array(input);
        },
        "nodebuffer": function(input) {
          return nodeBuffer(new Uint8Array(input));
        }
      };
      transform["uint8array"] = {
        "string": arrayLikeToString,
        "array": function(input) {
          return arrayLikeToArrayLike(input, new Array(input.length));
        },
        "arraybuffer": function(input) {
          return input.buffer;
        },
        "uint8array": identity,
        "nodebuffer": function(input) {
          return nodeBuffer(input);
        }
      };
      transform["nodebuffer"] = {
        "string": arrayLikeToString,
        "array": function(input) {
          return arrayLikeToArrayLike(input, new Array(input.length));
        },
        "arraybuffer": function(input) {
          return transform["nodebuffer"]["uint8array"](input).buffer;
        },
        "uint8array": function(input) {
          return arrayLikeToArrayLike(input, new Uint8Array(input.length));
        },
        "nodebuffer": identity
      };
      exports.transformTo = function(outputType, input) {
        if (!input) {
          input = "";
        }
        if (!outputType) {
          return input;
        }
        exports.checkSupport(outputType);
        var inputType = exports.getTypeOf(input);
        var result = transform[inputType][outputType](input);
        return result;
      };
      exports.getTypeOf = function(input) {
        if (typeof input === "string") {
          return "string";
        }
        if (Object.prototype.toString.call(input) === "[object Array]") {
          return "array";
        }
        if (support.nodebuffer && nodeBuffer.test(input)) {
          return "nodebuffer";
        }
        if (support.uint8array && input instanceof Uint8Array) {
          return "uint8array";
        }
        if (support.arraybuffer && input instanceof ArrayBuffer) {
          return "arraybuffer";
        }
      };
      exports.checkSupport = function(type) {
        var supported = support[type.toLowerCase()];
        if (!supported) {
          throw new Error(type + " is not supported by this browser");
        }
      };
      exports.MAX_VALUE_16BITS = 65535;
      exports.MAX_VALUE_32BITS = -1;
      exports.pretty = function(str) {
        var res = '',
            code,
            i;
        for (i = 0; i < (str || "").length; i++) {
          code = str.charCodeAt(i);
          res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
        }
        return res;
      };
      exports.findCompression = function(compressionMethod) {
        for (var method in compressions) {
          if (!compressions.hasOwnProperty(method)) {
            continue;
          }
          if (compressions[method].magic === compressionMethod) {
            return compressions[method];
          }
        }
        return null;
      };
      exports.isRegExp = function(object) {
        return Object.prototype.toString.call(object) === "[object RegExp]";
      };
      exports.extend = function() {
        var result = {},
            i,
            attr;
        for (i = 0; i < arguments.length; i++) {
          for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
              result[attr] = arguments[i][attr];
            }
          }
        }
        return result;
      };
    }, {
      "./compressions": 4,
      "./nodeBuffer": 12,
      "./support": 18
    }],
    23: [function(require, module, exports) {
      'use strict';
      var StringReader = require('./stringReader');
      var NodeBufferReader = require('./nodeBufferReader');
      var Uint8ArrayReader = require('./uint8ArrayReader');
      var ArrayReader = require('./arrayReader');
      var utils = require('./utils');
      var sig = require('./signature');
      var ZipEntry = require('./zipEntry');
      var support = require('./support');
      var jszipProto = require('./object');
      function ZipEntries(data, loadOptions) {
        this.files = [];
        this.loadOptions = loadOptions;
        if (data) {
          this.load(data);
        }
      }
      ZipEntries.prototype = {
        checkSignature: function(expectedSignature) {
          var signature = this.reader.readString(4);
          if (signature !== expectedSignature) {
            throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
          }
        },
        isSignature: function(askedIndex, expectedSignature) {
          var currentIndex = this.reader.index;
          this.reader.setIndex(askedIndex);
          var signature = this.reader.readString(4);
          var result = signature === expectedSignature;
          this.reader.setIndex(currentIndex);
          return result;
        },
        readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2);
          this.diskWithCentralDirStart = this.reader.readInt(2);
          this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
          this.centralDirRecords = this.reader.readInt(2);
          this.centralDirSize = this.reader.readInt(4);
          this.centralDirOffset = this.reader.readInt(4);
          this.zipCommentLength = this.reader.readInt(2);
          var zipComment = this.reader.readData(this.zipCommentLength);
          var decodeParamType = support.uint8array ? "uint8array" : "array";
          var decodeContent = utils.transformTo(decodeParamType, zipComment);
          this.zipComment = this.loadOptions.decodeFileName(decodeContent);
        },
        readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8);
          this.versionMadeBy = this.reader.readString(2);
          this.versionNeeded = this.reader.readInt(2);
          this.diskNumber = this.reader.readInt(4);
          this.diskWithCentralDirStart = this.reader.readInt(4);
          this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
          this.centralDirRecords = this.reader.readInt(8);
          this.centralDirSize = this.reader.readInt(8);
          this.centralDirOffset = this.reader.readInt(8);
          this.zip64ExtensibleData = {};
          var extraDataSize = this.zip64EndOfCentralSize - 44,
              index = 0,
              extraFieldId,
              extraFieldLength,
              extraFieldValue;
          while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readString(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
              id: extraFieldId,
              length: extraFieldLength,
              value: extraFieldValue
            };
          }
        },
        readBlockZip64EndOfCentralLocator: function() {
          this.diskWithZip64CentralDirStart = this.reader.readInt(4);
          this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
          this.disksCount = this.reader.readInt(4);
          if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
          }
        },
        readLocalFiles: function() {
          var i,
              file;
          for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
          }
        },
        readCentralDir: function() {
          var file;
          this.reader.setIndex(this.centralDirOffset);
          while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
            file = new ZipEntry({zip64: this.zip64}, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
          }
          if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
              throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {}
          }
        },
        readEndOfCentral: function() {
          var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
          if (offset < 0) {
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
            if (isGarbage) {
              throw new Error("Can't find end of central directory : is this a zip file ? " + "If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
              throw new Error("Corrupted zip : can't find end of central directory");
            }
          }
          this.reader.setIndex(offset);
          var endOfCentralDirOffset = offset;
          this.checkSignature(sig.CENTRAL_DIRECTORY_END);
          this.readBlockEndOfCentral();
          if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
              throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
              this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
              if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");
              }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
          }
          var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
          if (this.zip64) {
            expectedEndOfCentralDirOffset += 20;
            expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
          }
          var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
          if (extraBytes > 0) {
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {} else {
              this.reader.zero = extraBytes;
            }
          } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
          }
        },
        prepareReader: function(data) {
          var type = utils.getTypeOf(data);
          utils.checkSupport(type);
          if (type === "string" && !support.uint8array) {
            this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
          } else if (type === "nodebuffer") {
            this.reader = new NodeBufferReader(data);
          } else if (support.uint8array) {
            this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data));
          } else if (support.array) {
            this.reader = new ArrayReader(utils.transformTo("array", data));
          } else {
            throw new Error("Unexpected error: unsupported type '" + type + "'");
          }
        },
        load: function(data) {
          this.prepareReader(data);
          this.readEndOfCentral();
          this.readCentralDir();
          this.readLocalFiles();
        }
      };
      module.exports = ZipEntries;
    }, {
      "./arrayReader": 1,
      "./nodeBufferReader": 13,
      "./object": 14,
      "./signature": 15,
      "./stringReader": 16,
      "./support": 18,
      "./uint8ArrayReader": 19,
      "./utils": 22,
      "./zipEntry": 24
    }],
    24: [function(require, module, exports) {
      'use strict';
      var StringReader = require('./stringReader');
      var utils = require('./utils');
      var CompressedObject = require('./compressedObject');
      var jszipProto = require('./object');
      var support = require('./support');
      var MADE_BY_DOS = 0x00;
      var MADE_BY_UNIX = 0x03;
      function ZipEntry(options, loadOptions) {
        this.options = options;
        this.loadOptions = loadOptions;
      }
      ZipEntry.prototype = {
        isEncrypted: function() {
          return (this.bitFlag & 0x0001) === 0x0001;
        },
        useUTF8: function() {
          return (this.bitFlag & 0x0800) === 0x0800;
        },
        prepareCompressedContent: function(reader, from, length) {
          return function() {
            var previousIndex = reader.index;
            reader.setIndex(from);
            var compressedFileData = reader.readData(length);
            reader.setIndex(previousIndex);
            return compressedFileData;
          };
        },
        prepareContent: function(reader, from, length, compression, uncompressedSize) {
          return function() {
            var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
            var uncompressedFileData = compression.uncompress(compressedFileData);
            if (uncompressedFileData.length !== uncompressedSize) {
              throw new Error("Bug : uncompressed data size mismatch");
            }
            return uncompressedFileData;
          };
        },
        readLocalPart: function(reader) {
          var compression,
              localExtraFieldsLength;
          reader.skip(22);
          this.fileNameLength = reader.readInt(2);
          localExtraFieldsLength = reader.readInt(2);
          this.fileName = reader.readData(this.fileNameLength);
          reader.skip(localExtraFieldsLength);
          if (this.compressedSize == -1 || this.uncompressedSize == -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)");
          }
          compression = utils.findCompression(this.compressionMethod);
          if (compression === null) {
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
          }
          this.decompressed = new CompressedObject();
          this.decompressed.compressedSize = this.compressedSize;
          this.decompressed.uncompressedSize = this.uncompressedSize;
          this.decompressed.crc32 = this.crc32;
          this.decompressed.compressionMethod = this.compressionMethod;
          this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
          this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize);
          if (this.loadOptions.checkCRC32) {
            this.decompressed = utils.transformTo("string", this.decompressed.getContent());
            if (jszipProto.crc32(this.decompressed) !== this.crc32) {
              throw new Error("Corrupted zip : CRC32 mismatch");
            }
          }
        },
        readCentralPart: function(reader) {
          this.versionMadeBy = reader.readInt(2);
          this.versionNeeded = reader.readInt(2);
          this.bitFlag = reader.readInt(2);
          this.compressionMethod = reader.readString(2);
          this.date = reader.readDate();
          this.crc32 = reader.readInt(4);
          this.compressedSize = reader.readInt(4);
          this.uncompressedSize = reader.readInt(4);
          this.fileNameLength = reader.readInt(2);
          this.extraFieldsLength = reader.readInt(2);
          this.fileCommentLength = reader.readInt(2);
          this.diskNumberStart = reader.readInt(2);
          this.internalFileAttributes = reader.readInt(2);
          this.externalFileAttributes = reader.readInt(4);
          this.localHeaderOffset = reader.readInt(4);
          if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
          }
          this.fileName = reader.readData(this.fileNameLength);
          this.readExtraFields(reader);
          this.parseZIP64ExtraField(reader);
          this.fileComment = reader.readData(this.fileCommentLength);
        },
        processAttributes: function() {
          this.unixPermissions = null;
          this.dosPermissions = null;
          var madeBy = this.versionMadeBy >> 8;
          this.dir = this.externalFileAttributes & 0x0010 ? true : false;
          if (madeBy === MADE_BY_DOS) {
            this.dosPermissions = this.externalFileAttributes & 0x3F;
          }
          if (madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
          }
          if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
          }
        },
        parseZIP64ExtraField: function(reader) {
          if (!this.extraFields[0x0001]) {
            return;
          }
          var extraReader = new StringReader(this.extraFields[0x0001].value);
          if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
          }
          if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
          }
          if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
          }
          if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
          }
        },
        readExtraFields: function(reader) {
          var start = reader.index,
              extraFieldId,
              extraFieldLength,
              extraFieldValue;
          this.extraFields = this.extraFields || {};
          while (reader.index < start + this.extraFieldsLength) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readString(extraFieldLength);
            this.extraFields[extraFieldId] = {
              id: extraFieldId,
              length: extraFieldLength,
              value: extraFieldValue
            };
          }
        },
        handleUTF8: function() {
          var decodeParamType = support.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) {
            this.fileNameStr = jszipProto.utf8decode(this.fileName);
            this.fileCommentStr = jszipProto.utf8decode(this.fileComment);
          } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
              this.fileNameStr = upath;
            } else {
              var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }
            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
              this.fileCommentStr = ucomment;
            } else {
              var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
          }
        },
        findExtraFieldUnicodePath: function() {
          var upathField = this.extraFields[0x7075];
          if (upathField) {
            var extraReader = new StringReader(upathField.value);
            if (extraReader.readInt(1) !== 1) {
              return null;
            }
            if (jszipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
              return null;
            }
            return jszipProto.utf8decode(extraReader.readString(upathField.length - 5));
          }
          return null;
        },
        findExtraFieldUnicodeComment: function() {
          var ucommentField = this.extraFields[0x6375];
          if (ucommentField) {
            var extraReader = new StringReader(ucommentField.value);
            if (extraReader.readInt(1) !== 1) {
              return null;
            }
            if (jszipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
              return null;
            }
            return jszipProto.utf8decode(extraReader.readString(ucommentField.length - 5));
          }
          return null;
        }
      };
      module.exports = ZipEntry;
    }, {
      "./compressedObject": 3,
      "./object": 14,
      "./stringReader": 16,
      "./support": 18,
      "./utils": 22
    }],
    25: [function(require, module, exports) {
      'use strict';
      var assign = require('./lib/utils/common').assign;
      var deflate = require('./lib/deflate');
      var inflate = require('./lib/inflate');
      var constants = require('./lib/zlib/constants');
      var pako = {};
      assign(pako, deflate, inflate, constants);
      module.exports = pako;
    }, {
      "./lib/deflate": 26,
      "./lib/inflate": 27,
      "./lib/utils/common": 28,
      "./lib/zlib/constants": 31
    }],
    26: [function(require, module, exports) {
      'use strict';
      var zlib_deflate = require('./zlib/deflate');
      var utils = require('./utils/common');
      var strings = require('./utils/strings');
      var msg = require('./zlib/messages');
      var ZStream = require('./zlib/zstream');
      var toString = Object.prototype.toString;
      var Z_NO_FLUSH = 0;
      var Z_FINISH = 4;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_SYNC_FLUSH = 2;
      var Z_DEFAULT_COMPRESSION = -1;
      var Z_DEFAULT_STRATEGY = 0;
      var Z_DEFLATED = 8;
      function Deflate(options) {
        if (!(this instanceof Deflate))
          return new Deflate(options);
        this.options = utils.assign({
          level: Z_DEFAULT_COMPRESSION,
          method: Z_DEFLATED,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Z_DEFAULT_STRATEGY,
          to: ''
        }, options || {});
        var opt = this.options;
        if (opt.raw && (opt.windowBits > 0)) {
          opt.windowBits = -opt.windowBits;
        } else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
          opt.windowBits += 16;
        }
        this.err = 0;
        this.msg = '';
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
        if (opt.header) {
          zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
        if (opt.dictionary) {
          var dict;
          if (typeof opt.dictionary === 'string') {
            dict = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
            dict = new Uint8Array(opt.dictionary);
          } else {
            dict = opt.dictionary;
          }
          status = zlib_deflate.deflateSetDictionary(this.strm, dict);
          if (status !== Z_OK) {
            throw new Error(msg[status]);
          }
          this._dict_set = true;
        }
      }
      Deflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var status,
            _mode;
        if (this.ended) {
          return false;
        }
        _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);
        if (typeof data === 'string') {
          strm.input = strings.string2buf(data);
        } else if (toString.call(data) === '[object ArrayBuffer]') {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_deflate.deflate(strm, _mode);
          if (status !== Z_STREAM_END && status !== Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
            if (this.options.to === 'string') {
              this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
            } else {
              this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            }
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
        if (_mode === Z_FINISH) {
          status = zlib_deflate.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK;
        }
        if (_mode === Z_SYNC_FLUSH) {
          this.onEnd(Z_OK);
          strm.avail_out = 0;
          return true;
        }
        return true;
      };
      Deflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate.prototype.onEnd = function(status) {
        if (status === Z_OK) {
          if (this.options.to === 'string') {
            this.result = this.chunks.join('');
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function deflate(input, options) {
        var deflator = new Deflate(options);
        deflator.push(input, true);
        if (deflator.err) {
          throw deflator.msg;
        }
        return deflator.result;
      }
      function deflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return deflate(input, options);
      }
      function gzip(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate(input, options);
      }
      exports.Deflate = Deflate;
      exports.deflate = deflate;
      exports.deflateRaw = deflateRaw;
      exports.gzip = gzip;
    }, {
      "./utils/common": 28,
      "./utils/strings": 29,
      "./zlib/deflate": 33,
      "./zlib/messages": 38,
      "./zlib/zstream": 40
    }],
    27: [function(require, module, exports) {
      'use strict';
      var zlib_inflate = require('./zlib/inflate');
      var utils = require('./utils/common');
      var strings = require('./utils/strings');
      var c = require('./zlib/constants');
      var msg = require('./zlib/messages');
      var ZStream = require('./zlib/zstream');
      var GZheader = require('./zlib/gzheader');
      var toString = Object.prototype.toString;
      function Inflate(options) {
        if (!(this instanceof Inflate))
          return new Inflate(options);
        this.options = utils.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ''
        }, options || {});
        var opt = this.options;
        if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) {
            opt.windowBits = -15;
          }
        }
        if ((opt.windowBits >= 0) && (opt.windowBits < 16) && !(options && options.windowBits)) {
          opt.windowBits += 32;
        }
        if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
        this.err = 0;
        this.msg = '';
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
        this.header = new GZheader();
        zlib_inflate.inflateGetHeader(this.strm, this.header);
      }
      Inflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var dictionary = this.options.dictionary;
        var status,
            _mode;
        var next_out_utf8,
            tail,
            utf8str;
        var dict;
        var allowBufError = false;
        if (this.ended) {
          return false;
        }
        _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);
        if (typeof data === 'string') {
          strm.input = strings.binstring2buf(data);
        } else if (toString.call(data) === '[object ArrayBuffer]') {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
          if (status === c.Z_NEED_DICT && dictionary) {
            if (typeof dictionary === 'string') {
              dict = strings.string2buf(dictionary);
            } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
              dict = new Uint8Array(dictionary);
            } else {
              dict = dictionary;
            }
            status = zlib_inflate.inflateSetDictionary(this.strm, dict);
          }
          if (status === c.Z_BUF_ERROR && allowBufError === true) {
            status = c.Z_OK;
            allowBufError = false;
          }
          if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {
              if (this.options.to === 'string') {
                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                tail = strm.next_out - next_out_utf8;
                utf8str = strings.buf2string(strm.output, next_out_utf8);
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) {
                  utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
                }
                this.onData(utf8str);
              } else {
                this.onData(utils.shrinkBuf(strm.output, strm.next_out));
              }
            }
          }
          if (strm.avail_in === 0 && strm.avail_out === 0) {
            allowBufError = true;
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
        if (status === c.Z_STREAM_END) {
          _mode = c.Z_FINISH;
        }
        if (_mode === c.Z_FINISH) {
          status = zlib_inflate.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === c.Z_OK;
        }
        if (_mode === c.Z_SYNC_FLUSH) {
          this.onEnd(c.Z_OK);
          strm.avail_out = 0;
          return true;
        }
        return true;
      };
      Inflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate.prototype.onEnd = function(status) {
        if (status === c.Z_OK) {
          if (this.options.to === 'string') {
            this.result = this.chunks.join('');
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function inflate(input, options) {
        var inflator = new Inflate(options);
        inflator.push(input, true);
        if (inflator.err) {
          throw inflator.msg;
        }
        return inflator.result;
      }
      function inflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return inflate(input, options);
      }
      exports.Inflate = Inflate;
      exports.inflate = inflate;
      exports.inflateRaw = inflateRaw;
      exports.ungzip = inflate;
    }, {
      "./utils/common": 28,
      "./utils/strings": 29,
      "./zlib/constants": 31,
      "./zlib/gzheader": 34,
      "./zlib/inflate": 36,
      "./zlib/messages": 38,
      "./zlib/zstream": 40
    }],
    28: [function(require, module, exports) {
      'use strict';
      var TYPED_OK = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Int32Array !== 'undefined');
      exports.assign = function(obj) {
        var sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          var source = sources.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== 'object') {
            throw new TypeError(source + 'must be non-object');
          }
          for (var p in source) {
            if (source.hasOwnProperty(p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };
      exports.shrinkBuf = function(buf, size) {
        if (buf.length === size) {
          return buf;
        }
        if (buf.subarray) {
          return buf.subarray(0, size);
        }
        buf.length = size;
        return buf;
      };
      var fnTyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          if (src.subarray && dest.subarray) {
            dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
            return;
          }
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        flattenChunks: function(chunks) {
          var i,
              l,
              len,
              pos,
              chunk,
              result;
          len = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            len += chunks[i].length;
          }
          result = new Uint8Array(len);
          pos = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            chunk = chunks[i];
            result.set(chunk, pos);
            pos += chunk.length;
          }
          return result;
        }
      };
      var fnUntyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        flattenChunks: function(chunks) {
          return [].concat.apply([], chunks);
        }
      };
      exports.setTyped = function(on) {
        if (on) {
          exports.Buf8 = Uint8Array;
          exports.Buf16 = Uint16Array;
          exports.Buf32 = Int32Array;
          exports.assign(exports, fnTyped);
        } else {
          exports.Buf8 = Array;
          exports.Buf16 = Array;
          exports.Buf32 = Array;
          exports.assign(exports, fnUntyped);
        }
      };
      exports.setTyped(TYPED_OK);
    }, {}],
    29: [function(require, module, exports) {
      'use strict';
      var utils = require('./common');
      var STR_APPLY_OK = true;
      var STR_APPLY_UIA_OK = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (__) {
        STR_APPLY_OK = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK = false;
      }
      var _utf8len = new utils.Buf8(256);
      for (var q = 0; q < 256; q++) {
        _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
      }
      _utf8len[254] = _utf8len[254] = 1;
      exports.string2buf = function(str) {
        var buf,
            c,
            c2,
            m_pos,
            i,
            str_len = str.length,
            buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
        }
        buf = new utils.Buf8(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          if (c < 0x80) {
            buf[i++] = c;
          } else if (c < 0x800) {
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
          } else if (c < 0x10000) {
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          } else {
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          }
        }
        return buf;
      };
      function buf2binstring(buf, len) {
        if (len < 65537) {
          if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
            return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
          }
        }
        var result = '';
        for (var i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      }
      exports.buf2binstring = function(buf) {
        return buf2binstring(buf, buf.length);
      };
      exports.binstring2buf = function(str) {
        var buf = new utils.Buf8(str.length);
        for (var i = 0,
            len = buf.length; i < len; i++) {
          buf[i] = str.charCodeAt(i);
        }
        return buf;
      };
      exports.buf2string = function(buf, max) {
        var i,
            out,
            c,
            c_len;
        var len = max || buf.length;
        var utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          c = buf[i++];
          if (c < 0x80) {
            utf16buf[out++] = c;
            continue;
          }
          c_len = _utf8len[c];
          if (c_len > 4) {
            utf16buf[out++] = 0xfffd;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
          while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 0xfffd;
            continue;
          }
          if (c < 0x10000) {
            utf16buf[out++] = c;
          } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
          }
        }
        return buf2binstring(utf16buf, out);
      };
      exports.utf8border = function(buf, max) {
        var pos;
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return (pos + _utf8len[buf[pos]] > max) ? pos : max;
      };
    }, {"./common": 28}],
    30: [function(require, module, exports) {
      'use strict';
      function adler32(adler, buf, len, pos) {
        var s1 = (adler & 0xffff) | 0,
            s2 = ((adler >>> 16) & 0xffff) | 0,
            n = 0;
        while (len !== 0) {
          n = len > 2000 ? 2000 : len;
          len -= n;
          do {
            s1 = (s1 + buf[pos++]) | 0;
            s2 = (s2 + s1) | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return (s1 | (s2 << 16)) | 0;
      }
      module.exports = adler32;
    }, {}],
    31: [function(require, module, exports) {
      'use strict';
      module.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
      };
    }, {}],
    32: [function(require, module, exports) {
      'use strict';
      function makeTable() {
        var c,
            table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
          }
          table[n] = c;
        }
        return table;
      }
      var crcTable = makeTable();
      function crc32(crc, buf, len, pos) {
        var t = crcTable,
            end = pos + len;
        crc ^= -1;
        for (var i = pos; i < end; i++) {
          crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
        }
        return (crc ^ (-1));
      }
      module.exports = crc32;
    }, {}],
    33: [function(require, module, exports) {
      'use strict';
      var utils = require('../utils/common');
      var trees = require('./trees');
      var adler32 = require('./adler32');
      var crc32 = require('./crc32');
      var msg = require('./messages');
      var Z_NO_FLUSH = 0;
      var Z_PARTIAL_FLUSH = 1;
      var Z_FULL_FLUSH = 3;
      var Z_FINISH = 4;
      var Z_BLOCK = 5;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_STREAM_ERROR = -2;
      var Z_DATA_ERROR = -3;
      var Z_BUF_ERROR = -5;
      var Z_DEFAULT_COMPRESSION = -1;
      var Z_FILTERED = 1;
      var Z_HUFFMAN_ONLY = 2;
      var Z_RLE = 3;
      var Z_FIXED = 4;
      var Z_DEFAULT_STRATEGY = 0;
      var Z_UNKNOWN = 2;
      var Z_DEFLATED = 8;
      var MAX_MEM_LEVEL = 9;
      var MAX_WBITS = 15;
      var DEF_MEM_LEVEL = 8;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);
      var PRESET_DICT = 0x20;
      var INIT_STATE = 42;
      var EXTRA_STATE = 69;
      var NAME_STATE = 73;
      var COMMENT_STATE = 91;
      var HCRC_STATE = 103;
      var BUSY_STATE = 113;
      var FINISH_STATE = 666;
      var BS_NEED_MORE = 1;
      var BS_BLOCK_DONE = 2;
      var BS_FINISH_STARTED = 3;
      var BS_FINISH_DONE = 4;
      var OS_CODE = 0x03;
      function err(strm, errorCode) {
        strm.msg = msg[errorCode];
        return errorCode;
      }
      function rank(f) {
        return ((f) << 1) - ((f) > 4 ? 9 : 0);
      }
      function zero(buf) {
        var len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      function flush_pending(strm) {
        var s = strm.state;
        var len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) {
          return;
        }
        utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      }
      function flush_block_only(s, last) {
        trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
      }
      function put_byte(s, b) {
        s.pending_buf[s.pending++] = b;
      }
      function putShortMSB(s, b) {
        s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
        s.pending_buf[s.pending++] = b & 0xff;
      }
      function read_buf(strm, buf, start, size) {
        var len = strm.avail_in;
        if (len > size) {
          len = size;
        }
        if (len === 0) {
          return 0;
        }
        strm.avail_in -= len;
        utils.arraySet(buf, strm.input, strm.next_in, len, start);
        if (strm.state.wrap === 1) {
          strm.adler = adler32(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
          strm.adler = crc32(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
      }
      function longest_match(s, cur_match) {
        var chain_length = s.max_chain_length;
        var scan = s.strstart;
        var match;
        var len;
        var best_len = s.prev_length;
        var nice_match = s.nice_match;
        var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
        var _win = s.window;
        var wmask = s.w_mask;
        var prev = s.prev;
        var strend = s.strstart + MAX_MATCH;
        var scan_end1 = _win[scan + best_len - 1];
        var scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
          nice_match = s.lookahead;
        }
        do {
          match = cur_match;
          if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
            continue;
          }
          scan += 2;
          match++;
          do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1 = _win[scan + best_len - 1];
            scan_end = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      }
      function fill_window(s) {
        var _w_size = s.w_size;
        var p,
            n,
            m,
            more,
            str;
        do {
          more = s.window_size - s.lookahead - s.strstart;
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
            utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            s.block_start -= _w_size;
            n = s.hash_size;
            p = n;
            do {
              m = s.head[--p];
              s.head[p] = (m >= _w_size ? m - _w_size : 0);
            } while (--n);
            n = _w_size;
            p = n;
            do {
              m = s.prev[--p];
              s.prev[p] = (m >= _w_size ? m - _w_size : 0);
            } while (--n);
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
          n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
          if (s.lookahead + s.insert >= MIN_MATCH) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
            while (s.insert) {
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH) {
                break;
              }
            }
          }
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      }
      function deflate_stored(s, flush) {
        var max_block_size = 0xffff;
        if (max_block_size > s.pending_buf_size - 5) {
          max_block_size = s.pending_buf_size - 5;
        }
        for (; ; ) {
          if (s.lookahead <= 1) {
            fill_window(s);
            if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.strstart += s.lookahead;
          s.lookahead = 0;
          var max_start = s.block_start + max_block_size;
          if (s.strstart === 0 || s.strstart >= max_start) {
            s.lookahead = s.strstart - max_start;
            s.strstart = max_start;
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
          if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.strstart > s.block_start) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_NEED_MORE;
      }
      function deflate_fast(s, flush) {
        var hash_head;
        var bflush;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          if (hash_head !== 0 && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
            s.match_length = longest_match(s, hash_head);
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
              s.match_length--;
              do {
                s.strstart++;
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              } while (--s.match_length !== 0);
              s.strstart++;
            } else {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;
            }
          } else {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_slow(s, flush) {
        var hash_head;
        var bflush;
        var max_insert;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH - 1;
          if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)) {
            s.match_length = longest_match(s, hash_head);
            if (s.match_length <= 5 && (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096))) {
              s.match_length = MIN_MATCH - 1;
            }
          }
          if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH;
            bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH - 1;
            s.strstart++;
            if (bflush) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
              }
            }
          } else if (s.match_available) {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
            if (bflush) {
              flush_block_only(s, false);
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          } else {
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        if (s.match_available) {
          bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_rle(s, flush) {
        var bflush;
        var prev;
        var scan,
            strend;
        var _win = s.window;
        for (; ; ) {
          if (s.lookahead <= MAX_MATCH) {
            fill_window(s);
            if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH;
              do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
              s.match_length = MAX_MATCH - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_huff(s, flush) {
        var bflush;
        for (; ; ) {
          if (s.lookahead === 0) {
            fill_window(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH) {
                return BS_NEED_MORE;
              }
              break;
            }
          }
          s.match_length = 0;
          bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
      }
      var configuration_table;
      configuration_table = [new Config(0, 0, 0, 0, deflate_stored), new Config(4, 4, 8, 4, deflate_fast), new Config(4, 5, 16, 8, deflate_fast), new Config(4, 6, 32, 32, deflate_fast), new Config(4, 4, 16, 16, deflate_slow), new Config(8, 16, 32, 32, deflate_slow), new Config(8, 16, 128, 128, deflate_slow), new Config(8, 32, 128, 256, deflate_slow), new Config(32, 128, 258, 1024, deflate_slow), new Config(32, 258, 258, 4096, deflate_slow)];
      function lm_init(s) {
        s.window_size = 2 * s.w_size;
        zero(s.head);
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
      }
      function DeflateState() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = Z_DEFLATED;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
        this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
        this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
        zero(this.dyn_ltree);
        zero(this.dyn_dtree);
        zero(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new utils.Buf16(MAX_BITS + 1);
        this.heap = new utils.Buf16(2 * L_CODES + 1);
        zero(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new utils.Buf16(2 * L_CODES + 1);
        zero(this.depth);
        this.l_buf = 0;
        this.lit_bufsize = 0;
        this.last_lit = 0;
        this.d_buf = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0;
      }
      function deflateResetKeep(strm) {
        var s;
        if (!strm || !strm.state) {
          return err(strm, Z_STREAM_ERROR);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
        s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
        }
        s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
        strm.adler = (s.wrap === 2) ? 0 : 1;
        s.last_flush = Z_NO_FLUSH;
        trees._tr_init(s);
        return Z_OK;
      }
      function deflateReset(strm) {
        var ret = deflateResetKeep(strm);
        if (ret === Z_OK) {
          lm_init(strm.state);
        }
        return ret;
      }
      function deflateSetHeader(strm, head) {
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        if (strm.state.wrap !== 2) {
          return Z_STREAM_ERROR;
        }
        strm.state.gzhead = head;
        return Z_OK;
      }
      function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        var wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION) {
          level = 6;
        }
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else if (windowBits > 15) {
          wrap = 2;
          windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
          return err(strm, Z_STREAM_ERROR);
        }
        if (windowBits === 8) {
          windowBits = 9;
        }
        var s = new DeflateState();
        strm.state = s;
        s.strm = strm;
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        s.window = new utils.Buf8(s.w_size * 2);
        s.head = new utils.Buf16(s.hash_size);
        s.prev = new utils.Buf16(s.w_size);
        s.lit_bufsize = 1 << (memLevel + 6);
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new utils.Buf8(s.pending_buf_size);
        s.d_buf = 1 * s.lit_bufsize;
        s.l_buf = (1 + 2) * s.lit_bufsize;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset(strm);
      }
      function deflateInit(strm, level) {
        return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
      }
      function deflate(strm, flush) {
        var old_flush,
            s;
        var beg,
            val;
        if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
          return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
        }
        s = strm.state;
        if (!strm.output || (!strm.input && strm.avail_in !== 0) || (s.status === FINISH_STATE && flush !== Z_FINISH)) {
          return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
        }
        s.strm = strm;
        old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.status === INIT_STATE) {
          if (s.wrap === 2) {
            strm.adler = 0;
            put_byte(s, 31);
            put_byte(s, 139);
            put_byte(s, 8);
            if (!s.gzhead) {
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, s.level === 9 ? 2 : (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0));
              put_byte(s, OS_CODE);
              s.status = BUSY_STATE;
            } else {
              put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
              put_byte(s, s.gzhead.time & 0xff);
              put_byte(s, (s.gzhead.time >> 8) & 0xff);
              put_byte(s, (s.gzhead.time >> 16) & 0xff);
              put_byte(s, (s.gzhead.time >> 24) & 0xff);
              put_byte(s, s.level === 9 ? 2 : (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0));
              put_byte(s, s.gzhead.os & 0xff);
              if (s.gzhead.extra && s.gzhead.extra.length) {
                put_byte(s, s.gzhead.extra.length & 0xff);
                put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
              }
              if (s.gzhead.hcrc) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
              }
              s.gzindex = 0;
              s.status = EXTRA_STATE;
            }
          } else {
            var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
            var level_flags = -1;
            if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
              level_flags = 0;
            } else if (s.level < 6) {
              level_flags = 1;
            } else if (s.level === 6) {
              level_flags = 2;
            } else {
              level_flags = 3;
            }
            header |= (level_flags << 6);
            if (s.strstart !== 0) {
              header |= PRESET_DICT;
            }
            header += 31 - (header % 31);
            s.status = BUSY_STATE;
            putShortMSB(s, header);
            if (s.strstart !== 0) {
              putShortMSB(s, strm.adler >>> 16);
              putShortMSB(s, strm.adler & 0xffff);
            }
            strm.adler = 1;
          }
        }
        if (s.status === EXTRA_STATE) {
          if (s.gzhead.extra) {
            beg = s.pending;
            while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  break;
                }
              }
              put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
              s.gzindex++;
            }
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (s.gzindex === s.gzhead.extra.length) {
              s.gzindex = 0;
              s.status = NAME_STATE;
            }
          } else {
            s.status = NAME_STATE;
          }
        }
        if (s.status === NAME_STATE) {
          if (s.gzhead.name) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.gzindex = 0;
              s.status = COMMENT_STATE;
            }
          } else {
            s.status = COMMENT_STATE;
          }
        }
        if (s.status === COMMENT_STATE) {
          if (s.gzhead.comment) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.status = HCRC_STATE;
            }
          } else {
            s.status = HCRC_STATE;
          }
        }
        if (s.status === HCRC_STATE) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending(strm);
            }
            if (s.pending + 2 <= s.pending_buf_size) {
              put_byte(s, strm.adler & 0xff);
              put_byte(s, (strm.adler >> 8) & 0xff);
              strm.adler = 0;
              s.status = BUSY_STATE;
            }
          } else {
            s.status = BUSY_STATE;
          }
        }
        if (s.pending !== 0) {
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
          return err(strm, Z_BUF_ERROR);
        }
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
          return err(strm, Z_BUF_ERROR);
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
          var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) : (s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush));
          if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
            s.status = FINISH_STATE;
          }
          if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
            }
            return Z_OK;
          }
          if (bstate === BS_BLOCK_DONE) {
            if (flush === Z_PARTIAL_FLUSH) {
              trees._tr_align(s);
            } else if (flush !== Z_BLOCK) {
              trees._tr_stored_block(s, 0, 0, false);
              if (flush === Z_FULL_FLUSH) {
                zero(s.head);
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              return Z_OK;
            }
          }
        }
        if (flush !== Z_FINISH) {
          return Z_OK;
        }
        if (s.wrap <= 0) {
          return Z_STREAM_END;
        }
        if (s.wrap === 2) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          put_byte(s, (strm.adler >> 16) & 0xff);
          put_byte(s, (strm.adler >> 24) & 0xff);
          put_byte(s, strm.total_in & 0xff);
          put_byte(s, (strm.total_in >> 8) & 0xff);
          put_byte(s, (strm.total_in >> 16) & 0xff);
          put_byte(s, (strm.total_in >> 24) & 0xff);
        } else {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
        flush_pending(strm);
        if (s.wrap > 0) {
          s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK : Z_STREAM_END;
      }
      function deflateEnd(strm) {
        var status;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        status = strm.state.status;
        if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
          return err(strm, Z_STREAM_ERROR);
        }
        strm.state = null;
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
      }
      function deflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var s;
        var str,
            n;
        var wrap;
        var avail;
        var next;
        var input;
        var tmpDict;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        s = strm.state;
        wrap = s.wrap;
        if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
          return Z_STREAM_ERROR;
        }
        if (wrap === 1) {
          strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
          if (wrap === 0) {
            zero(s.head);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          tmpDict = new utils.Buf8(s.w_size);
          utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        avail = strm.avail_in;
        next = strm.next_in;
        input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
          str = s.strstart;
          n = s.lookahead - (MIN_MATCH - 1);
          do {
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH - 1;
          fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK;
      }
      exports.deflateInit = deflateInit;
      exports.deflateInit2 = deflateInit2;
      exports.deflateReset = deflateReset;
      exports.deflateResetKeep = deflateResetKeep;
      exports.deflateSetHeader = deflateSetHeader;
      exports.deflate = deflate;
      exports.deflateEnd = deflateEnd;
      exports.deflateSetDictionary = deflateSetDictionary;
      exports.deflateInfo = 'pako deflate (from Nodeca project)';
    }, {
      "../utils/common": 28,
      "./adler32": 30,
      "./crc32": 32,
      "./messages": 38,
      "./trees": 39
    }],
    34: [function(require, module, exports) {
      'use strict';
      function GZheader() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = '';
        this.comment = '';
        this.hcrc = 0;
        this.done = false;
      }
      module.exports = GZheader;
    }, {}],
    35: [function(require, module, exports) {
      'use strict';
      var BAD = 30;
      var TYPE = 12;
      module.exports = function inflate_fast(strm, start) {
        var state;
        var _in;
        var last;
        var _out;
        var beg;
        var end;
        var dmax;
        var wsize;
        var whave;
        var wnext;
        var s_window;
        var hold;
        var bits;
        var lcode;
        var dcode;
        var lmask;
        var dmask;
        var here;
        var op;
        var len;
        var dist;
        var from;
        var from_source;
        var input,
            output;
        state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top: do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen: for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = (here >>> 16) & 0xff;
            if (op === 0) {
              output[_out++] = here & 0xffff;
            } else if (op & 16) {
              len = here & 0xffff;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & ((1 << op) - 1);
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist: for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = (here >>> 16) & 0xff;
                if (op & 16) {
                  dist = here & 0xffff;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & ((1 << op) - 1);
                  if (dist > dmax) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = 'invalid distance too far back';
                        state.mode = BAD;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 0xffff) + (hold & ((1 << op) - 1))];
                  continue dodist;
                } else {
                  strm.msg = 'invalid distance code';
                  state.mode = BAD;
                  break top;
                }
                break;
              }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 0xffff) + (hold & ((1 << op) - 1))];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE;
              break top;
            } else {
              strm.msg = 'invalid literal/length code';
              state.mode = BAD;
              break top;
            }
            break;
          }
        } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
        strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
        state.hold = hold;
        state.bits = bits;
        return;
      };
    }, {}],
    36: [function(require, module, exports) {
      'use strict';
      var utils = require('../utils/common');
      var adler32 = require('./adler32');
      var crc32 = require('./crc32');
      var inflate_fast = require('./inffast');
      var inflate_table = require('./inftrees');
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var Z_FINISH = 4;
      var Z_BLOCK = 5;
      var Z_TREES = 6;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_NEED_DICT = 2;
      var Z_STREAM_ERROR = -2;
      var Z_DATA_ERROR = -3;
      var Z_MEM_ERROR = -4;
      var Z_BUF_ERROR = -5;
      var Z_DEFLATED = 8;
      var HEAD = 1;
      var FLAGS = 2;
      var TIME = 3;
      var OS = 4;
      var EXLEN = 5;
      var EXTRA = 6;
      var NAME = 7;
      var COMMENT = 8;
      var HCRC = 9;
      var DICTID = 10;
      var DICT = 11;
      var TYPE = 12;
      var TYPEDO = 13;
      var STORED = 14;
      var COPY_ = 15;
      var COPY = 16;
      var TABLE = 17;
      var LENLENS = 18;
      var CODELENS = 19;
      var LEN_ = 20;
      var LEN = 21;
      var LENEXT = 22;
      var DIST = 23;
      var DISTEXT = 24;
      var MATCH = 25;
      var LIT = 26;
      var CHECK = 27;
      var LENGTH = 28;
      var DONE = 29;
      var BAD = 30;
      var MEM = 31;
      var SYNC = 32;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var MAX_WBITS = 15;
      var DEF_WBITS = MAX_WBITS;
      function zswap32(q) {
        return (((q >>> 24) & 0xff) + ((q >>> 8) & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24));
      }
      function InflateState() {
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new utils.Buf16(320);
        this.work = new utils.Buf16(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0;
      }
      function inflateResetKeep(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = '';
        if (state.wrap) {
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
        state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        return Z_OK;
      }
      function inflateReset(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      }
      function inflateReset2(strm, windowBits) {
        var wrap;
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 1;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      }
      function inflateInit2(strm, windowBits) {
        var ret;
        var state;
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        state = new InflateState();
        strm.state = state;
        state.window = null;
        ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
          strm.state = null;
        }
        return ret;
      }
      function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
      }
      var virgin = true;
      var lenfix,
          distfix;
      function fixedtables(state) {
        if (virgin) {
          var sym;
          lenfix = new utils.Buf32(512);
          distfix = new utils.Buf32(32);
          sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {bits: 9});
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {bits: 5});
          virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      }
      function updatewindow(strm, src, end, copy) {
        var dist;
        var state = strm.state;
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new utils.Buf8(state.wsize);
        }
        if (copy >= state.wsize) {
          utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          utils.arraySet(state.window, src, end - copy, dist, state.wnext);
          copy -= dist;
          if (copy) {
            utils.arraySet(state.window, src, end - copy, copy, 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      }
      function inflate(strm, flush) {
        var state;
        var input,
            output;
        var next;
        var put;
        var have,
            left;
        var hold;
        var bits;
        var _in,
            _out;
        var copy;
        var from;
        var from_source;
        var here = 0;
        var here_bits,
            here_op,
            here_val;
        var last_bits,
            last_op,
            last_val;
        var len;
        var ret;
        var hbuf = new utils.Buf8(4);
        var opts;
        var n;
        var order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!strm || !strm.state || !strm.output || (!strm.input && strm.avail_in !== 0)) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.mode === TYPE) {
          state.mode = TYPEDO;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK;
        inf_leave: for (; ; ) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((state.wrap & 2) && hold === 0x8b1f) {
                state.check = 0;
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                hold = 0;
                bits = 0;
                state.mode = FLAGS;
                break;
              }
              state.flags = 0;
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || (((hold & 0xff) << 8) + (hold >> 8)) % 31) {
                strm.msg = 'incorrect header check';
                state.mode = BAD;
                break;
              }
              if ((hold & 0x0f) !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              hold >>>= 4;
              bits -= 4;
              len = (hold & 0x0f) + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              } else if (len > state.wbits) {
                strm.msg = 'invalid window size';
                state.mode = BAD;
                break;
              }
              state.dmax = 1 << len;
              strm.adler = state.check = 1;
              state.mode = hold & 0x200 ? DICTID : TYPE;
              hold = 0;
              bits = 0;
              break;
            case FLAGS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.flags = hold;
              if ((state.flags & 0xff) !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              if (state.flags & 0xe000) {
                strm.msg = 'unknown header flags set';
                state.mode = BAD;
                break;
              }
              if (state.head) {
                state.head.text = ((hold >> 8) & 1);
              }
              if (state.flags & 0x0200) {
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = TIME;
            case TIME:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 0x0200) {
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                hbuf[2] = (hold >>> 16) & 0xff;
                hbuf[3] = (hold >>> 24) & 0xff;
                state.check = crc32(state.check, hbuf, 4, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = OS;
            case OS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.xflags = (hold & 0xff);
                state.head.os = (hold >> 8);
              }
              if (state.flags & 0x0200) {
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = EXLEN;
            case EXLEN:
              if (state.flags & 0x0400) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 0x0200) {
                  hbuf[0] = hold & 0xff;
                  hbuf[1] = (hold >>> 8) & 0xff;
                  state.check = crc32(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
              } else if (state.head) {
                state.head.extra = null;
              }
              state.mode = EXTRA;
            case EXTRA:
              if (state.flags & 0x0400) {
                copy = state.length;
                if (copy > have) {
                  copy = have;
                }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      state.head.extra = new Array(state.head.extra_len);
                    }
                    utils.arraySet(state.head.extra, input, next, copy, len);
                  }
                  if (state.flags & 0x0200) {
                    state.check = crc32(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  state.length -= copy;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME;
            case NAME:
              if (state.flags & 0x0800) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && (state.length < 65536)) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
            case COMMENT:
              if (state.flags & 0x1000) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && (state.length < 65536)) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
            case HCRC:
              if (state.flags & 0x0200) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.check & 0xffff)) {
                  strm.msg = 'header crc mismatch';
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              if (state.head) {
                state.head.hcrc = ((state.flags >> 9) & 1);
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE;
              break;
            case DICTID:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              strm.adler = state.check = zswap32(hold);
              hold = 0;
              bits = 0;
              state.mode = DICT;
            case DICT:
              if (state.havedict === 0) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                return Z_NEED_DICT;
              }
              strm.adler = state.check = 1;
              state.mode = TYPE;
            case TYPE:
              if (flush === Z_BLOCK || flush === Z_TREES) {
                break inf_leave;
              }
            case TYPEDO:
              if (state.last) {
                hold >>>= bits & 7;
                bits -= bits & 7;
                state.mode = CHECK;
                break;
              }
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.last = (hold & 0x01);
              hold >>>= 1;
              bits -= 1;
              switch ((hold & 0x03)) {
                case 0:
                  state.mode = STORED;
                  break;
                case 1:
                  fixedtables(state);
                  state.mode = LEN_;
                  if (flush === Z_TREES) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;
                case 2:
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = 'invalid block type';
                  state.mode = BAD;
              }
              hold >>>= 2;
              bits -= 2;
              break;
            case STORED:
              hold >>>= bits & 7;
              bits -= bits & 7;
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
                strm.msg = 'invalid stored block lengths';
                state.mode = BAD;
                break;
              }
              state.length = hold & 0xffff;
              hold = 0;
              bits = 0;
              state.mode = COPY_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            case COPY_:
              state.mode = COPY;
            case COPY:
              copy = state.length;
              if (copy) {
                if (copy > have) {
                  copy = have;
                }
                if (copy > left) {
                  copy = left;
                }
                if (copy === 0) {
                  break inf_leave;
                }
                utils.arraySet(output, input, next, copy, put);
                have -= copy;
                next += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              state.mode = TYPE;
              break;
            case TABLE:
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.nlen = (hold & 0x1f) + 257;
              hold >>>= 5;
              bits -= 5;
              state.ndist = (hold & 0x1f) + 1;
              hold >>>= 5;
              bits -= 5;
              state.ncode = (hold & 0x0f) + 4;
              hold >>>= 4;
              bits -= 4;
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = 'too many length or distance symbols';
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = LENLENS;
            case LENLENS:
              while (state.have < state.ncode) {
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.lens[order[state.have++]] = (hold & 0x07);
                hold >>>= 3;
                bits -= 3;
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = {bits: state.lenbits};
              ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = 'invalid code lengths set';
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = CODELENS;
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (; ; ) {
                  here = state.lencode[hold & ((1 << state.lenbits) - 1)];
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
                  if ((here_bits) <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_val < 16) {
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    if (state.have === 0) {
                      strm.msg = 'invalid bit length repeat';
                      state.mode = BAD;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 0x03);
                    hold >>>= 2;
                    bits -= 2;
                  } else if (here_val === 17) {
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 3 + (hold & 0x07);
                    hold >>>= 3;
                    bits -= 3;
                  } else {
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 11 + (hold & 0x7f);
                    hold >>>= 7;
                    bits -= 7;
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = 'invalid bit length repeat';
                    state.mode = BAD;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }
              if (state.mode === BAD) {
                break;
              }
              if (state.lens[256] === 0) {
                strm.msg = 'invalid code -- missing end-of-block';
                state.mode = BAD;
                break;
              }
              state.lenbits = 9;
              opts = {bits: state.lenbits};
              ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = 'invalid literal/lengths set';
                state.mode = BAD;
                break;
              }
              state.distbits = 6;
              state.distcode = state.distdyn;
              opts = {bits: state.distbits};
              ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              state.distbits = opts.bits;
              if (ret) {
                strm.msg = 'invalid distances set';
                state.mode = BAD;
                break;
              }
              state.mode = LEN_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            case LEN_:
              state.mode = LEN;
            case LEN:
              if (have >= 6 && left >= 258) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                inflate_fast(strm, _out);
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                if (state.mode === TYPE) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (; ; ) {
                here = state.lencode[hold & ((1 << state.lenbits) - 1)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_op && (here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.lencode[last_val + ((hold & ((1 << (last_bits + last_op)) - 1)) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
                  if ((last_bits + here_bits) <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                state.back = -1;
                state.mode = TYPE;
                break;
              }
              if (here_op & 64) {
                strm.msg = 'invalid literal/length code';
                state.mode = BAD;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
            case LENEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length += hold & ((1 << state.extra) - 1);
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              state.was = state.length;
              state.mode = DIST;
            case DIST:
              for (; ; ) {
                here = state.distcode[hold & ((1 << state.distbits) - 1)];
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
                if ((here_bits) <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.distcode[last_val + ((hold & ((1 << (last_bits + last_op)) - 1)) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
                  if ((last_bits + here_bits) <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = 'invalid distance code';
                state.mode = BAD;
                break;
              }
              state.offset = here_val;
              state.extra = (here_op) & 15;
              state.mode = DISTEXT;
            case DISTEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.offset += hold & ((1 << state.extra) - 1);
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              if (state.offset > state.dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              }
              state.mode = MATCH;
            case MATCH:
              if (left === 0) {
                break inf_leave;
              }
              copy = _out - left;
              if (state.offset > copy) {
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break;
                  }
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                } else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) {
                  copy = state.length;
                }
                from_source = state.window;
              } else {
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) {
                copy = left;
              }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) {
                state.mode = LEN;
              }
              break;
            case LIT:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check = (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));
                }
                _out = left;
                if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = 'incorrect data check';
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = LENGTH;
            case LENGTH:
              if (state.wrap && state.flags) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.total & 0xffffffff)) {
                  strm.msg = 'incorrect length check';
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = DONE;
            case DONE:
              ret = Z_STREAM_END;
              break inf_leave;
            case BAD:
              ret = Z_DATA_ERROR;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR;
            case SYNC:
            default:
              return Z_STREAM_ERROR;
          }
        }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || (_out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH))) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
            state.mode = MEM;
            return Z_MEM_ERROR;
          }
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap && _out) {
          strm.adler = state.check = (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      }
      function inflateEnd(strm) {
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        var state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK;
      }
      function inflateGetHeader(strm, head) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR;
        }
        state.head = head;
        head.done = false;
        return Z_OK;
      }
      function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var state;
        var dictid;
        var ret;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR;
        }
        if (state.mode === DICT) {
          dictid = 1;
          dictid = adler32(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR;
          }
        }
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
        state.havedict = 1;
        return Z_OK;
      }
      exports.inflateReset = inflateReset;
      exports.inflateReset2 = inflateReset2;
      exports.inflateResetKeep = inflateResetKeep;
      exports.inflateInit = inflateInit;
      exports.inflateInit2 = inflateInit2;
      exports.inflate = inflate;
      exports.inflateEnd = inflateEnd;
      exports.inflateGetHeader = inflateGetHeader;
      exports.inflateSetDictionary = inflateSetDictionary;
      exports.inflateInfo = 'pako inflate (from Nodeca project)';
    }, {
      "../utils/common": 28,
      "./adler32": 30,
      "./crc32": 32,
      "./inffast": 35,
      "./inftrees": 37
    }],
    37: [function(require, module, exports) {
      'use strict';
      var utils = require('../utils/common');
      var MAXBITS = 15;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var lbase = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
      var lext = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
      var dbase = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
      var dext = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
        var bits = opts.bits;
        var len = 0;
        var sym = 0;
        var min = 0,
            max = 0;
        var root = 0;
        var curr = 0;
        var drop = 0;
        var left = 0;
        var used = 0;
        var huff = 0;
        var incr;
        var fill;
        var low;
        var mask;
        var next;
        var base = null;
        var base_index = 0;
        var end;
        var count = new utils.Buf16(MAXBITS + 1);
        var offs = new utils.Buf16(MAXBITS + 1);
        var extra = null;
        var extra_index = 0;
        var here_bits,
            here_op,
            here_val;
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          table[table_index++] = (1 << 24) | (64 << 16) | 0;
          table[table_index++] = (1 << 24) | (64 << 16) | 0;
          opts.bits = 1;
          return 0;
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }
        }
        if (left > 0 && (type === CODES || max !== 1)) {
          return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
        if (type === CODES) {
          base = extra = work;
          end = 19;
        } else if (type === LENS) {
          base = lbase;
          base_index -= 257;
          extra = lext;
          extra_index -= 257;
          end = 256;
        } else {
          base = dbase;
          extra = dext;
          end = -1;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if ((type === LENS && used > ENOUGH_LENS) || (type === DISTS && used > ENOUGH_DISTS)) {
          return 1;
        }
        var i = 0;
        for (; ; ) {
          i++;
          here_bits = len - drop;
          if (work[sym] < end) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] > end) {
            here_op = extra[extra_index + work[sym]];
            here_val = base[base_index + work[sym]];
          } else {
            here_op = 32 + 64;
            here_val = 0;
          }
          incr = 1 << (len - drop);
          fill = 1 << curr;
          min = fill;
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val | 0;
          } while (fill !== 0);
          incr = 1 << (len - 1);
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            if (drop === 0) {
              drop = root;
            }
            next += min;
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }
            used += 1 << curr;
            if ((type === LENS && used > ENOUGH_LENS) || (type === DISTS && used > ENOUGH_DISTS)) {
              return 1;
            }
            low = huff & mask;
            table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0;
          }
        }
        if (huff !== 0) {
          table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
        }
        opts.bits = root;
        return 0;
      };
    }, {"../utils/common": 28}],
    38: [function(require, module, exports) {
      'use strict';
      module.exports = {
        2: 'need dictionary',
        1: 'stream end',
        0: '',
        '-1': 'file error',
        '-2': 'stream error',
        '-3': 'data error',
        '-4': 'insufficient memory',
        '-5': 'buffer error',
        '-6': 'incompatible version'
      };
    }, {}],
    39: [function(require, module, exports) {
      'use strict';
      var utils = require('../utils/common');
      var Z_FIXED = 4;
      var Z_BINARY = 0;
      var Z_TEXT = 1;
      var Z_UNKNOWN = 2;
      function zero(buf) {
        var len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      var STORED_BLOCK = 0;
      var STATIC_TREES = 1;
      var DYN_TREES = 2;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var Buf_size = 16;
      var MAX_BL_BITS = 7;
      var END_BLOCK = 256;
      var REP_3_6 = 16;
      var REPZ_3_10 = 17;
      var REPZ_11_138 = 18;
      var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
      var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
      var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
      var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      var DIST_CODE_LEN = 512;
      var static_ltree = new Array((L_CODES + 2) * 2);
      zero(static_ltree);
      var static_dtree = new Array(D_CODES * 2);
      zero(static_dtree);
      var _dist_code = new Array(DIST_CODE_LEN);
      zero(_dist_code);
      var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
      zero(_length_code);
      var base_length = new Array(LENGTH_CODES);
      zero(base_length);
      var base_dist = new Array(D_CODES);
      zero(base_dist);
      function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
        this.static_tree = static_tree;
        this.extra_bits = extra_bits;
        this.extra_base = extra_base;
        this.elems = elems;
        this.max_length = max_length;
        this.has_stree = static_tree && static_tree.length;
      }
      var static_l_desc;
      var static_d_desc;
      var static_bl_desc;
      function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;
        this.max_code = 0;
        this.stat_desc = stat_desc;
      }
      function d_code(dist) {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      }
      function put_short(s, w) {
        s.pending_buf[s.pending++] = (w) & 0xff;
        s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
      }
      function send_bits(s, value, length) {
        if (s.bi_valid > (Buf_size - length)) {
          s.bi_buf |= (value << s.bi_valid) & 0xffff;
          put_short(s, s.bi_buf);
          s.bi_buf = value >> (Buf_size - s.bi_valid);
          s.bi_valid += length - Buf_size;
        } else {
          s.bi_buf |= (value << s.bi_valid) & 0xffff;
          s.bi_valid += length;
        }
      }
      function send_code(s, c, tree) {
        send_bits(s, tree[c * 2], tree[c * 2 + 1]);
      }
      function bi_reverse(code, len) {
        var res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      }
      function bi_flush(s) {
        if (s.bi_valid === 16) {
          put_short(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 0xff;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      }
      function gen_bitlen(s, desc) {
        var tree = desc.dyn_tree;
        var max_code = desc.max_code;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var extra = desc.stat_desc.extra_bits;
        var base = desc.stat_desc.extra_base;
        var max_length = desc.stat_desc.max_length;
        var h;
        var n,
            m;
        var bits;
        var xbits;
        var f;
        var overflow = 0;
        for (bits = 0; bits <= MAX_BITS; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > max_code) {
            continue;
          }
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1] + xbits);
          }
        }
        if (overflow === 0) {
          return;
        }
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) {
              continue;
            }
            if (tree[m * 2 + 1] !== bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      }
      function gen_codes(tree, max_code, bl_count) {
        var next_code = new Array(MAX_BITS + 1);
        var code = 0;
        var bits;
        var n;
        for (bits = 1; bits <= MAX_BITS; bits++) {
          next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
        }
        for (n = 0; n <= max_code; n++) {
          var len = tree[n * 2 + 1];
          if (len === 0) {
            continue;
          }
          tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
      }
      function tr_static_init() {
        var n;
        var bits;
        var length;
        var code;
        var dist;
        var bl_count = new Array(MAX_BITS + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES - 1; code++) {
          base_length[code] = length;
          for (n = 0; n < (1 << extra_lbits[code]); n++) {
            _length_code[length++] = code;
          }
        }
        _length_code[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;
          for (n = 0; n < (1 << extra_dbits[code]); n++) {
            _dist_code[dist++] = code;
          }
        }
        dist >>= 7;
        for (; code < D_CODES; code++) {
          base_dist[code] = dist << 7;
          for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
            _dist_code[256 + dist++] = code;
          }
        }
        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree[n * 2 + 1] = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree[n * 2 + 1] = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        gen_codes(static_ltree, L_CODES + 1, bl_count);
        for (n = 0; n < D_CODES; n++) {
          static_dtree[n * 2 + 1] = 5;
          static_dtree[n * 2] = bi_reverse(n, 5);
        }
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
      }
      function init_block(s) {
        var n;
        for (n = 0; n < L_CODES; n++) {
          s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES; n++) {
          s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES; n++) {
          s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.last_lit = s.matches = 0;
      }
      function bi_windup(s) {
        if (s.bi_valid > 8) {
          put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      }
      function copy_block(s, buf, len, header) {
        bi_windup(s);
        if (header) {
          put_short(s, len);
          put_short(s, ~len);
        }
        utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
        s.pending += len;
      }
      function smaller(tree, n, m, depth) {
        var _n2 = n * 2;
        var _m2 = m * 2;
        return (tree[_n2] < tree[_m2] || (tree[_n2] === tree[_m2] && depth[n] <= depth[m]));
      }
      function pqdownheap(s, tree, k) {
        var v = s.heap[k];
        var j = k << 1;
        while (j <= s.heap_len) {
          if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          if (smaller(tree, v, s.heap[j], s.depth)) {
            break;
          }
          s.heap[k] = s.heap[j];
          k = j;
          j <<= 1;
        }
        s.heap[k] = v;
      }
      function compress_block(s, ltree, dtree) {
        var dist;
        var lc;
        var lx = 0;
        var code;
        var extra;
        if (s.last_lit !== 0) {
          do {
            dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
            lc = s.pending_buf[s.l_buf + lx];
            lx++;
            if (dist === 0) {
              send_code(s, lc, ltree);
            } else {
              code = _length_code[lc];
              send_code(s, code + LITERALS + 1, ltree);
              extra = extra_lbits[code];
              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(s, lc, extra);
              }
              dist--;
              code = d_code(dist);
              send_code(s, code, dtree);
              extra = extra_dbits[code];
              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(s, dist, extra);
              }
            }
          } while (lx < s.last_lit);
        }
        send_code(s, END_BLOCK, ltree);
      }
      function build_tree(s, desc) {
        var tree = desc.dyn_tree;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var elems = desc.stat_desc.elems;
        var n,
            m;
        var max_code = -1;
        var node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1];
          }
        }
        desc.max_code = max_code;
        for (n = (s.heap_len >> 1); n >= 1; n--) {
          pqdownheap(s, tree, n);
        }
        node = elems;
        do {
          n = s.heap[1];
          s.heap[1] = s.heap[s.heap_len--];
          pqdownheap(s, tree, 1);
          m = s.heap[1];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[1] = node++;
          pqdownheap(s, tree, 1);
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[1];
        gen_bitlen(s, desc);
        gen_codes(tree, max_code, s.bl_count);
      }
      function scan_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 0xffff;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            s.bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              s.bl_tree[curlen * 2]++;
            }
            s.bl_tree[REP_3_6 * 2]++;
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_10 * 2]++;
          } else {
            s.bl_tree[REPZ_11_138 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function send_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code(s, curlen, s.bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code(s, curlen, s.bl_tree);
              count--;
            }
            send_code(s, REP_3_6, s.bl_tree);
            send_bits(s, count - 3, 2);
          } else if (count <= 10) {
            send_code(s, REPZ_3_10, s.bl_tree);
            send_bits(s, count - 3, 3);
          } else {
            send_code(s, REPZ_11_138, s.bl_tree);
            send_bits(s, count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function build_bl_tree(s) {
        var max_blindex;
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree(s, s.bl_desc);
        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
            break;
          }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      }
      function send_all_trees(s, lcodes, dcodes, blcodes) {
        var rank;
        send_bits(s, lcodes - 257, 5);
        send_bits(s, dcodes - 1, 5);
        send_bits(s, blcodes - 4, 4);
        for (rank = 0; rank < blcodes; rank++) {
          send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
        }
        send_tree(s, s.dyn_ltree, lcodes - 1);
        send_tree(s, s.dyn_dtree, dcodes - 1);
      }
      function detect_data_type(s) {
        var black_mask = 0xf3ffc07f;
        var n;
        for (n = 0; n <= 31; n++, black_mask >>>= 1) {
          if ((black_mask & 1) && (s.dyn_ltree[n * 2] !== 0)) {
            return Z_BINARY;
          }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
          return Z_TEXT;
        }
        for (n = 32; n < LITERALS; n++) {
          if (s.dyn_ltree[n * 2] !== 0) {
            return Z_TEXT;
          }
        }
        return Z_BINARY;
      }
      var static_init_done = false;
      function _tr_init(s) {
        if (!static_init_done) {
          tr_static_init();
          static_init_done = true;
        }
        s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block(s);
      }
      function _tr_stored_block(s, buf, stored_len, last) {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
        copy_block(s, buf, stored_len, true);
      }
      function _tr_align(s) {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
      }
      function _tr_flush_block(s, buf, stored_len, last) {
        var opt_lenb,
            static_lenb;
        var max_blindex = 0;
        if (s.level > 0) {
          if (s.strm.data_type === Z_UNKNOWN) {
            s.strm.data_type = detect_data_type(s);
          }
          build_tree(s, s.l_desc);
          build_tree(s, s.d_desc);
          max_blindex = build_bl_tree(s);
          opt_lenb = (s.opt_len + 3 + 7) >>> 3;
          static_lenb = (s.static_len + 3 + 7) >>> 3;
          if (static_lenb <= opt_lenb) {
            opt_lenb = static_lenb;
          }
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
          _tr_stored_block(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
          send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
          compress_block(s, static_ltree, static_dtree);
        } else {
          send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
          send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block(s);
        if (last) {
          bi_windup(s);
        }
      }
      function _tr_tally(s, dist, lc) {
        s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
        s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
        s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
        s.last_lit++;
        if (dist === 0) {
          s.dyn_ltree[lc * 2]++;
        } else {
          s.matches++;
          dist--;
          s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
          s.dyn_dtree[d_code(dist) * 2]++;
        }
        return (s.last_lit === s.lit_bufsize - 1);
      }
      exports._tr_init = _tr_init;
      exports._tr_stored_block = _tr_stored_block;
      exports._tr_flush_block = _tr_flush_block;
      exports._tr_tally = _tr_tally;
      exports._tr_align = _tr_align;
    }, {"../utils/common": 28}],
    40: [function(require, module, exports) {
      'use strict';
      function ZStream() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = '';
        this.state = null;
        this.data_type = 2;
        this.adler = 0;
      }
      module.exports = ZStream;
    }, {}]
  }, {}, [10])(10);
});

})();
(function() {
var define = System.amdDefine;
define("github:stuk/jszip@2.6.1.js", ["github:stuk/jszip@2.6.1/dist/jszip.js"], function(main) {
  return main;
});

})();
System.registerDynamic('npm:process@0.11.10/browser.js', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
        return [];
    };

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
System.registerDynamic("npm:process@0.11.10.js", ["npm:process@0.11.10/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.10/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.10.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.10.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic("npm:localforage@1.5.3/dist/localforage.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var global = this || self,
      GLOBAL = global;
  (function (process) {
    (function (f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof undefined === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.localforage = f();
      }
    })(function () {
      var define, module, exports;
      return function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof $__require == "function" && $__require;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = { exports: {} };
            t[o][0].call(l.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof $__require == "function" && $__require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
      }({
        1: [function (_dereq_, module, exports) {
          (function (global) {
            'use strict';

            var Mutation = global.MutationObserver || global.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global.document.createTextNode('');
                observer.observe(element, { characterData: true });
                scheduleDrain = function () {
                  element.data = called = ++called % 2;
                };
              } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
                var channel = new global.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function () {
                  channel.port2.postMessage(0);
                };
              } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
                scheduleDrain = function () {
                  var scriptEl = global.document.createElement('script');
                  scriptEl.onreadystatechange = function () {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };
                  global.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function () {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = [];
            function nextTick() {
              draining = true;
              var i, oldQueue;
              var len = queue.length;
              while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;
                while (++i < len) {
                  oldQueue[i]();
                }
                len = queue.length;
              }
              draining = false;
            }
            module.exports = immediate;
            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}],
        2: [function (_dereq_, module, exports) {
          'use strict';

          var immediate = _dereq_(1);
          function INTERNAL() {}
          var handlers = {};
          var REJECTED = ['REJECTED'];
          var FULFILLED = ['FULFILLED'];
          var PENDING = ['PENDING'];
          module.exports = exports = Promise;
          function Promise(resolver) {
            if (typeof resolver !== 'function') {
              throw new TypeError('resolver must be a function');
            }
            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;
            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }
          Promise.prototype["catch"] = function (onRejected) {
            return this.then(null, onRejected);
          };
          Promise.prototype.then = function (onFulfilled, onRejected) {
            if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
              return this;
            }
            var promise = new this.constructor(INTERNAL);
            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }
            return promise;
          };
          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;
            if (typeof onFulfilled === 'function') {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }
            if (typeof onRejected === 'function') {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }
          QueueItem.prototype.callFulfilled = function (value) {
            handlers.resolve(this.promise, value);
          };
          QueueItem.prototype.otherCallFulfilled = function (value) {
            unwrap(this.promise, this.onFulfilled, value);
          };
          QueueItem.prototype.callRejected = function (value) {
            handlers.reject(this.promise, value);
          };
          QueueItem.prototype.otherCallRejected = function (value) {
            unwrap(this.promise, this.onRejected, value);
          };
          function unwrap(promise, func, value) {
            immediate(function () {
              var returnValue;
              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }
              if (returnValue === promise) {
                handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }
          handlers.resolve = function (self, value) {
            var result = tryCatch(getThen, value);
            if (result.status === 'error') {
              return handlers.reject(self, result.value);
            }
            var thenable = result.value;
            if (thenable) {
              safelyResolveThenable(self, thenable);
            } else {
              self.state = FULFILLED;
              self.outcome = value;
              var i = -1;
              var len = self.queue.length;
              while (++i < len) {
                self.queue[i].callFulfilled(value);
              }
            }
            return self;
          };
          handlers.reject = function (self, error) {
            self.state = REJECTED;
            self.outcome = error;
            var i = -1;
            var len = self.queue.length;
            while (++i < len) {
              self.queue[i].callRejected(error);
            }
            return self;
          };
          function getThen(obj) {
            var then = obj && obj.then;
            if (obj && typeof obj === 'object' && typeof then === 'function') {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }
          function safelyResolveThenable(self, thenable) {
            var called = false;
            function onError(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.reject(self, value);
            }
            function onSuccess(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.resolve(self, value);
            }
            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }
            var result = tryCatch(tryToUnwrap);
            if (result.status === 'error') {
              onError(result.value);
            }
          }
          function tryCatch(func, value) {
            var out = {};
            try {
              out.value = func(value);
              out.status = 'success';
            } catch (e) {
              out.status = 'error';
              out.value = e;
            }
            return out;
          }
          exports.resolve = resolve;
          function resolve(value) {
            if (value instanceof this) {
              return value;
            }
            return handlers.resolve(new this(INTERNAL), value);
          }
          exports.reject = reject;
          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }
          exports.all = all;
          function all(iterable) {
            var self = this;
            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var values = new Array(len);
            var resolved = 0;
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              allResolver(iterable[i], i);
            }
            return promise;
            function allResolver(value, i) {
              self.resolve(value).then(resolveFromAll, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
              function resolveFromAll(outValue) {
                values[i] = outValue;
                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }
          exports.race = race;
          function race(iterable) {
            var self = this;
            if (Object.prototype.toString.call(iterable) !== '[object Array]') {
              return this.reject(new TypeError('must be an array'));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              resolver(iterable[i]);
            }
            return promise;
            function resolver(value) {
              self.resolve(value).then(function (response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function (error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
            }
          }
        }, { "1": 1 }],
        3: [function (_dereq_, module, exports) {
          (function (global) {
            'use strict';

            if (typeof global.Promise !== 'function') {
              global.Promise = _dereq_(2);
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "2": 2 }],
        4: [function (_dereq_, module, exports) {
          'use strict';

          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function getIDB() {
            try {
              if (typeof indexedDB !== 'undefined') {
                return indexedDB;
              }
              if (typeof webkitIndexedDB !== 'undefined') {
                return webkitIndexedDB;
              }
              if (typeof mozIndexedDB !== 'undefined') {
                return mozIndexedDB;
              }
              if (typeof OIndexedDB !== 'undefined') {
                return OIndexedDB;
              }
              if (typeof msIndexedDB !== 'undefined') {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }
          var idb = getIDB();
          function isIndexedDBValid() {
            try {
              if (!idb) {
                return false;
              }
              var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;
              return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && typeof IDBKeyRange !== 'undefined';
            } catch (e) {
              return false;
            }
          }
          function createBlob(parts, properties) {
            parts = parts || [];
            properties = properties || {};
            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== 'TypeError') {
                throw e;
              }
              var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();
              for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
              }
              return builder.getBlob(properties.type);
            }
          }
          if (typeof Promise === 'undefined') {
            _dereq_(3);
          }
          var Promise$1 = Promise;
          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function (result) {
                callback(null, result);
              }, function (error) {
                callback(error);
              });
            }
          }
          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === 'function') {
              promise.then(callback);
            }
            if (typeof errorCallback === 'function') {
              promise["catch"](errorCallback);
            }
          }
          function normalizeKey(key) {
            if (typeof key !== 'string') {
              console.warn(key + ' used as a key, but it is not a string.');
              key = String(key);
            }
            return key;
          }
          var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
          var supportsBlobs;
          var dbContexts;
          var toString = Object.prototype.toString;
          var READ_ONLY = 'readonly';
          var READ_WRITE = 'readwrite';
          function _binStringToArrayBuffer(bin) {
            var length = bin.length;
            var buf = new ArrayBuffer(length);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length; i++) {
              arr[i] = bin.charCodeAt(i);
            }
            return buf;
          }
          function _checkBlobSupportWithoutCaching(idb) {
            return new Promise$1(function (resolve) {
              var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob(['']);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
              txn.onabort = function (e) {
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };
              txn.oncomplete = function () {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function () {
              return false;
            });
          }
          function _checkBlobSupport(idb) {
            if (typeof supportsBlobs === 'boolean') {
              return Promise$1.resolve(supportsBlobs);
            }
            return _checkBlobSupportWithoutCaching(idb).then(function (value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }
          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function (resolve) {
              deferredOperation.resolve = resolve;
            });
            dbContext.deferredOperations.push(deferredOperation);
            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function () {
                return deferredOperation.promise;
              });
            }
          }
          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.resolve();
            }
          }
          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.reject(err);
            }
          }
          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function (resolve, reject) {
              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);
                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }
              var dbArgs = [dbInfo.name];
              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }
              var openreq = idb.open.apply(idb, dbArgs);
              if (upgradeNeeded) {
                openreq.onupgradeneeded = function (e) {
                  var db = openreq.result;
                  try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                      console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }
              openreq.onerror = function (e) {
                e.preventDefault();
                reject(openreq.error);
              };
              openreq.onsuccess = function () {
                resolve(openreq.result);
                _advanceReadiness(dbInfo);
              };
            });
          }
          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }
          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }
          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }
            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;
            if (isDowngrade) {
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
              }
              dbInfo.version = dbInfo.db.version;
            }
            if (isUpgrade || isNewStore) {
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }
              return true;
            }
            return false;
          }
          function _encodeBlob(blob) {
            return new Promise$1(function (resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function (e) {
                var base64 = btoa(e.target.result || '');
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base64,
                  type: blob.type
                });
              };
              reader.readAsBinaryString(blob);
            });
          }
          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
            return createBlob([arrayBuff], { type: encodedBlob.type });
          }
          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          }
          function _fullyReady(callback) {
            var self = this;
            var promise = self._initReady().then(function () {
              var dbContext = dbContexts[self._dbInfo.name];
              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }
          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);
            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;
            for (var i = 0; i < forages.length; i++) {
              if (forages[i]._dbInfo.db) {
                forages[i]._dbInfo.db.close();
                forages[i]._dbInfo.db = null;
              }
            }
            return _getConnection(dbInfo, false).then(function (db) {
              for (var j = 0; j < forages.length; j++) {
                forages[j]._dbInfo.db = db;
              }
            })["catch"](function (err) {
              _rejectReadiness(dbInfo, err);
              throw err;
            });
          }
          function createTransaction(dbInfo, mode, callback) {
            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (!dbInfo.db || err.name === 'InvalidStateError') {
                return _tryReconnect(dbInfo).then(function () {
                  var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                  callback(null, tx);
                });
              }
              callback(err);
            }
          }
          function _initStorage(options) {
            var self = this;
            var dbInfo = { db: null };
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            if (!dbContexts) {
              dbContexts = {};
            }
            var dbContext = dbContexts[dbInfo.name];
            if (!dbContext) {
              dbContext = {
                forages: [],
                db: null,
                dbReady: null,
                deferredOperations: []
              };
              dbContexts[dbInfo.name] = dbContext;
            }
            dbContext.forages.push(self);
            if (!self._initReady) {
              self._initReady = self.ready;
              self.ready = _fullyReady;
            }
            var initPromises = [];
            function ignoreErrors() {
              return Promise$1.resolve();
            }
            for (var j = 0; j < dbContext.forages.length; j++) {
              var forage = dbContext.forages[j];
              if (forage !== self) {
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            }
            var forages = dbContext.forages.slice(0);
            return Promise$1.all(initPromises).then(function () {
              dbInfo.db = dbContext.db;
              return _getOriginalConnection(dbInfo);
            }).then(function (db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function (db) {
              dbInfo.db = dbContext.db = db;
              self._dbInfo = dbInfo;
              for (var k = 0; k < forages.length; k++) {
                var forage = forages[k];
                if (forage !== self) {
                  forage._dbInfo.db = dbInfo.db;
                  forage._dbInfo.version = dbInfo.version;
                }
              }
            });
          }
          function getItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);
                    req.onsuccess = function () {
                      var value = req.result;
                      if (value === undefined) {
                        value = null;
                      }
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      resolve(value);
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (cursor) {
                        var value = cursor.value;
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        var result = iterator(value, cursor.key, iterationNumber++);
                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              var dbInfo;
              self.ready().then(function () {
                dbInfo = self._dbInfo;
                if (toString.call(value) === '[object Blob]') {
                  return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                      return value;
                    }
                    return _encodeBlob(value);
                  });
                }
                return value;
              }).then(function (value) {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.put(value, key);
                    if (value === null) {
                      value = undefined;
                    }
                    transaction.oncomplete = function () {
                      if (value === undefined) {
                        value = null;
                      }
                      resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                      resolve();
                    };
                    transaction.onerror = function () {
                      reject(req.error);
                    };
                    transaction.onabort = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();
                    transaction.oncomplete = function () {
                      resolve();
                    };
                    transaction.onabort = transaction.onerror = function () {
                      var err = req.error ? req.error : req.transaction.error;
                      reject(err);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();
                    req.onsuccess = function () {
                      resolve(req.result);
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              if (n < 0) {
                resolve(null);
                return;
              }
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(null);
                        return;
                      }
                      if (n === 0) {
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          advanced = true;
                          cursor.advance(n);
                        } else {
                          resolve(cursor.key);
                        }
                      }
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];
                    req.onsuccess = function () {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(keys);
                        return;
                      }
                      keys.push(cursor.key);
                      cursor["continue"]();
                    };
                    req.onerror = function () {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          var asyncStorage = {
            _driver: 'asyncStorage',
            _initStorage: _initStorage,
            _support: isIndexedDBValid(),
            iterate: iterate,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem,
            clear: clear,
            length: length,
            key: key,
            keys: keys
          };
          function isWebSQLValid() {
            return typeof openDatabase === 'function';
          }
          var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          var BLOB_TYPE_PREFIX = '~~local_forage_type~';
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = '__lfsc__:';
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
          var TYPE_ARRAYBUFFER = 'arbf';
          var TYPE_BLOB = 'blob';
          var TYPE_INT8ARRAY = 'si08';
          var TYPE_UINT8ARRAY = 'ui08';
          var TYPE_UINT8CLAMPEDARRAY = 'uic8';
          var TYPE_INT16ARRAY = 'si16';
          var TYPE_INT32ARRAY = 'si32';
          var TYPE_UINT16ARRAY = 'ur16';
          var TYPE_UINT32ARRAY = 'ui32';
          var TYPE_FLOAT32ARRAY = 'fl32';
          var TYPE_FLOAT64ARRAY = 'fl64';
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;
          function stringToBuffer(serializedString) {
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (serializedString[serializedString.length - 1] === '=') {
              bufferLength--;
              if (serializedString[serializedString.length - 2] === '=') {
                bufferLength--;
              }
            }
            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);
            for (i = 0; i < len; i += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }
            return buffer;
          }
          function bufferToString(buffer) {
            var bytes = new Uint8Array(buffer);
            var base64String = '';
            var i;
            for (i = 0; i < bytes.length; i += 3) {
              base64String += BASE_CHARS[bytes[i] >> 2];
              base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64String += BASE_CHARS[bytes[i + 2] & 63];
            }
            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + '=';
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + '==';
            }
            return base64String;
          }
          function serialize(value, callback) {
            var valueType = '';
            if (value) {
              valueType = toString$1.call(value);
            }
            if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
              var buffer;
              var marker = SERIALIZED_MARKER;
              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;
                if (valueType === '[object Int8Array]') {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === '[object Uint8Array]') {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === '[object Uint8ClampedArray]') {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === '[object Int16Array]') {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === '[object Uint16Array]') {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === '[object Int32Array]') {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === '[object Uint32Array]') {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === '[object Float32Array]') {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === '[object Float64Array]') {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error('Failed to get type for BinaryArray'));
                }
              }
              callback(marker + bufferToString(buffer));
            } else if (valueType === '[object Blob]') {
              var fileReader = new FileReader();
              fileReader.onload = function () {
                var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };
              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          }
          function deserialize(value) {
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            }
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType;
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }
            var buffer = stringToBuffer(serializedString);
            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;
              case TYPE_BLOB:
                return createBlob([buffer], { type: blobType });
              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
              default:
                throw new Error('Unkown type: ' + type);
            }
          }
          var localforageSerializer = {
            serialize: serialize,
            deserialize: deserialize,
            stringToBuffer: stringToBuffer,
            bufferToString: bufferToString
          };
          function _initStorage$1(options) {
            var self = this;
            var dbInfo = { db: null };
            if (options) {
              for (var i in options) {
                dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
              }
            }
            var dbInfoPromise = new Promise$1(function (resolve, reject) {
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              }
              dbInfo.db.transaction(function (t) {
                t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                  self._dbInfo = dbInfo;
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }
          function getItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$1(iterator, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;
                    for (var i = 0; i < length; i++) {
                      var item = rows.item(i);
                      var result = item.value;
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      result = iterator(result, item.key, i + 1);
                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function _setItem(key, value, callback, retriesLeft) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                if (value === undefined) {
                  value = null;
                }
                var originalValue = value;
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    dbInfo.db.transaction(function (t) {
                      t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
                        resolve(originalValue);
                      }, function (t, error) {
                        reject(error);
                      });
                    }, function (sqlError) {
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                          return;
                        }
                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$1(key, value, callback) {
            return _setItem.apply(this, [key, value, callback, 1]);
          }
          function removeItem$1(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$1(n, callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$1(callback) {
            var self = this;
            var promise = new Promise$1(function (resolve, reject) {
              self.ready().then(function () {
                var dbInfo = self._dbInfo;
                dbInfo.db.transaction(function (t) {
                  t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];
                    for (var i = 0; i < results.rows.length; i++) {
                      keys.push(results.rows.item(i).key);
                    }
                    resolve(keys);
                  }, function (t, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          var webSQLStorage = {
            _driver: 'webSQLStorage',
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1
          };
          function isLocalStorageValid() {
            try {
              return typeof localStorage !== 'undefined' && 'setItem' in localStorage && typeof localStorage.setItem === 'function';
            } catch (e) {
              return false;
            }
          }
          function checkIfLocalStorageThrows() {
            var localStorageTestKey = '_localforage_support_test';
            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          }
          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          }
          function _initStorage$2(options) {
            var self = this;
            var dbInfo = {};
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            dbInfo.keyPrefix = dbInfo.name + '/';
            if (dbInfo.storeName !== self._defaultConfig.storeName) {
              dbInfo.keyPrefix += dbInfo.storeName + '/';
            }
            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }
            self._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          }
          function clear$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var keyPrefix = self._dbInfo.keyPrefix;
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);
                if (key.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key);
              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$2(iterator, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length = localStorage.length;
              var iterationNumber = 1;
              for (var i = 0; i < length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(keyPrefix) !== 0) {
                  continue;
                }
                var value = localStorage.getItem(key);
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$2(n, callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var result;
              try {
                result = localStorage.key(n);
              } catch (error) {
                result = null;
              }
              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$2(callback) {
            var self = this;
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              var length = localStorage.length;
              var keys = [];
              for (var i = 0; i < length; i++) {
                var itemKey = localStorage.key(i);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }
              return keys;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$2(callback) {
            var self = this;
            var promise = self.keys().then(function (keys) {
              return keys.length;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem$2(key, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              var dbInfo = self._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$2(key, value, callback) {
            var self = this;
            key = normalizeKey(key);
            var promise = self.ready().then(function () {
              if (value === undefined) {
                value = null;
              }
              var originalValue = value;
              return new Promise$1(function (resolve, reject) {
                var dbInfo = self._dbInfo;
                dbInfo.serializer.serialize(value, function (value, error) {
                  if (error) {
                    reject(error);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key, value);
                      resolve(originalValue);
                    } catch (e) {
                      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        reject(e);
                      }
                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }
          var localStorageWrapper = {
            _driver: 'localStorageWrapper',
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2
          };
          var isArray = Array.isArray || function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
          };
          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];
          var DefaultConfig = {
            description: '',
            driver: DefaultDriverOrder.slice(),
            name: 'localforage',
            size: 4980736,
            storeName: 'keyvaluepairs',
            version: 1.0
          };
          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function () {
              var _args = arguments;
              return localForageInstance.ready().then(function () {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }
          function extend() {
            for (var i = 1; i < arguments.length; i++) {
              var arg = arguments[i];
              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }
            return arguments[0];
          }
          var LocalForage = function () {
            function LocalForage(options) {
              _classCallCheck(this, LocalForage);
              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;
                  if (!DefinedDrivers[driverName]) {
                    this.defineDriver(driver);
                  }
                }
              }
              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;
              this._wrapLibraryMethodsWithReady();
              this.setDriver(this._config.driver)["catch"](function () {});
            }
            LocalForage.prototype.config = function config(options) {
              if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                if (this._ready) {
                  return new Error('Can\'t call config() after localforage ' + 'has been used.');
                }
                for (var i in options) {
                  if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                  }
                  if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                  }
                  this._config[i] = options[i];
                }
                if ('driver' in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }
                return true;
              } else if (typeof options === 'string') {
                return this._config[options];
              } else {
                return this._config;
              }
            };
            LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function (resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }
                  var driverMethods = LibraryMethods.concat('_initStorage');
                  for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var customDriverMethod = driverMethods[i];
                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                      reject(complianceError);
                      return;
                    }
                  }
                  var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    resolve();
                  };
                  if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };
            LocalForage.prototype.driver = function driver() {
              return this._driver || null;
            };
            LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };
            LocalForage.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };
            LocalForage.prototype.ready = function ready(callback) {
              var self = this;
              var promise = self._driverSet.then(function () {
                if (self._ready === null) {
                  self._ready = self._initDriver();
                }
                return self._ready;
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };
            LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self = this;
              if (!isArray(drivers)) {
                drivers = [drivers];
              }
              var supportedDrivers = this._getSupportedDrivers(drivers);
              function setDriverToConfig() {
                self._config.driver = self.driver();
              }
              function extendSelfWithDriver(driver) {
                self._extend(driver);
                setDriverToConfig();
                self._ready = self._initStorage(self._config);
                return self._ready;
              }
              function initDriver(supportedDrivers) {
                return function () {
                  var currentDriverIndex = 0;
                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                      var driverName = supportedDrivers[currentDriverIndex];
                      currentDriverIndex++;
                      self._dbInfo = null;
                      self._ready = null;
                      return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }
                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                  }
                  return driverPromiseLoop();
                };
              }
              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function () {
                var driverName = supportedDrivers[0];
                self._dbInfo = null;
                self._ready = null;
                return self.getDriver(driverName).then(function (driver) {
                  self._driver = driver._driver;
                  setDriverToConfig();
                  self._wrapLibraryMethodsWithReady();
                  self._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function () {
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };
            LocalForage.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };
            LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };
            LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];
              for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }
              return supportedDrivers;
            };
            LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
              }
            };
            LocalForage.prototype.createInstance = function createInstance(options) {
              return new LocalForage(options);
            };
            return LocalForage;
          }();
          var localforage_js = new LocalForage();
          module.exports = localforage_js;
        }, { "3": 3 }]
      }, {}, [4])(4);
    });
  })($__require("github:jspm/nodelibs-process@0.1.2.js"));
});
System.registerDynamic("npm:localforage@1.5.3.js", ["npm:localforage@1.5.3/dist/localforage.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:localforage@1.5.3/dist/localforage.js");
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/create.js', ['npm:core-js@1.2.7/library/modules/$.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/create.js", ["npm:core-js@1.2.7/library/fn/object/create.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/create.js"), __esModule: true };
});
System.registerDynamic('github:webcomponents/webcomponentsjs@0.7.24/webcomponents-lite.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    /**
     * @license
     * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
    // @version 0.7.24
    (function () {
      window.WebComponents = window.WebComponents || {
        flags: {}
      };
      var file = "webcomponents-lite.js";
      var script = document.querySelector('script[src*="' + file + '"]');
      var flags = {};
      if (!flags.noOpts) {
        location.search.slice(1).split("&").forEach(function (option) {
          var parts = option.split("=");
          var match;
          if (parts[0] && (match = parts[0].match(/wc-(.+)/))) {
            flags[match[1]] = parts[1] || true;
          }
        });
        if (script) {
          for (var i = 0, a; a = script.attributes[i]; i++) {
            if (a.name !== "src") {
              flags[a.name] = a.value || true;
            }
          }
        }
        if (flags.log && flags.log.split) {
          var parts = flags.log.split(",");
          flags.log = {};
          parts.forEach(function (f) {
            flags.log[f] = true;
          });
        } else {
          flags.log = {};
        }
      }
      if (flags.register) {
        window.CustomElements = window.CustomElements || {
          flags: {}
        };
        window.CustomElements.flags.register = flags.register;
      }
      WebComponents.flags = flags;
    })();

    (function (scope) {
      "use strict";

      var hasWorkingUrl = false;
      if (!scope.forceJURL) {
        try {
          var u = new URL("b", "http://a");
          u.pathname = "c%20d";
          hasWorkingUrl = u.href === "http://a/c%20d";
        } catch (e) {}
      }
      if (hasWorkingUrl) return;
      var relative = Object.create(null);
      relative["ftp"] = 21;
      relative["file"] = 0;
      relative["gopher"] = 70;
      relative["http"] = 80;
      relative["https"] = 443;
      relative["ws"] = 80;
      relative["wss"] = 443;
      var relativePathDotMapping = Object.create(null);
      relativePathDotMapping["%2e"] = ".";
      relativePathDotMapping[".%2e"] = "..";
      relativePathDotMapping["%2e."] = "..";
      relativePathDotMapping["%2e%2e"] = "..";
      function isRelativeScheme(scheme) {
        return relative[scheme] !== undefined;
      }
      function invalid() {
        clear.call(this);
        this._isInvalid = true;
      }
      function IDNAToASCII(h) {
        if ("" == h) {
          invalid.call(this);
        }
        return h.toLowerCase();
      }
      function percentEscape(c) {
        var unicode = c.charCodeAt(0);
        if (unicode > 32 && unicode < 127 && [34, 35, 60, 62, 63, 96].indexOf(unicode) == -1) {
          return c;
        }
        return encodeURIComponent(c);
      }
      function percentEscapeQuery(c) {
        var unicode = c.charCodeAt(0);
        if (unicode > 32 && unicode < 127 && [34, 35, 60, 62, 96].indexOf(unicode) == -1) {
          return c;
        }
        return encodeURIComponent(c);
      }
      var EOF = undefined,
          ALPHA = /[a-zA-Z]/,
          ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
      function parse(input, stateOverride, base) {
        function err(message) {
          errors.push(message);
        }
        var state = stateOverride || "scheme start",
            cursor = 0,
            buffer = "",
            seenAt = false,
            seenBracket = false,
            errors = [];
        loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
          var c = input[cursor];
          switch (state) {
            case "scheme start":
              if (c && ALPHA.test(c)) {
                buffer += c.toLowerCase();
                state = "scheme";
              } else if (!stateOverride) {
                buffer = "";
                state = "no scheme";
                continue;
              } else {
                err("Invalid scheme.");
                break loop;
              }
              break;

            case "scheme":
              if (c && ALPHANUMERIC.test(c)) {
                buffer += c.toLowerCase();
              } else if (":" == c) {
                this._scheme = buffer;
                buffer = "";
                if (stateOverride) {
                  break loop;
                }
                if (isRelativeScheme(this._scheme)) {
                  this._isRelative = true;
                }
                if ("file" == this._scheme) {
                  state = "relative";
                } else if (this._isRelative && base && base._scheme == this._scheme) {
                  state = "relative or authority";
                } else if (this._isRelative) {
                  state = "authority first slash";
                } else {
                  state = "scheme data";
                }
              } else if (!stateOverride) {
                buffer = "";
                cursor = 0;
                state = "no scheme";
                continue;
              } else if (EOF == c) {
                break loop;
              } else {
                err("Code point not allowed in scheme: " + c);
                break loop;
              }
              break;

            case "scheme data":
              if ("?" == c) {
                this._query = "?";
                state = "query";
              } else if ("#" == c) {
                this._fragment = "#";
                state = "fragment";
              } else {
                if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
                  this._schemeData += percentEscape(c);
                }
              }
              break;

            case "no scheme":
              if (!base || !isRelativeScheme(base._scheme)) {
                err("Missing scheme.");
                invalid.call(this);
              } else {
                state = "relative";
                continue;
              }
              break;

            case "relative or authority":
              if ("/" == c && "/" == input[cursor + 1]) {
                state = "authority ignore slashes";
              } else {
                err("Expected /, got: " + c);
                state = "relative";
                continue;
              }
              break;

            case "relative":
              this._isRelative = true;
              if ("file" != this._scheme) this._scheme = base._scheme;
              if (EOF == c) {
                this._host = base._host;
                this._port = base._port;
                this._path = base._path.slice();
                this._query = base._query;
                this._username = base._username;
                this._password = base._password;
                break loop;
              } else if ("/" == c || "\\" == c) {
                if ("\\" == c) err("\\ is an invalid code point.");
                state = "relative slash";
              } else if ("?" == c) {
                this._host = base._host;
                this._port = base._port;
                this._path = base._path.slice();
                this._query = "?";
                this._username = base._username;
                this._password = base._password;
                state = "query";
              } else if ("#" == c) {
                this._host = base._host;
                this._port = base._port;
                this._path = base._path.slice();
                this._query = base._query;
                this._fragment = "#";
                this._username = base._username;
                this._password = base._password;
                state = "fragment";
              } else {
                var nextC = input[cursor + 1];
                var nextNextC = input[cursor + 2];
                if ("file" != this._scheme || !ALPHA.test(c) || nextC != ":" && nextC != "|" || EOF != nextNextC && "/" != nextNextC && "\\" != nextNextC && "?" != nextNextC && "#" != nextNextC) {
                  this._host = base._host;
                  this._port = base._port;
                  this._username = base._username;
                  this._password = base._password;
                  this._path = base._path.slice();
                  this._path.pop();
                }
                state = "relative path";
                continue;
              }
              break;

            case "relative slash":
              if ("/" == c || "\\" == c) {
                if ("\\" == c) {
                  err("\\ is an invalid code point.");
                }
                if ("file" == this._scheme) {
                  state = "file host";
                } else {
                  state = "authority ignore slashes";
                }
              } else {
                if ("file" != this._scheme) {
                  this._host = base._host;
                  this._port = base._port;
                  this._username = base._username;
                  this._password = base._password;
                }
                state = "relative path";
                continue;
              }
              break;

            case "authority first slash":
              if ("/" == c) {
                state = "authority second slash";
              } else {
                err("Expected '/', got: " + c);
                state = "authority ignore slashes";
                continue;
              }
              break;

            case "authority second slash":
              state = "authority ignore slashes";
              if ("/" != c) {
                err("Expected '/', got: " + c);
                continue;
              }
              break;

            case "authority ignore slashes":
              if ("/" != c && "\\" != c) {
                state = "authority";
                continue;
              } else {
                err("Expected authority, got: " + c);
              }
              break;

            case "authority":
              if ("@" == c) {
                if (seenAt) {
                  err("@ already seen.");
                  buffer += "%40";
                }
                seenAt = true;
                for (var i = 0; i < buffer.length; i++) {
                  var cp = buffer[i];
                  if ("\t" == cp || "\n" == cp || "\r" == cp) {
                    err("Invalid whitespace in authority.");
                    continue;
                  }
                  if (":" == cp && null === this._password) {
                    this._password = "";
                    continue;
                  }
                  var tempC = percentEscape(cp);
                  null !== this._password ? this._password += tempC : this._username += tempC;
                }
                buffer = "";
              } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
                cursor -= buffer.length;
                buffer = "";
                state = "host";
                continue;
              } else {
                buffer += c;
              }
              break;

            case "file host":
              if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
                if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ":" || buffer[1] == "|")) {
                  state = "relative path";
                } else if (buffer.length == 0) {
                  state = "relative path start";
                } else {
                  this._host = IDNAToASCII.call(this, buffer);
                  buffer = "";
                  state = "relative path start";
                }
                continue;
              } else if ("\t" == c || "\n" == c || "\r" == c) {
                err("Invalid whitespace in file host.");
              } else {
                buffer += c;
              }
              break;

            case "host":
            case "hostname":
              if (":" == c && !seenBracket) {
                this._host = IDNAToASCII.call(this, buffer);
                buffer = "";
                state = "port";
                if ("hostname" == stateOverride) {
                  break loop;
                }
              } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
                this._host = IDNAToASCII.call(this, buffer);
                buffer = "";
                state = "relative path start";
                if (stateOverride) {
                  break loop;
                }
                continue;
              } else if ("\t" != c && "\n" != c && "\r" != c) {
                if ("[" == c) {
                  seenBracket = true;
                } else if ("]" == c) {
                  seenBracket = false;
                }
                buffer += c;
              } else {
                err("Invalid code point in host/hostname: " + c);
              }
              break;

            case "port":
              if (/[0-9]/.test(c)) {
                buffer += c;
              } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c || stateOverride) {
                if ("" != buffer) {
                  var temp = parseInt(buffer, 10);
                  if (temp != relative[this._scheme]) {
                    this._port = temp + "";
                  }
                  buffer = "";
                }
                if (stateOverride) {
                  break loop;
                }
                state = "relative path start";
                continue;
              } else if ("\t" == c || "\n" == c || "\r" == c) {
                err("Invalid code point in port: " + c);
              } else {
                invalid.call(this);
              }
              break;

            case "relative path start":
              if ("\\" == c) err("'\\' not allowed in path.");
              state = "relative path";
              if ("/" != c && "\\" != c) {
                continue;
              }
              break;

            case "relative path":
              if (EOF == c || "/" == c || "\\" == c || !stateOverride && ("?" == c || "#" == c)) {
                if ("\\" == c) {
                  err("\\ not allowed in relative path.");
                }
                var tmp;
                if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
                  buffer = tmp;
                }
                if (".." == buffer) {
                  this._path.pop();
                  if ("/" != c && "\\" != c) {
                    this._path.push("");
                  }
                } else if ("." == buffer && "/" != c && "\\" != c) {
                  this._path.push("");
                } else if ("." != buffer) {
                  if ("file" == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == "|") {
                    buffer = buffer[0] + ":";
                  }
                  this._path.push(buffer);
                }
                buffer = "";
                if ("?" == c) {
                  this._query = "?";
                  state = "query";
                } else if ("#" == c) {
                  this._fragment = "#";
                  state = "fragment";
                }
              } else if ("\t" != c && "\n" != c && "\r" != c) {
                buffer += percentEscape(c);
              }
              break;

            case "query":
              if (!stateOverride && "#" == c) {
                this._fragment = "#";
                state = "fragment";
              } else if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
                this._query += percentEscapeQuery(c);
              }
              break;

            case "fragment":
              if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
                this._fragment += c;
              }
              break;
          }
          cursor++;
        }
      }
      function clear() {
        this._scheme = "";
        this._schemeData = "";
        this._username = "";
        this._password = null;
        this._host = "";
        this._port = "";
        this._path = [];
        this._query = "";
        this._fragment = "";
        this._isInvalid = false;
        this._isRelative = false;
      }
      function jURL(url, base) {
        if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));
        this._url = url;
        clear.call(this);
        var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
        parse.call(this, input, null, base);
      }
      jURL.prototype = {
        toString: function () {
          return this.href;
        },
        get href() {
          if (this._isInvalid) return this._url;
          var authority = "";
          if ("" != this._username || null != this._password) {
            authority = this._username + (null != this._password ? ":" + this._password : "") + "@";
          }
          return this.protocol + (this._isRelative ? "//" + authority + this.host : "") + this.pathname + this._query + this._fragment;
        },
        set href(href) {
          clear.call(this);
          parse.call(this, href);
        },
        get protocol() {
          return this._scheme + ":";
        },
        set protocol(protocol) {
          if (this._isInvalid) return;
          parse.call(this, protocol + ":", "scheme start");
        },
        get host() {
          return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host;
        },
        set host(host) {
          if (this._isInvalid || !this._isRelative) return;
          parse.call(this, host, "host");
        },
        get hostname() {
          return this._host;
        },
        set hostname(hostname) {
          if (this._isInvalid || !this._isRelative) return;
          parse.call(this, hostname, "hostname");
        },
        get port() {
          return this._port;
        },
        set port(port) {
          if (this._isInvalid || !this._isRelative) return;
          parse.call(this, port, "port");
        },
        get pathname() {
          return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData;
        },
        set pathname(pathname) {
          if (this._isInvalid || !this._isRelative) return;
          this._path = [];
          parse.call(this, pathname, "relative path start");
        },
        get search() {
          return this._isInvalid || !this._query || "?" == this._query ? "" : this._query;
        },
        set search(search) {
          if (this._isInvalid || !this._isRelative) return;
          this._query = "?";
          if ("?" == search[0]) search = search.slice(1);
          parse.call(this, search, "query");
        },
        get hash() {
          return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment;
        },
        set hash(hash) {
          if (this._isInvalid) return;
          this._fragment = "#";
          if ("#" == hash[0]) hash = hash.slice(1);
          parse.call(this, hash, "fragment");
        },
        get origin() {
          var host;
          if (this._isInvalid || !this._scheme) {
            return "";
          }
          switch (this._scheme) {
            case "data":
            case "file":
            case "javascript":
            case "mailto":
              return "null";
          }
          host = this.host;
          if (!host) {
            return "";
          }
          return this._scheme + "://" + host;
        }
      };
      var OriginalURL = scope.URL;
      if (OriginalURL) {
        jURL.createObjectURL = function (blob) {
          return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
        };
        jURL.revokeObjectURL = function (url) {
          OriginalURL.revokeObjectURL(url);
        };
      }
      scope.URL = jURL;
    })(self);

    if (typeof WeakMap === "undefined") {
      (function () {
        var defineProperty = Object.defineProperty;
        var counter = Date.now() % 1e9;
        var WeakMap = function () {
          this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__");
        };
        WeakMap.prototype = {
          set: function (key, value) {
            var entry = key[this.name];
            if (entry && entry[0] === key) entry[1] = value;else defineProperty(key, this.name, {
              value: [key, value],
              writable: true
            });
            return this;
          },
          get: function (key) {
            var entry;
            return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
          },
          "delete": function (key) {
            var entry = key[this.name];
            if (!entry || entry[0] !== key) return false;
            entry[0] = entry[1] = undefined;
            return true;
          },
          has: function (key) {
            var entry = key[this.name];
            if (!entry) return false;
            return entry[0] === key;
          }
        };
        window.WeakMap = WeakMap;
      })();
    }

    (function (global) {
      if (global.JsMutationObserver) {
        return;
      }
      var registrationsTable = new WeakMap();
      var setImmediate;
      if (/Trident|Edge/.test(navigator.userAgent)) {
        setImmediate = setTimeout;
      } else if (window.setImmediate) {
        setImmediate = window.setImmediate;
      } else {
        var setImmediateQueue = [];
        var sentinel = String(Math.random());
        window.addEventListener("message", function (e) {
          if (e.data === sentinel) {
            var queue = setImmediateQueue;
            setImmediateQueue = [];
            queue.forEach(function (func) {
              func();
            });
          }
        });
        setImmediate = function (func) {
          setImmediateQueue.push(func);
          window.postMessage(sentinel, "*");
        };
      }
      var isScheduled = false;
      var scheduledObservers = [];
      function scheduleCallback(observer) {
        scheduledObservers.push(observer);
        if (!isScheduled) {
          isScheduled = true;
          setImmediate(dispatchCallbacks);
        }
      }
      function wrapIfNeeded(node) {
        return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
      }
      function dispatchCallbacks() {
        isScheduled = false;
        var observers = scheduledObservers;
        scheduledObservers = [];
        observers.sort(function (o1, o2) {
          return o1.uid_ - o2.uid_;
        });
        var anyNonEmpty = false;
        observers.forEach(function (observer) {
          var queue = observer.takeRecords();
          removeTransientObserversFor(observer);
          if (queue.length) {
            observer.callback_(queue, observer);
            anyNonEmpty = true;
          }
        });
        if (anyNonEmpty) dispatchCallbacks();
      }
      function removeTransientObserversFor(observer) {
        observer.nodes_.forEach(function (node) {
          var registrations = registrationsTable.get(node);
          if (!registrations) return;
          registrations.forEach(function (registration) {
            if (registration.observer === observer) registration.removeTransientObservers();
          });
        });
      }
      function forEachAncestorAndObserverEnqueueRecord(target, callback) {
        for (var node = target; node; node = node.parentNode) {
          var registrations = registrationsTable.get(node);
          if (registrations) {
            for (var j = 0; j < registrations.length; j++) {
              var registration = registrations[j];
              var options = registration.options;
              if (node !== target && !options.subtree) continue;
              var record = callback(options);
              if (record) registration.enqueue(record);
            }
          }
        }
      }
      var uidCounter = 0;
      function JsMutationObserver(callback) {
        this.callback_ = callback;
        this.nodes_ = [];
        this.records_ = [];
        this.uid_ = ++uidCounter;
      }
      JsMutationObserver.prototype = {
        observe: function (target, options) {
          target = wrapIfNeeded(target);
          if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
            throw new SyntaxError();
          }
          var registrations = registrationsTable.get(target);
          if (!registrations) registrationsTable.set(target, registrations = []);
          var registration;
          for (var i = 0; i < registrations.length; i++) {
            if (registrations[i].observer === this) {
              registration = registrations[i];
              registration.removeListeners();
              registration.options = options;
              break;
            }
          }
          if (!registration) {
            registration = new Registration(this, target, options);
            registrations.push(registration);
            this.nodes_.push(target);
          }
          registration.addListeners();
        },
        disconnect: function () {
          this.nodes_.forEach(function (node) {
            var registrations = registrationsTable.get(node);
            for (var i = 0; i < registrations.length; i++) {
              var registration = registrations[i];
              if (registration.observer === this) {
                registration.removeListeners();
                registrations.splice(i, 1);
                break;
              }
            }
          }, this);
          this.records_ = [];
        },
        takeRecords: function () {
          var copyOfRecords = this.records_;
          this.records_ = [];
          return copyOfRecords;
        }
      };
      function MutationRecord(type, target) {
        this.type = type;
        this.target = target;
        this.addedNodes = [];
        this.removedNodes = [];
        this.previousSibling = null;
        this.nextSibling = null;
        this.attributeName = null;
        this.attributeNamespace = null;
        this.oldValue = null;
      }
      function copyMutationRecord(original) {
        var record = new MutationRecord(original.type, original.target);
        record.addedNodes = original.addedNodes.slice();
        record.removedNodes = original.removedNodes.slice();
        record.previousSibling = original.previousSibling;
        record.nextSibling = original.nextSibling;
        record.attributeName = original.attributeName;
        record.attributeNamespace = original.attributeNamespace;
        record.oldValue = original.oldValue;
        return record;
      }
      var currentRecord, recordWithOldValue;
      function getRecord(type, target) {
        return currentRecord = new MutationRecord(type, target);
      }
      function getRecordWithOldValue(oldValue) {
        if (recordWithOldValue) return recordWithOldValue;
        recordWithOldValue = copyMutationRecord(currentRecord);
        recordWithOldValue.oldValue = oldValue;
        return recordWithOldValue;
      }
      function clearRecords() {
        currentRecord = recordWithOldValue = undefined;
      }
      function recordRepresentsCurrentMutation(record) {
        return record === recordWithOldValue || record === currentRecord;
      }
      function selectRecord(lastRecord, newRecord) {
        if (lastRecord === newRecord) return lastRecord;
        if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
        return null;
      }
      function Registration(observer, target, options) {
        this.observer = observer;
        this.target = target;
        this.options = options;
        this.transientObservedNodes = [];
      }
      Registration.prototype = {
        enqueue: function (record) {
          var records = this.observer.records_;
          var length = records.length;
          if (records.length > 0) {
            var lastRecord = records[length - 1];
            var recordToReplaceLast = selectRecord(lastRecord, record);
            if (recordToReplaceLast) {
              records[length - 1] = recordToReplaceLast;
              return;
            }
          } else {
            scheduleCallback(this.observer);
          }
          records[length] = record;
        },
        addListeners: function () {
          this.addListeners_(this.target);
        },
        addListeners_: function (node) {
          var options = this.options;
          if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
          if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
          if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
          if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true);
        },
        removeListeners: function () {
          this.removeListeners_(this.target);
        },
        removeListeners_: function (node) {
          var options = this.options;
          if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
          if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
          if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
          if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true);
        },
        addTransientObserver: function (node) {
          if (node === this.target) return;
          this.addListeners_(node);
          this.transientObservedNodes.push(node);
          var registrations = registrationsTable.get(node);
          if (!registrations) registrationsTable.set(node, registrations = []);
          registrations.push(this);
        },
        removeTransientObservers: function () {
          var transientObservedNodes = this.transientObservedNodes;
          this.transientObservedNodes = [];
          transientObservedNodes.forEach(function (node) {
            this.removeListeners_(node);
            var registrations = registrationsTable.get(node);
            for (var i = 0; i < registrations.length; i++) {
              if (registrations[i] === this) {
                registrations.splice(i, 1);
                break;
              }
            }
          }, this);
        },
        handleEvent: function (e) {
          e.stopImmediatePropagation();
          switch (e.type) {
            case "DOMAttrModified":
              var name = e.attrName;
              var namespace = e.relatedNode.namespaceURI;
              var target = e.target;
              var record = new getRecord("attributes", target);
              record.attributeName = name;
              record.attributeNamespace = namespace;
              var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
              forEachAncestorAndObserverEnqueueRecord(target, function (options) {
                if (!options.attributes) return;
                if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
                  return;
                }
                if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
                return record;
              });
              break;

            case "DOMCharacterDataModified":
              var target = e.target;
              var record = getRecord("characterData", target);
              var oldValue = e.prevValue;
              forEachAncestorAndObserverEnqueueRecord(target, function (options) {
                if (!options.characterData) return;
                if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
                return record;
              });
              break;

            case "DOMNodeRemoved":
              this.addTransientObserver(e.target);

            case "DOMNodeInserted":
              var changedNode = e.target;
              var addedNodes, removedNodes;
              if (e.type === "DOMNodeInserted") {
                addedNodes = [changedNode];
                removedNodes = [];
              } else {
                addedNodes = [];
                removedNodes = [changedNode];
              }
              var previousSibling = changedNode.previousSibling;
              var nextSibling = changedNode.nextSibling;
              var record = getRecord("childList", e.target.parentNode);
              record.addedNodes = addedNodes;
              record.removedNodes = removedNodes;
              record.previousSibling = previousSibling;
              record.nextSibling = nextSibling;
              forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function (options) {
                if (!options.childList) return;
                return record;
              });
          }
          clearRecords();
        }
      };
      global.JsMutationObserver = JsMutationObserver;
      if (!global.MutationObserver) {
        global.MutationObserver = JsMutationObserver;
        JsMutationObserver._isPolyfilled = true;
      }
    })(self);

    (function () {
      var needsTemplate = typeof HTMLTemplateElement === "undefined";
      if (/Trident/.test(navigator.userAgent)) {
        (function () {
          var importNode = document.importNode;
          document.importNode = function () {
            var n = importNode.apply(document, arguments);
            if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
              var f = document.createDocumentFragment();
              f.appendChild(n);
              return f;
            } else {
              return n;
            }
          };
        })();
      }
      var needsCloning = function () {
        if (!needsTemplate) {
          var t = document.createElement("template");
          var t2 = document.createElement("template");
          t2.content.appendChild(document.createElement("div"));
          t.content.appendChild(t2);
          var clone = t.cloneNode(true);
          return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0;
        }
      }();
      var TEMPLATE_TAG = "template";
      var TemplateImpl = function () {};
      if (needsTemplate) {
        var contentDoc = document.implementation.createHTMLDocument("template");
        var canDecorate = true;
        var templateStyle = document.createElement("style");
        templateStyle.textContent = TEMPLATE_TAG + "{display:none;}";
        var head = document.head;
        head.insertBefore(templateStyle, head.firstElementChild);
        TemplateImpl.prototype = Object.create(HTMLElement.prototype);
        TemplateImpl.decorate = function (template) {
          if (template.content) {
            return;
          }
          template.content = contentDoc.createDocumentFragment();
          var child;
          while (child = template.firstChild) {
            template.content.appendChild(child);
          }
          template.cloneNode = function (deep) {
            return TemplateImpl.cloneNode(this, deep);
          };
          if (canDecorate) {
            try {
              Object.defineProperty(template, "innerHTML", {
                get: function () {
                  var o = "";
                  for (var e = this.content.firstChild; e; e = e.nextSibling) {
                    o += e.outerHTML || escapeData(e.data);
                  }
                  return o;
                },
                set: function (text) {
                  contentDoc.body.innerHTML = text;
                  TemplateImpl.bootstrap(contentDoc);
                  while (this.content.firstChild) {
                    this.content.removeChild(this.content.firstChild);
                  }
                  while (contentDoc.body.firstChild) {
                    this.content.appendChild(contentDoc.body.firstChild);
                  }
                },
                configurable: true
              });
            } catch (err) {
              canDecorate = false;
            }
          }
          TemplateImpl.bootstrap(template.content);
        };
        TemplateImpl.bootstrap = function (doc) {
          var templates = doc.querySelectorAll(TEMPLATE_TAG);
          for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
            TemplateImpl.decorate(t);
          }
        };
        document.addEventListener("DOMContentLoaded", function () {
          TemplateImpl.bootstrap(document);
        });
        var createElement = document.createElement;
        document.createElement = function () {
          "use strict";

          var el = createElement.apply(document, arguments);
          if (el.localName === "template") {
            TemplateImpl.decorate(el);
          }
          return el;
        };
        var escapeDataRegExp = /[&\u00A0<>]/g;
        function escapeReplace(c) {
          switch (c) {
            case "&":
              return "&amp;";

            case "<":
              return "&lt;";

            case ">":
              return "&gt;";

            case " ":
              return "&nbsp;";
          }
        }
        function escapeData(s) {
          return s.replace(escapeDataRegExp, escapeReplace);
        }
      }
      if (needsTemplate || needsCloning) {
        var nativeCloneNode = Node.prototype.cloneNode;
        TemplateImpl.cloneNode = function (template, deep) {
          var clone = nativeCloneNode.call(template, false);
          if (this.decorate) {
            this.decorate(clone);
          }
          if (deep) {
            clone.content.appendChild(nativeCloneNode.call(template.content, true));
            this.fixClonedDom(clone.content, template.content);
          }
          return clone;
        };
        TemplateImpl.fixClonedDom = function (clone, source) {
          if (!source.querySelectorAll) return;
          var s$ = source.querySelectorAll(TEMPLATE_TAG);
          var t$ = clone.querySelectorAll(TEMPLATE_TAG);
          for (var i = 0, l = t$.length, t, s; i < l; i++) {
            s = s$[i];
            t = t$[i];
            if (this.decorate) {
              this.decorate(s);
            }
            t.parentNode.replaceChild(s.cloneNode(true), t);
          }
        };
        var originalImportNode = document.importNode;
        Node.prototype.cloneNode = function (deep) {
          var dom = nativeCloneNode.call(this, deep);
          if (deep) {
            TemplateImpl.fixClonedDom(dom, this);
          }
          return dom;
        };
        document.importNode = function (element, deep) {
          if (element.localName === TEMPLATE_TAG) {
            return TemplateImpl.cloneNode(element, deep);
          } else {
            var dom = originalImportNode.call(document, element, deep);
            if (deep) {
              TemplateImpl.fixClonedDom(dom, element);
            }
            return dom;
          }
        };
        if (needsCloning) {
          HTMLTemplateElement.prototype.cloneNode = function (deep) {
            return TemplateImpl.cloneNode(this, deep);
          };
        }
      }
      if (needsTemplate) {
        window.HTMLTemplateElement = TemplateImpl;
      }
    })();

    (function (scope) {
      "use strict";

      if (!(window.performance && window.performance.now)) {
        var start = Date.now();
        window.performance = {
          now: function () {
            return Date.now() - start;
          }
        };
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function () {
          var nativeRaf = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
          return nativeRaf ? function (callback) {
            return nativeRaf(function () {
              callback(performance.now());
            });
          } : function (callback) {
            return window.setTimeout(callback, 1e3 / 60);
          };
        }();
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function () {
          return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
            clearTimeout(id);
          };
        }();
      }
      var workingDefaultPrevented = function () {
        var e = document.createEvent("Event");
        e.initEvent("foo", true, true);
        e.preventDefault();
        return e.defaultPrevented;
      }();
      if (!workingDefaultPrevented) {
        var origPreventDefault = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function () {
          if (!this.cancelable) {
            return;
          }
          origPreventDefault.call(this);
          Object.defineProperty(this, "defaultPrevented", {
            get: function () {
              return true;
            },
            configurable: true
          });
        };
      }
      var isIE = /Trident/.test(navigator.userAgent);
      if (!window.CustomEvent || isIE && typeof window.CustomEvent !== "function") {
        window.CustomEvent = function (inType, params) {
          params = params || {};
          var e = document.createEvent("CustomEvent");
          e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
          return e;
        };
        window.CustomEvent.prototype = window.Event.prototype;
      }
      if (!window.Event || isIE && typeof window.Event !== "function") {
        var origEvent = window.Event;
        window.Event = function (inType, params) {
          params = params || {};
          var e = document.createEvent("Event");
          e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
          return e;
        };
        window.Event.prototype = origEvent.prototype;
      }
    })(window.WebComponents);

    window.HTMLImports = window.HTMLImports || {
      flags: {}
    };

    (function (scope) {
      var IMPORT_LINK_TYPE = "import";
      var useNative = Boolean(IMPORT_LINK_TYPE in document.createElement("link"));
      var hasShadowDOMPolyfill = Boolean(window.ShadowDOMPolyfill);
      var wrap = function (node) {
        return hasShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(node) : node;
      };
      var rootDocument = wrap(document);
      var currentScriptDescriptor = {
        get: function () {
          var script = window.HTMLImports.currentScript || document.currentScript || (document.readyState !== "complete" ? document.scripts[document.scripts.length - 1] : null);
          return wrap(script);
        },
        configurable: true
      };
      Object.defineProperty(document, "_currentScript", currentScriptDescriptor);
      Object.defineProperty(rootDocument, "_currentScript", currentScriptDescriptor);
      var isIE = /Trident/.test(navigator.userAgent);
      function whenReady(callback, doc) {
        doc = doc || rootDocument;
        whenDocumentReady(function () {
          watchImportsLoad(callback, doc);
        }, doc);
      }
      var requiredReadyState = isIE ? "complete" : "interactive";
      var READY_EVENT = "readystatechange";
      function isDocumentReady(doc) {
        return doc.readyState === "complete" || doc.readyState === requiredReadyState;
      }
      function whenDocumentReady(callback, doc) {
        if (!isDocumentReady(doc)) {
          var checkReady = function () {
            if (doc.readyState === "complete" || doc.readyState === requiredReadyState) {
              doc.removeEventListener(READY_EVENT, checkReady);
              whenDocumentReady(callback, doc);
            }
          };
          doc.addEventListener(READY_EVENT, checkReady);
        } else if (callback) {
          callback();
        }
      }
      function markTargetLoaded(event) {
        event.target.__loaded = true;
      }
      function watchImportsLoad(callback, doc) {
        var imports = doc.querySelectorAll("link[rel=import]");
        var parsedCount = 0,
            importCount = imports.length,
            newImports = [],
            errorImports = [];
        function checkDone() {
          if (parsedCount == importCount && callback) {
            callback({
              allImports: imports,
              loadedImports: newImports,
              errorImports: errorImports
            });
          }
        }
        function loadedImport(e) {
          markTargetLoaded(e);
          newImports.push(this);
          parsedCount++;
          checkDone();
        }
        function errorLoadingImport(e) {
          errorImports.push(this);
          parsedCount++;
          checkDone();
        }
        if (importCount) {
          for (var i = 0, imp; i < importCount && (imp = imports[i]); i++) {
            if (isImportLoaded(imp)) {
              newImports.push(this);
              parsedCount++;
              checkDone();
            } else {
              imp.addEventListener("load", loadedImport);
              imp.addEventListener("error", errorLoadingImport);
            }
          }
        } else {
          checkDone();
        }
      }
      function isImportLoaded(link) {
        return useNative ? link.__loaded || link.import && link.import.readyState !== "loading" : link.__importParsed;
      }
      if (useNative) {
        new MutationObserver(function (mxns) {
          for (var i = 0, l = mxns.length, m; i < l && (m = mxns[i]); i++) {
            if (m.addedNodes) {
              handleImports(m.addedNodes);
            }
          }
        }).observe(document.head, {
          childList: true
        });
        function handleImports(nodes) {
          for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
            if (isImport(n)) {
              handleImport(n);
            }
          }
        }
        function isImport(element) {
          return element.localName === "link" && element.rel === "import";
        }
        function handleImport(element) {
          var loaded = element.import;
          if (loaded) {
            markTargetLoaded({
              target: element
            });
          } else {
            element.addEventListener("load", markTargetLoaded);
            element.addEventListener("error", markTargetLoaded);
          }
        }
        (function () {
          if (document.readyState === "loading") {
            var imports = document.querySelectorAll("link[rel=import]");
            for (var i = 0, l = imports.length, imp; i < l && (imp = imports[i]); i++) {
              handleImport(imp);
            }
          }
        })();
      }
      whenReady(function (detail) {
        window.HTMLImports.ready = true;
        window.HTMLImports.readyTime = new Date().getTime();
        var evt = rootDocument.createEvent("CustomEvent");
        evt.initCustomEvent("HTMLImportsLoaded", true, true, detail);
        rootDocument.dispatchEvent(evt);
      });
      scope.IMPORT_LINK_TYPE = IMPORT_LINK_TYPE;
      scope.useNative = useNative;
      scope.rootDocument = rootDocument;
      scope.whenReady = whenReady;
      scope.isIE = isIE;
    })(window.HTMLImports);

    (function (scope) {
      var modules = [];
      var addModule = function (module) {
        modules.push(module);
      };
      var initializeModules = function () {
        modules.forEach(function (module) {
          module(scope);
        });
      };
      scope.addModule = addModule;
      scope.initializeModules = initializeModules;
    })(window.HTMLImports);

    window.HTMLImports.addModule(function (scope) {
      var CSS_URL_REGEXP = /(url\()([^)]*)(\))/g;
      var CSS_IMPORT_REGEXP = /(@import[\s]+(?!url\())([^;]*)(;)/g;
      var path = {
        resolveUrlsInStyle: function (style, linkUrl) {
          var doc = style.ownerDocument;
          var resolver = doc.createElement("a");
          style.textContent = this.resolveUrlsInCssText(style.textContent, linkUrl, resolver);
          return style;
        },
        resolveUrlsInCssText: function (cssText, linkUrl, urlObj) {
          var r = this.replaceUrls(cssText, urlObj, linkUrl, CSS_URL_REGEXP);
          r = this.replaceUrls(r, urlObj, linkUrl, CSS_IMPORT_REGEXP);
          return r;
        },
        replaceUrls: function (text, urlObj, linkUrl, regexp) {
          return text.replace(regexp, function (m, pre, url, post) {
            var urlPath = url.replace(/["']/g, "");
            if (linkUrl) {
              urlPath = new URL(urlPath, linkUrl).href;
            }
            urlObj.href = urlPath;
            urlPath = urlObj.href;
            return pre + "'" + urlPath + "'" + post;
          });
        }
      };
      scope.path = path;
    });

    window.HTMLImports.addModule(function (scope) {
      var xhr = {
        async: true,
        ok: function (request) {
          return request.status >= 200 && request.status < 300 || request.status === 304 || request.status === 0;
        },
        load: function (url, next, nextContext) {
          var request = new XMLHttpRequest();
          if (scope.flags.debug || scope.flags.bust) {
            url += "?" + Math.random();
          }
          request.open("GET", url, xhr.async);
          request.addEventListener("readystatechange", function (e) {
            if (request.readyState === 4) {
              var redirectedUrl = null;
              try {
                var locationHeader = request.getResponseHeader("Location");
                if (locationHeader) {
                  redirectedUrl = locationHeader.substr(0, 1) === "/" ? location.origin + locationHeader : locationHeader;
                }
              } catch (e) {
                console.error(e.message);
              }
              next.call(nextContext, !xhr.ok(request) && request, request.response || request.responseText, redirectedUrl);
            }
          });
          request.send();
          return request;
        },
        loadDocument: function (url, next, nextContext) {
          this.load(url, next, nextContext).responseType = "document";
        }
      };
      scope.xhr = xhr;
    });

    window.HTMLImports.addModule(function (scope) {
      var xhr = scope.xhr;
      var flags = scope.flags;
      var Loader = function (onLoad, onComplete) {
        this.cache = {};
        this.onload = onLoad;
        this.oncomplete = onComplete;
        this.inflight = 0;
        this.pending = {};
      };
      Loader.prototype = {
        addNodes: function (nodes) {
          this.inflight += nodes.length;
          for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
            this.require(n);
          }
          this.checkDone();
        },
        addNode: function (node) {
          this.inflight++;
          this.require(node);
          this.checkDone();
        },
        require: function (elt) {
          var url = elt.src || elt.href;
          elt.__nodeUrl = url;
          if (!this.dedupe(url, elt)) {
            this.fetch(url, elt);
          }
        },
        dedupe: function (url, elt) {
          if (this.pending[url]) {
            this.pending[url].push(elt);
            return true;
          }
          var resource;
          if (this.cache[url]) {
            this.onload(url, elt, this.cache[url]);
            this.tail();
            return true;
          }
          this.pending[url] = [elt];
          return false;
        },
        fetch: function (url, elt) {
          flags.load && console.log("fetch", url, elt);
          if (!url) {
            setTimeout(function () {
              this.receive(url, elt, {
                error: "href must be specified"
              }, null);
            }.bind(this), 0);
          } else if (url.match(/^data:/)) {
            var pieces = url.split(",");
            var header = pieces[0];
            var body = pieces[1];
            if (header.indexOf(";base64") > -1) {
              body = atob(body);
            } else {
              body = decodeURIComponent(body);
            }
            setTimeout(function () {
              this.receive(url, elt, null, body);
            }.bind(this), 0);
          } else {
            var receiveXhr = function (err, resource, redirectedUrl) {
              this.receive(url, elt, err, resource, redirectedUrl);
            }.bind(this);
            xhr.load(url, receiveXhr);
          }
        },
        receive: function (url, elt, err, resource, redirectedUrl) {
          this.cache[url] = resource;
          var $p = this.pending[url];
          for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
            this.onload(url, p, resource, err, redirectedUrl);
            this.tail();
          }
          this.pending[url] = null;
        },
        tail: function () {
          --this.inflight;
          this.checkDone();
        },
        checkDone: function () {
          if (!this.inflight) {
            this.oncomplete();
          }
        }
      };
      scope.Loader = Loader;
    });

    window.HTMLImports.addModule(function (scope) {
      var Observer = function (addCallback) {
        this.addCallback = addCallback;
        this.mo = new MutationObserver(this.handler.bind(this));
      };
      Observer.prototype = {
        handler: function (mutations) {
          for (var i = 0, l = mutations.length, m; i < l && (m = mutations[i]); i++) {
            if (m.type === "childList" && m.addedNodes.length) {
              this.addedNodes(m.addedNodes);
            }
          }
        },
        addedNodes: function (nodes) {
          if (this.addCallback) {
            this.addCallback(nodes);
          }
          for (var i = 0, l = nodes.length, n, loading; i < l && (n = nodes[i]); i++) {
            if (n.children && n.children.length) {
              this.addedNodes(n.children);
            }
          }
        },
        observe: function (root) {
          this.mo.observe(root, {
            childList: true,
            subtree: true
          });
        }
      };
      scope.Observer = Observer;
    });

    window.HTMLImports.addModule(function (scope) {
      var path = scope.path;
      var rootDocument = scope.rootDocument;
      var flags = scope.flags;
      var isIE = scope.isIE;
      var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
      var IMPORT_SELECTOR = "link[rel=" + IMPORT_LINK_TYPE + "]";
      var importParser = {
        documentSelectors: IMPORT_SELECTOR,
        importsSelectors: [IMPORT_SELECTOR, "link[rel=stylesheet]:not([type])", "style:not([type])", "script:not([type])", 'script[type="application/javascript"]', 'script[type="text/javascript"]'].join(","),
        map: {
          link: "parseLink",
          script: "parseScript",
          style: "parseStyle"
        },
        dynamicElements: [],
        parseNext: function () {
          var next = this.nextToParse();
          if (next) {
            this.parse(next);
          }
        },
        parse: function (elt) {
          if (this.isParsed(elt)) {
            flags.parse && console.log("[%s] is already parsed", elt.localName);
            return;
          }
          var fn = this[this.map[elt.localName]];
          if (fn) {
            this.markParsing(elt);
            fn.call(this, elt);
          }
        },
        parseDynamic: function (elt, quiet) {
          this.dynamicElements.push(elt);
          if (!quiet) {
            this.parseNext();
          }
        },
        markParsing: function (elt) {
          flags.parse && console.log("parsing", elt);
          this.parsingElement = elt;
        },
        markParsingComplete: function (elt) {
          elt.__importParsed = true;
          this.markDynamicParsingComplete(elt);
          if (elt.__importElement) {
            elt.__importElement.__importParsed = true;
            this.markDynamicParsingComplete(elt.__importElement);
          }
          this.parsingElement = null;
          flags.parse && console.log("completed", elt);
        },
        markDynamicParsingComplete: function (elt) {
          var i = this.dynamicElements.indexOf(elt);
          if (i >= 0) {
            this.dynamicElements.splice(i, 1);
          }
        },
        parseImport: function (elt) {
          elt.import = elt.__doc;
          if (window.HTMLImports.__importsParsingHook) {
            window.HTMLImports.__importsParsingHook(elt);
          }
          if (elt.import) {
            elt.import.__importParsed = true;
          }
          this.markParsingComplete(elt);
          if (elt.__resource && !elt.__error) {
            elt.dispatchEvent(new CustomEvent("load", {
              bubbles: false
            }));
          } else {
            elt.dispatchEvent(new CustomEvent("error", {
              bubbles: false
            }));
          }
          if (elt.__pending) {
            var fn;
            while (elt.__pending.length) {
              fn = elt.__pending.shift();
              if (fn) {
                fn({
                  target: elt
                });
              }
            }
          }
          this.parseNext();
        },
        parseLink: function (linkElt) {
          if (nodeIsImport(linkElt)) {
            this.parseImport(linkElt);
          } else {
            linkElt.href = linkElt.href;
            this.parseGeneric(linkElt);
          }
        },
        parseStyle: function (elt) {
          var src = elt;
          elt = cloneStyle(elt);
          src.__appliedElement = elt;
          elt.__importElement = src;
          this.parseGeneric(elt);
        },
        parseGeneric: function (elt) {
          this.trackElement(elt);
          this.addElementToDocument(elt);
        },
        rootImportForElement: function (elt) {
          var n = elt;
          while (n.ownerDocument.__importLink) {
            n = n.ownerDocument.__importLink;
          }
          return n;
        },
        addElementToDocument: function (elt) {
          var port = this.rootImportForElement(elt.__importElement || elt);
          port.parentNode.insertBefore(elt, port);
        },
        trackElement: function (elt, callback) {
          var self = this;
          var done = function (e) {
            elt.removeEventListener("load", done);
            elt.removeEventListener("error", done);
            if (callback) {
              callback(e);
            }
            self.markParsingComplete(elt);
            self.parseNext();
          };
          elt.addEventListener("load", done);
          elt.addEventListener("error", done);
          if (isIE && elt.localName === "style") {
            var fakeLoad = false;
            if (elt.textContent.indexOf("@import") == -1) {
              fakeLoad = true;
            } else if (elt.sheet) {
              fakeLoad = true;
              var csr = elt.sheet.cssRules;
              var len = csr ? csr.length : 0;
              for (var i = 0, r; i < len && (r = csr[i]); i++) {
                if (r.type === CSSRule.IMPORT_RULE) {
                  fakeLoad = fakeLoad && Boolean(r.styleSheet);
                }
              }
            }
            if (fakeLoad) {
              setTimeout(function () {
                elt.dispatchEvent(new CustomEvent("load", {
                  bubbles: false
                }));
              });
            }
          }
        },
        parseScript: function (scriptElt) {
          var script = document.createElement("script");
          script.__importElement = scriptElt;
          script.src = scriptElt.src ? scriptElt.src : generateScriptDataUrl(scriptElt);
          scope.currentScript = scriptElt;
          this.trackElement(script, function (e) {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
            scope.currentScript = null;
          });
          this.addElementToDocument(script);
        },
        nextToParse: function () {
          this._mayParse = [];
          return !this.parsingElement && (this.nextToParseInDoc(rootDocument) || this.nextToParseDynamic());
        },
        nextToParseInDoc: function (doc, link) {
          if (doc && this._mayParse.indexOf(doc) < 0) {
            this._mayParse.push(doc);
            var nodes = doc.querySelectorAll(this.parseSelectorsForNode(doc));
            for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
              if (!this.isParsed(n)) {
                if (this.hasResource(n)) {
                  return nodeIsImport(n) ? this.nextToParseInDoc(n.__doc, n) : n;
                } else {
                  return;
                }
              }
            }
          }
          return link;
        },
        nextToParseDynamic: function () {
          return this.dynamicElements[0];
        },
        parseSelectorsForNode: function (node) {
          var doc = node.ownerDocument || node;
          return doc === rootDocument ? this.documentSelectors : this.importsSelectors;
        },
        isParsed: function (node) {
          return node.__importParsed;
        },
        needsDynamicParsing: function (elt) {
          return this.dynamicElements.indexOf(elt) >= 0;
        },
        hasResource: function (node) {
          if (nodeIsImport(node) && node.__doc === undefined) {
            return false;
          }
          return true;
        }
      };
      function nodeIsImport(elt) {
        return elt.localName === "link" && elt.rel === IMPORT_LINK_TYPE;
      }
      function generateScriptDataUrl(script) {
        var scriptContent = generateScriptContent(script);
        return "data:text/javascript;charset=utf-8," + encodeURIComponent(scriptContent);
      }
      function generateScriptContent(script) {
        return script.textContent + generateSourceMapHint(script);
      }
      function generateSourceMapHint(script) {
        var owner = script.ownerDocument;
        owner.__importedScripts = owner.__importedScripts || 0;
        var moniker = script.ownerDocument.baseURI;
        var num = owner.__importedScripts ? "-" + owner.__importedScripts : "";
        owner.__importedScripts++;
        return "\n//# sourceURL=" + moniker + num + ".js\n";
      }
      function cloneStyle(style) {
        var clone = style.ownerDocument.createElement("style");
        clone.textContent = style.textContent;
        path.resolveUrlsInStyle(clone);
        return clone;
      }
      scope.parser = importParser;
      scope.IMPORT_SELECTOR = IMPORT_SELECTOR;
    });

    window.HTMLImports.addModule(function (scope) {
      var flags = scope.flags;
      var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
      var IMPORT_SELECTOR = scope.IMPORT_SELECTOR;
      var rootDocument = scope.rootDocument;
      var Loader = scope.Loader;
      var Observer = scope.Observer;
      var parser = scope.parser;
      var importer = {
        documents: {},
        documentPreloadSelectors: IMPORT_SELECTOR,
        importsPreloadSelectors: [IMPORT_SELECTOR].join(","),
        loadNode: function (node) {
          importLoader.addNode(node);
        },
        loadSubtree: function (parent) {
          var nodes = this.marshalNodes(parent);
          importLoader.addNodes(nodes);
        },
        marshalNodes: function (parent) {
          return parent.querySelectorAll(this.loadSelectorsForNode(parent));
        },
        loadSelectorsForNode: function (node) {
          var doc = node.ownerDocument || node;
          return doc === rootDocument ? this.documentPreloadSelectors : this.importsPreloadSelectors;
        },
        loaded: function (url, elt, resource, err, redirectedUrl) {
          flags.load && console.log("loaded", url, elt);
          elt.__resource = resource;
          elt.__error = err;
          if (isImportLink(elt)) {
            var doc = this.documents[url];
            if (doc === undefined) {
              doc = err ? null : makeDocument(resource, redirectedUrl || url);
              if (doc) {
                doc.__importLink = elt;
                this.bootDocument(doc);
              }
              this.documents[url] = doc;
            }
            elt.__doc = doc;
          }
          parser.parseNext();
        },
        bootDocument: function (doc) {
          this.loadSubtree(doc);
          this.observer.observe(doc);
          parser.parseNext();
        },
        loadedAll: function () {
          parser.parseNext();
        }
      };
      var importLoader = new Loader(importer.loaded.bind(importer), importer.loadedAll.bind(importer));
      importer.observer = new Observer();
      function isImportLink(elt) {
        return isLinkRel(elt, IMPORT_LINK_TYPE);
      }
      function isLinkRel(elt, rel) {
        return elt.localName === "link" && elt.getAttribute("rel") === rel;
      }
      function hasBaseURIAccessor(doc) {
        return !!Object.getOwnPropertyDescriptor(doc, "baseURI");
      }
      function makeDocument(resource, url) {
        var doc = document.implementation.createHTMLDocument(IMPORT_LINK_TYPE);
        doc._URL = url;
        var base = doc.createElement("base");
        base.setAttribute("href", url);
        if (!doc.baseURI && !hasBaseURIAccessor(doc)) {
          Object.defineProperty(doc, "baseURI", {
            value: url
          });
        }
        var meta = doc.createElement("meta");
        meta.setAttribute("charset", "utf-8");
        doc.head.appendChild(meta);
        doc.head.appendChild(base);
        doc.body.innerHTML = resource;
        if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
          HTMLTemplateElement.bootstrap(doc);
        }
        return doc;
      }
      if (!document.baseURI) {
        var baseURIDescriptor = {
          get: function () {
            var base = document.querySelector("base");
            return base ? base.href : window.location.href;
          },
          configurable: true
        };
        Object.defineProperty(document, "baseURI", baseURIDescriptor);
        Object.defineProperty(rootDocument, "baseURI", baseURIDescriptor);
      }
      scope.importer = importer;
      scope.importLoader = importLoader;
    });

    window.HTMLImports.addModule(function (scope) {
      var parser = scope.parser;
      var importer = scope.importer;
      var dynamic = {
        added: function (nodes) {
          var owner, parsed, loading;
          for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
            if (!owner) {
              owner = n.ownerDocument;
              parsed = parser.isParsed(owner);
            }
            loading = this.shouldLoadNode(n);
            if (loading) {
              importer.loadNode(n);
            }
            if (this.shouldParseNode(n) && parsed) {
              parser.parseDynamic(n, loading);
            }
          }
        },
        shouldLoadNode: function (node) {
          return node.nodeType === 1 && matches.call(node, importer.loadSelectorsForNode(node));
        },
        shouldParseNode: function (node) {
          return node.nodeType === 1 && matches.call(node, parser.parseSelectorsForNode(node));
        }
      };
      importer.observer.addCallback = dynamic.added.bind(dynamic);
      var matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
    });

    (function (scope) {
      var initializeModules = scope.initializeModules;
      var isIE = scope.isIE;
      if (scope.useNative) {
        return;
      }
      initializeModules();
      var rootDocument = scope.rootDocument;
      function bootstrap() {
        window.HTMLImports.importer.bootDocument(rootDocument);
      }
      if (document.readyState === "complete" || document.readyState === "interactive" && !window.attachEvent) {
        bootstrap();
      } else {
        document.addEventListener("DOMContentLoaded", bootstrap);
      }
    })(window.HTMLImports);

    window.CustomElements = window.CustomElements || {
      flags: {}
    };

    (function (scope) {
      var flags = scope.flags;
      var modules = [];
      var addModule = function (module) {
        modules.push(module);
      };
      var initializeModules = function () {
        modules.forEach(function (module) {
          module(scope);
        });
      };
      scope.addModule = addModule;
      scope.initializeModules = initializeModules;
      scope.hasNative = Boolean(document.registerElement);
      scope.isIE = /Trident/.test(navigator.userAgent);
      scope.useNative = !flags.register && scope.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
    })(window.CustomElements);

    window.CustomElements.addModule(function (scope) {
      var IMPORT_LINK_TYPE = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
      function forSubtree(node, cb) {
        findAllElements(node, function (e) {
          if (cb(e)) {
            return true;
          }
          forRoots(e, cb);
        });
        forRoots(node, cb);
      }
      function findAllElements(node, find, data) {
        var e = node.firstElementChild;
        if (!e) {
          e = node.firstChild;
          while (e && e.nodeType !== Node.ELEMENT_NODE) {
            e = e.nextSibling;
          }
        }
        while (e) {
          if (find(e, data) !== true) {
            findAllElements(e, find, data);
          }
          e = e.nextElementSibling;
        }
        return null;
      }
      function forRoots(node, cb) {
        var root = node.shadowRoot;
        while (root) {
          forSubtree(root, cb);
          root = root.olderShadowRoot;
        }
      }
      function forDocumentTree(doc, cb) {
        _forDocumentTree(doc, cb, []);
      }
      function _forDocumentTree(doc, cb, processingDocuments) {
        doc = window.wrap(doc);
        if (processingDocuments.indexOf(doc) >= 0) {
          return;
        }
        processingDocuments.push(doc);
        var imports = doc.querySelectorAll("link[rel=" + IMPORT_LINK_TYPE + "]");
        for (var i = 0, l = imports.length, n; i < l && (n = imports[i]); i++) {
          if (n.import) {
            _forDocumentTree(n.import, cb, processingDocuments);
          }
        }
        cb(doc);
      }
      scope.forDocumentTree = forDocumentTree;
      scope.forSubtree = forSubtree;
    });

    window.CustomElements.addModule(function (scope) {
      var flags = scope.flags;
      var forSubtree = scope.forSubtree;
      var forDocumentTree = scope.forDocumentTree;
      function addedNode(node, isAttached) {
        return added(node, isAttached) || addedSubtree(node, isAttached);
      }
      function added(node, isAttached) {
        if (scope.upgrade(node, isAttached)) {
          return true;
        }
        if (isAttached) {
          attached(node);
        }
      }
      function addedSubtree(node, isAttached) {
        forSubtree(node, function (e) {
          if (added(e, isAttached)) {
            return true;
          }
        });
      }
      var hasThrottledAttached = window.MutationObserver._isPolyfilled && flags["throttle-attached"];
      scope.hasPolyfillMutations = hasThrottledAttached;
      scope.hasThrottledAttached = hasThrottledAttached;
      var isPendingMutations = false;
      var pendingMutations = [];
      function deferMutation(fn) {
        pendingMutations.push(fn);
        if (!isPendingMutations) {
          isPendingMutations = true;
          setTimeout(takeMutations);
        }
      }
      function takeMutations() {
        isPendingMutations = false;
        var $p = pendingMutations;
        for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
          p();
        }
        pendingMutations = [];
      }
      function attached(element) {
        if (hasThrottledAttached) {
          deferMutation(function () {
            _attached(element);
          });
        } else {
          _attached(element);
        }
      }
      function _attached(element) {
        if (element.__upgraded__ && !element.__attached) {
          element.__attached = true;
          if (element.attachedCallback) {
            element.attachedCallback();
          }
        }
      }
      function detachedNode(node) {
        detached(node);
        forSubtree(node, function (e) {
          detached(e);
        });
      }
      function detached(element) {
        if (hasThrottledAttached) {
          deferMutation(function () {
            _detached(element);
          });
        } else {
          _detached(element);
        }
      }
      function _detached(element) {
        if (element.__upgraded__ && element.__attached) {
          element.__attached = false;
          if (element.detachedCallback) {
            element.detachedCallback();
          }
        }
      }
      function inDocument(element) {
        var p = element;
        var doc = window.wrap(document);
        while (p) {
          if (p == doc) {
            return true;
          }
          p = p.parentNode || p.nodeType === Node.DOCUMENT_FRAGMENT_NODE && p.host;
        }
      }
      function watchShadow(node) {
        if (node.shadowRoot && !node.shadowRoot.__watched) {
          flags.dom && console.log("watching shadow-root for: ", node.localName);
          var root = node.shadowRoot;
          while (root) {
            observe(root);
            root = root.olderShadowRoot;
          }
        }
      }
      function handler(root, mutations) {
        if (flags.dom) {
          var mx = mutations[0];
          if (mx && mx.type === "childList" && mx.addedNodes) {
            if (mx.addedNodes) {
              var d = mx.addedNodes[0];
              while (d && d !== document && !d.host) {
                d = d.parentNode;
              }
              var u = d && (d.URL || d._URL || d.host && d.host.localName) || "";
              u = u.split("/?").shift().split("/").pop();
            }
          }
          console.group("mutations (%d) [%s]", mutations.length, u || "");
        }
        var isAttached = inDocument(root);
        mutations.forEach(function (mx) {
          if (mx.type === "childList") {
            forEach(mx.addedNodes, function (n) {
              if (!n.localName) {
                return;
              }
              addedNode(n, isAttached);
            });
            forEach(mx.removedNodes, function (n) {
              if (!n.localName) {
                return;
              }
              detachedNode(n);
            });
          }
        });
        flags.dom && console.groupEnd();
      }
      function takeRecords(node) {
        node = window.wrap(node);
        if (!node) {
          node = window.wrap(document);
        }
        while (node.parentNode) {
          node = node.parentNode;
        }
        var observer = node.__observer;
        if (observer) {
          handler(node, observer.takeRecords());
          takeMutations();
        }
      }
      var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
      function observe(inRoot) {
        if (inRoot.__observer) {
          return;
        }
        var observer = new MutationObserver(handler.bind(this, inRoot));
        observer.observe(inRoot, {
          childList: true,
          subtree: true
        });
        inRoot.__observer = observer;
      }
      function upgradeDocument(doc) {
        doc = window.wrap(doc);
        flags.dom && console.group("upgradeDocument: ", doc.baseURI.split("/").pop());
        var isMainDocument = doc === window.wrap(document);
        addedNode(doc, isMainDocument);
        observe(doc);
        flags.dom && console.groupEnd();
      }
      function upgradeDocumentTree(doc) {
        forDocumentTree(doc, upgradeDocument);
      }
      var originalCreateShadowRoot = Element.prototype.createShadowRoot;
      if (originalCreateShadowRoot) {
        Element.prototype.createShadowRoot = function () {
          var root = originalCreateShadowRoot.call(this);
          window.CustomElements.watchShadow(this);
          return root;
        };
      }
      scope.watchShadow = watchShadow;
      scope.upgradeDocumentTree = upgradeDocumentTree;
      scope.upgradeDocument = upgradeDocument;
      scope.upgradeSubtree = addedSubtree;
      scope.upgradeAll = addedNode;
      scope.attached = attached;
      scope.takeRecords = takeRecords;
    });

    window.CustomElements.addModule(function (scope) {
      var flags = scope.flags;
      function upgrade(node, isAttached) {
        if (node.localName === "template") {
          if (window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
            HTMLTemplateElement.decorate(node);
          }
        }
        if (!node.__upgraded__ && node.nodeType === Node.ELEMENT_NODE) {
          var is = node.getAttribute("is");
          var definition = scope.getRegisteredDefinition(node.localName) || scope.getRegisteredDefinition(is);
          if (definition) {
            if (is && definition.tag == node.localName || !is && !definition.extends) {
              return upgradeWithDefinition(node, definition, isAttached);
            }
          }
        }
      }
      function upgradeWithDefinition(element, definition, isAttached) {
        flags.upgrade && console.group("upgrade:", element.localName);
        if (definition.is) {
          element.setAttribute("is", definition.is);
        }
        implementPrototype(element, definition);
        element.__upgraded__ = true;
        created(element);
        if (isAttached) {
          scope.attached(element);
        }
        scope.upgradeSubtree(element, isAttached);
        flags.upgrade && console.groupEnd();
        return element;
      }
      function implementPrototype(element, definition) {
        if (Object.__proto__) {
          element.__proto__ = definition.prototype;
        } else {
          customMixin(element, definition.prototype, definition.native);
          element.__proto__ = definition.prototype;
        }
      }
      function customMixin(inTarget, inSrc, inNative) {
        var used = {};
        var p = inSrc;
        while (p !== inNative && p !== HTMLElement.prototype) {
          var keys = Object.getOwnPropertyNames(p);
          for (var i = 0, k; k = keys[i]; i++) {
            if (!used[k]) {
              Object.defineProperty(inTarget, k, Object.getOwnPropertyDescriptor(p, k));
              used[k] = 1;
            }
          }
          p = Object.getPrototypeOf(p);
        }
      }
      function created(element) {
        if (element.createdCallback) {
          element.createdCallback();
        }
      }
      scope.upgrade = upgrade;
      scope.upgradeWithDefinition = upgradeWithDefinition;
      scope.implementPrototype = implementPrototype;
    });

    window.CustomElements.addModule(function (scope) {
      var isIE = scope.isIE;
      var upgradeDocumentTree = scope.upgradeDocumentTree;
      var upgradeAll = scope.upgradeAll;
      var upgradeWithDefinition = scope.upgradeWithDefinition;
      var implementPrototype = scope.implementPrototype;
      var useNative = scope.useNative;
      function register(name, options) {
        var definition = options || {};
        if (!name) {
          throw new Error("document.registerElement: first argument `name` must not be empty");
        }
        if (name.indexOf("-") < 0) {
          throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(name) + "'.");
        }
        if (isReservedTag(name)) {
          throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(name) + "'. The type name is invalid.");
        }
        if (getRegisteredDefinition(name)) {
          throw new Error("DuplicateDefinitionError: a type with name '" + String(name) + "' is already registered");
        }
        if (!definition.prototype) {
          definition.prototype = Object.create(HTMLElement.prototype);
        }
        definition.__name = name.toLowerCase();
        if (definition.extends) {
          definition.extends = definition.extends.toLowerCase();
        }
        definition.lifecycle = definition.lifecycle || {};
        definition.ancestry = ancestry(definition.extends);
        resolveTagName(definition);
        resolvePrototypeChain(definition);
        overrideAttributeApi(definition.prototype);
        registerDefinition(definition.__name, definition);
        definition.ctor = generateConstructor(definition);
        definition.ctor.prototype = definition.prototype;
        definition.prototype.constructor = definition.ctor;
        if (scope.ready) {
          upgradeDocumentTree(document);
        }
        return definition.ctor;
      }
      function overrideAttributeApi(prototype) {
        if (prototype.setAttribute._polyfilled) {
          return;
        }
        var setAttribute = prototype.setAttribute;
        prototype.setAttribute = function (name, value) {
          changeAttribute.call(this, name, value, setAttribute);
        };
        var removeAttribute = prototype.removeAttribute;
        prototype.removeAttribute = function (name) {
          changeAttribute.call(this, name, null, removeAttribute);
        };
        prototype.setAttribute._polyfilled = true;
      }
      function changeAttribute(name, value, operation) {
        name = name.toLowerCase();
        var oldValue = this.getAttribute(name);
        operation.apply(this, arguments);
        var newValue = this.getAttribute(name);
        if (this.attributeChangedCallback && newValue !== oldValue) {
          this.attributeChangedCallback(name, oldValue, newValue);
        }
      }
      function isReservedTag(name) {
        for (var i = 0; i < reservedTagList.length; i++) {
          if (name === reservedTagList[i]) {
            return true;
          }
        }
      }
      var reservedTagList = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"];
      function ancestry(extnds) {
        var extendee = getRegisteredDefinition(extnds);
        if (extendee) {
          return ancestry(extendee.extends).concat([extendee]);
        }
        return [];
      }
      function resolveTagName(definition) {
        var baseTag = definition.extends;
        for (var i = 0, a; a = definition.ancestry[i]; i++) {
          baseTag = a.is && a.tag;
        }
        definition.tag = baseTag || definition.__name;
        if (baseTag) {
          definition.is = definition.__name;
        }
      }
      function resolvePrototypeChain(definition) {
        if (!Object.__proto__) {
          var nativePrototype = HTMLElement.prototype;
          if (definition.is) {
            var inst = document.createElement(definition.tag);
            nativePrototype = Object.getPrototypeOf(inst);
          }
          var proto = definition.prototype,
              ancestor;
          var foundPrototype = false;
          while (proto) {
            if (proto == nativePrototype) {
              foundPrototype = true;
            }
            ancestor = Object.getPrototypeOf(proto);
            if (ancestor) {
              proto.__proto__ = ancestor;
            }
            proto = ancestor;
          }
          if (!foundPrototype) {
            console.warn(definition.tag + " prototype not found in prototype chain for " + definition.is);
          }
          definition.native = nativePrototype;
        }
      }
      function instantiate(definition) {
        return upgradeWithDefinition(domCreateElement(definition.tag), definition);
      }
      var registry = {};
      function getRegisteredDefinition(name) {
        if (name) {
          return registry[name.toLowerCase()];
        }
      }
      function registerDefinition(name, definition) {
        registry[name] = definition;
      }
      function generateConstructor(definition) {
        return function () {
          return instantiate(definition);
        };
      }
      var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
      function createElementNS(namespace, tag, typeExtension) {
        if (namespace === HTML_NAMESPACE) {
          return createElement(tag, typeExtension);
        } else {
          return domCreateElementNS(namespace, tag);
        }
      }
      function createElement(tag, typeExtension) {
        if (tag) {
          tag = tag.toLowerCase();
        }
        if (typeExtension) {
          typeExtension = typeExtension.toLowerCase();
        }
        var definition = getRegisteredDefinition(typeExtension || tag);
        if (definition) {
          if (tag == definition.tag && typeExtension == definition.is) {
            return new definition.ctor();
          }
          if (!typeExtension && !definition.is) {
            return new definition.ctor();
          }
        }
        var element;
        if (typeExtension) {
          element = createElement(tag);
          element.setAttribute("is", typeExtension);
          return element;
        }
        element = domCreateElement(tag);
        if (tag.indexOf("-") >= 0) {
          implementPrototype(element, HTMLElement);
        }
        return element;
      }
      var domCreateElement = document.createElement.bind(document);
      var domCreateElementNS = document.createElementNS.bind(document);
      var isInstance;
      if (!Object.__proto__ && !useNative) {
        isInstance = function (obj, ctor) {
          if (obj instanceof ctor) {
            return true;
          }
          var p = obj;
          while (p) {
            if (p === ctor.prototype) {
              return true;
            }
            p = p.__proto__;
          }
          return false;
        };
      } else {
        isInstance = function (obj, base) {
          return obj instanceof base;
        };
      }
      function wrapDomMethodToForceUpgrade(obj, methodName) {
        var orig = obj[methodName];
        obj[methodName] = function () {
          var n = orig.apply(this, arguments);
          upgradeAll(n);
          return n;
        };
      }
      wrapDomMethodToForceUpgrade(Node.prototype, "cloneNode");
      wrapDomMethodToForceUpgrade(document, "importNode");
      document.registerElement = register;
      document.createElement = createElement;
      document.createElementNS = createElementNS;
      scope.registry = registry;
      scope.instanceof = isInstance;
      scope.reservedTagList = reservedTagList;
      scope.getRegisteredDefinition = getRegisteredDefinition;
      document.register = document.registerElement;
    });

    (function (scope) {
      var useNative = scope.useNative;
      var initializeModules = scope.initializeModules;
      var isIE = scope.isIE;
      if (useNative) {
        var nop = function () {};
        scope.watchShadow = nop;
        scope.upgrade = nop;
        scope.upgradeAll = nop;
        scope.upgradeDocumentTree = nop;
        scope.upgradeSubtree = nop;
        scope.takeRecords = nop;
        scope.instanceof = function (obj, base) {
          return obj instanceof base;
        };
      } else {
        initializeModules();
      }
      var upgradeDocumentTree = scope.upgradeDocumentTree;
      var upgradeDocument = scope.upgradeDocument;
      if (!window.wrap) {
        if (window.ShadowDOMPolyfill) {
          window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
          window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
        } else {
          window.wrap = window.unwrap = function (node) {
            return node;
          };
        }
      }
      if (window.HTMLImports) {
        window.HTMLImports.__importsParsingHook = function (elt) {
          if (elt.import) {
            upgradeDocument(wrap(elt.import));
          }
        };
      }
      function bootstrap() {
        upgradeDocumentTree(window.wrap(document));
        window.CustomElements.ready = true;
        var requestAnimationFrame = window.requestAnimationFrame || function (f) {
          setTimeout(f, 16);
        };
        requestAnimationFrame(function () {
          setTimeout(function () {
            window.CustomElements.readyTime = Date.now();
            if (window.HTMLImports) {
              window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
            }
            document.dispatchEvent(new CustomEvent("WebComponentsReady", {
              bubbles: true
            }));
          });
        });
      }
      if (document.readyState === "complete" || scope.flags.eager) {
        bootstrap();
      } else if (document.readyState === "interactive" && !window.attachEvent && (!window.HTMLImports || window.HTMLImports.ready)) {
        bootstrap();
      } else {
        var loadEvent = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
        window.addEventListener(loadEvent, bootstrap);
      }
    })(window.CustomElements);

    (function (scope) {
      var style = document.createElement("style");
      style.textContent = "" + "body {" + "transition: opacity ease-in 0.2s;" + " } \n" + "body[unresolved] {" + "opacity: 0; display: block; overflow: hidden; position: relative;" + " } \n";
      var head = document.querySelector("head");
      head.insertBefore(style, head.firstChild);
    })(window.WebComponents);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic("github:webcomponents/webcomponentsjs@0.7.24.js", ["github:webcomponents/webcomponentsjs@0.7.24/webcomponents-lite.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:webcomponents/webcomponentsjs@0.7.24/webcomponents-lite.js");
});
System.register('github:matthewbauer/document@0.0.4/document.js', ['github:webcomponents/webcomponentsjs@0.7.24.js'], function (_export) {
	'use strict';

	var __global, registerElement;

	function fill(name) {
		if (__global[name]) {
			return __global[name].bind(__global);
		}
	}

	return {
		setters: [function (_githubWebcomponentsWebcomponentsjs0724Js) {}],
		execute: function () {
			__global = undefined;

			if (typeof window !== 'undefined') {
				__global = window.document;
			} else {
				__global = {};
			}

			registerElement = fill('registerElement');

			_export('registerElement', registerElement);

			_export('default', __global);
		}
	};
});
System.register("github:matthewbauer/document@0.0.4.js", ["github:matthewbauer/document@0.0.4/document.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubMatthewbauerDocument004DocumentJs) {
      var _exportObj = {};

      for (var _key in _githubMatthewbauerDocument004DocumentJs) {
        if (_key !== "default") _exportObj[_key] = _githubMatthewbauerDocument004DocumentJs[_key];
      }

      _exportObj["default"] = _githubMatthewbauerDocument004DocumentJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.registerDynamic("github:mohayonao/web-audio-api-shim@0.3.0/build/web-audio-api-shim.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    /* */
    "format global";

    (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
          }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }return n[o].exports;
      }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
    })({ 1: [function (require, module, exports) {
        module.exports = require("./lib/install")(Infinity);
      }, { "./lib/install": 6 }], 2: [function (require, module, exports) {
        (function (global) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.install = install;
          var AnalyserNode = global.AnalyserNode;

          function installGetFloatTimeDomainData() {
            if (AnalyserNode.prototype.hasOwnProperty("getFloatTimeDomainData")) {
              return;
            }

            var uint8 = new Uint8Array(2048);

            //// ### AnalyserNode.prototype.getFloatTimeDomainData
            //// Copies the current time-domain (waveform) data into the passed floating-point array.
            ////
            //// #### Parameters
            //// - `array: Float32Array`
            ////   - This parameter is where the time-domain sample data will be copied.
            ////
            //// #### Return
            //// - `void`
            AnalyserNode.prototype.getFloatTimeDomainData = function (array) {
              this.getByteTimeDomainData(uint8);
              for (var i = 0, imax = array.length; i < imax; i++) {
                array[i] = (uint8[i] - 128) * 0.0078125;
              }
            };
          }

          function install() {
            installGetFloatTimeDomainData();
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 3: [function (require, module, exports) {
        (function (global) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.install = install;
          var AudioBuffer = global.AudioBuffer;

          function installCopyFromChannel() {
            if (AudioBuffer.prototype.hasOwnProperty("copyFromChannel")) {
              return;
            }

            //// ### AudioBuffer.prototype.copyFromChannel
            //// The `copyFromChannel` method copies the samples from the specified channel of the **`AudioBuffer`** to the `destination` array.
            ////
            //// #### Parameters
            //// - `destination: Float32Array`
            ////   - The array the channel data will be copied to.
            //// - `channelNumber: number`
            ////   - The index of the channel to copy the data from.
            //// - `startInChannel: number = 0`
            ////   - An optional offset to copy the data from.
            ////
            //// #### Return
            //// - `void`
            AudioBuffer.prototype.copyFromChannel = function (destination, channelNumber, startInChannel) {
              var source = this.getChannelData(channelNumber | 0).subarray(startInChannel | 0);

              destination.set(source.subarray(0, Math.min(source.length, destination.length)));
            };
          }

          function installCopyToChannel() {
            if (AudioBuffer.prototype.hasOwnProperty("copyToChannel")) {
              return;
            }

            //// ### AudioBuffer.prototype.copyToChannel
            //// The `copyToChannel` method copies the samples to the specified channel of the **`AudioBuffer`**, from the `source` array.
            ////
            //// #### Parameters
            //// - `source: Float32Array`
            ////   - The array the channel data will be copied from.
            //// - `channelNumber: number`
            ////   - The index of the channel to copy the data to.
            //// - `startInChannel: number = 0`
            ////   - An optional offset to copy the data to.
            ////
            //// #### Return
            //// - `void`
            AudioBuffer.prototype.copyToChannel = function (source, channelNumber, startInChannel) {
              var clipped = source.subarray(0, Math.min(source.length, this.length - (startInChannel | 0)));

              this.getChannelData(channelNumber | 0).set(clipped, startInChannel | 0);
            };
          }

          function install() {
            installCopyFromChannel();
            installCopyToChannel();
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 4: [function (require, module, exports) {
        (function (global) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _createClass = function () {
            function defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
              }
            }return function (Constructor, protoProps, staticProps) {
              if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
            };
          }();

          var _get = function get(_x, _x2, _x3) {
            var _again = true;_function: while (_again) {
              var object = _x,
                  property = _x2,
                  receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);if (parent === null) {
                  return undefined;
                } else {
                  _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
                }
              } else if ("value" in desc) {
                return desc.value;
              } else {
                var getter = desc.get;if (getter === undefined) {
                  return undefined;
                }return getter.call(receiver);
              }
            }
          };

          exports.install = install;

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
          }

          var OriginalAudioContext = global.AudioContext;
          var OriginalOfflineAudioContext = global.OfflineAudioContext;
          var AudioNode = global.AudioNode;
          var EventTarget = global.EventTarget || global.Object.constructor;

          function nop() {}

          function inherits(ctor, superCtor) {
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
            });
          }

          function replaceAudioContext() {
            if (global.AudioContext !== OriginalAudioContext) {
              return;
            }

            function BaseAudioContext(audioContext) {
              this._ = {};
              this._.audioContext = audioContext;
              this._.destination = audioContext.destination;
              this._.state = "";
              this._.currentTime = 0;
              this._.sampleRate = audioContext.sampleRate;
              this._.onstatechange = null;
            }
            inherits(BaseAudioContext, EventTarget);

            Object.defineProperties(BaseAudioContext.prototype, {
              destination: {
                get: function get() {
                  return this._.destination;
                }
              },
              sampleRate: {
                get: function get() {
                  return this._.sampleRate;
                }
              },
              currentTime: {
                get: function get() {
                  return this._.currentTime || this._.audioContext.currentTime;
                }
              },
              listener: {
                get: function get() {
                  return this._.audioContext.listener;
                }
              },
              state: {
                get: function get() {
                  return this._.state;
                }
              },
              onstatechange: {
                set: function set(fn) {
                  if (typeof fn === "function") {
                    this._.onstatechange = fn;
                  }
                },
                get: function get() {
                  return this._.onstatechange;
                }
              }
            });

            var AudioContext = function (_BaseAudioContext) {
              function AudioContext() {
                _classCallCheck(this, AudioContext);

                _get(Object.getPrototypeOf(AudioContext.prototype), "constructor", this).call(this, new OriginalAudioContext());
                this._.state = "running";

                if (!OriginalAudioContext.prototype.hasOwnProperty("suspend")) {
                  this._.destination = this._.audioContext.createGain();
                  this._.destination.connect(this._.audioContext.destination);
                  this._.destination.connect = function () {
                    this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
                  };
                  this._.destination.disconnect = function () {
                    this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
                  };
                  this._.destination.channelCountMode = "explicit";
                }
              }

              _inherits(AudioContext, _BaseAudioContext);

              return AudioContext;
            }(BaseAudioContext);

            AudioContext.prototype.suspend = function () {
              var _this = this;

              if (this._.state === "closed") {
                return Promise.reject(new Error("cannot suspend a closed AudioContext"));
              }

              function changeState() {
                this._.state = "suspended";
                this._.currentTime = this._.audioContext.currentTime;
              }

              var promise = undefined;

              if (typeof this._.audioContext === "function") {
                promise = this._.audioContext.suspend();
                promise.then(function () {
                  changeState.call(_this);
                });
              } else {
                AudioNode.prototype.disconnect.call(this._.destination);

                promise = Promise.resolve();
                promise.then(function () {
                  changeState.call(_this);

                  var e = new global.Event("statechange");

                  if (typeof _this._.onstatechange === "function") {
                    _this._.onstatechange(e);
                  }

                  _this.dispatchEvent(e);
                });
              }

              return promise;
            };

            AudioContext.prototype.resume = function () {
              var _this2 = this;

              if (this._.state === "closed") {
                return Promise.reject(new Error("cannot resume a closed AudioContext"));
              }

              function changeState() {
                this._.state = "running";
                this._.currentTime = 0;
              }

              var promise = undefined;

              if (typeof this._.audioContext.resume === "function") {
                promise = this._.audioContext.resume();
                promise.then(function () {
                  changeState.call(_this2);
                });
              } else {
                AudioNode.prototype.connect.call(this._.destination, this._.audioContext.destination);

                promise = Promise.resolve();
                promise.then(function () {
                  changeState.call(_this2);

                  var e = new global.Event("statechange");

                  if (typeof _this2._.onstatechange === "function") {
                    _this2._.onstatechange(e);
                  }

                  _this2.dispatchEvent(e);
                });
              }

              return promise;
            };

            AudioContext.prototype.close = function () {
              var _this3 = this;

              if (this._.state === "closed") {
                return Promise.reject(new Error("Cannot close a context that is being closed or has already been closed."));
              }

              function changeState() {
                this._.state = "closed";
                this._.currentTime = Infinity;
                this._.sampleRate = 0;
              }

              var promise = undefined;

              if (typeof this._.audioContext.close === "function") {
                promise = this._.audioContext.close();
                promise.then(function () {
                  changeState.call(_this3);
                });
              } else {
                if (typeof this._.audioContext.suspend === "function") {
                  this._.audioContext.suspend();
                } else {
                  AudioNode.prototype.disconnect.call(this._.destination);
                }
                promise = Promise.resolve();

                promise.then(function () {
                  changeState.call(_this3);

                  var e = new global.Event("statechange");

                  if (typeof _this3._.onstatechange === "function") {
                    _this3._.onstatechange(e);
                  }

                  _this3.dispatchEvent(e);
                });
              }

              return promise;
            };

            ["addEventListener", "removeEventListener", "dispatchEvent", "createBuffer"].forEach(function (methodName) {
              AudioContext.prototype[methodName] = function () {
                return this._.audioContext[methodName].apply(this._.audioContext, arguments);
              };
            });

            ["decodeAudioData", "createBufferSource", "createMediaElementSource", "createMediaStreamSource", "createMediaStreamDestination", "createAudioWorker", "createScriptProcessor", "createAnalyser", "createGain", "createDelay", "createBiquadFilter", "createWaveShaper", "createPanner", "createStereoPanner", "createConvolver", "createChannelSplitter", "createChannelMerger", "createDynamicsCompressor", "createOscillator", "createPeriodicWave"].forEach(function (methodName) {
              AudioContext.prototype[methodName] = function () {
                if (this._.state === "closed") {
                  throw new Error("Failed to execute '" + methodName + "' on 'AudioContext': AudioContext has been closed");
                }
                return this._.audioContext[methodName].apply(this._.audioContext, arguments);
              };
            });

            var OfflineAudioContext = function (_BaseAudioContext2) {
              function OfflineAudioContext(numberOfChannels, length, sampleRate) {
                _classCallCheck(this, OfflineAudioContext);

                _get(Object.getPrototypeOf(OfflineAudioContext.prototype), "constructor", this).call(this, new OriginalOfflineAudioContext(numberOfChannels, length, sampleRate));
                this._.state = "suspended";
              }

              _inherits(OfflineAudioContext, _BaseAudioContext2);

              _createClass(OfflineAudioContext, [{
                key: "oncomplete",
                set: function set(fn) {
                  this._.audioContext.oncomplete = fn;
                },
                get: function get() {
                  return this._.audioContext.oncomplete;
                }
              }]);

              return OfflineAudioContext;
            }(BaseAudioContext);

            ["addEventListener", "removeEventListener", "dispatchEvent", "createBuffer", "decodeAudioData", "createBufferSource", "createMediaElementSource", "createMediaStreamSource", "createMediaStreamDestination", "createAudioWorker", "createScriptProcessor", "createAnalyser", "createGain", "createDelay", "createBiquadFilter", "createWaveShaper", "createPanner", "createStereoPanner", "createConvolver", "createChannelSplitter", "createChannelMerger", "createDynamicsCompressor", "createOscillator", "createPeriodicWave"].forEach(function (methodName) {
              OfflineAudioContext.prototype[methodName] = function () {
                return this._.audioContext[methodName].apply(this._.audioContext, arguments);
              };
            });

            OfflineAudioContext.prototype.startRendering = function () {
              var _this4 = this;

              if (this._.state !== "suspended") {
                return Promise.reject(new Error("cannot call startRendering more than once"));
              }

              this._.state = "running";

              var promise = this._.audioContext.startRendering();

              promise.then(function () {
                _this4._.state = "closed";

                var e = new global.Event("statechange");

                if (typeof _this4._.onstatechange === "function") {
                  _this4._.onstatechange(e);
                }

                _this4.dispatchEvent(e);
              });

              return promise;
            };

            OfflineAudioContext.prototype.suspend = function () {
              if (typeof this._.audioContext.suspend === "function") {
                return this._.audioContext.suspend();
              }
              return Promise.reject(new Error("cannot suspend an OfflineAudioContext"));
            };

            OfflineAudioContext.prototype.resume = function () {
              if (typeof this._.audioContext.resume === "function") {
                return this._.audioContext.resume();
              }
              return Promise.reject(new Error("cannot resume an OfflineAudioContext"));
            };

            OfflineAudioContext.prototype.close = function () {
              if (typeof this._.audioContext.close === "function") {
                return this._.audioContext.close();
              }
              return Promise.reject(new Error("cannot close an OfflineAudioContext"));
            };

            global.AudioContext = AudioContext;
            global.OfflineAudioContext = OfflineAudioContext;
          }

          function installCreateAudioWorker() {}

          function installCreateStereoPanner() {
            if (OriginalAudioContext.prototype.hasOwnProperty("createStereoPanner")) {
              return;
            }

            var StereoPannerNode = require("stereo-panner-node");

            //// ### AudioContext.prototype.createStereoPanner
            //// Creates a StereoPannerNode.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `AudioNode as StereoPannerNode`
            OriginalAudioContext.prototype.createStereoPanner = function () {
              return new StereoPannerNode(this);
            };
          }

          function installDecodeAudioData() {
            var audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
            var isPromiseBased = false;

            try {
              var audioData = new Uint32Array([1179011410, 48, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 8, 0, 0, 0, 0]).buffer;

              isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
            } catch (e) {
              nop(e);
            }

            if (isPromiseBased) {
              return;
            }

            var decodeAudioData = OriginalAudioContext.prototype.decodeAudioData;

            //// ### AudioContext.prototype.decodeAudioData
            //// Asynchronously decodes the audio file data contained in the ArrayBuffer.
            ////
            //// #### Parameters
            //// - `audioData: ArrayBuffer`
            ////   - An ArrayBuffer containing compressed audio data
            //// - `successCallback: function = null`
            ////   - A callback function which will be invoked when the decoding is finished.
            //// - `errorCallback: function = null`
            ////   - A callback function which will be invoked if there is an error decoding the audio file.
            ////
            //// #### Return
            //// - `Promise<AudioBuffer>`
            OriginalAudioContext.prototype.decodeAudioData = function (audioData, successCallback, errorCallback) {
              var _this5 = this;

              var promise = new Promise(function (resolve, reject) {
                return decodeAudioData.call(_this5, audioData, resolve, reject);
              });

              promise.then(successCallback, errorCallback);

              return promise;
            };
            OriginalAudioContext.prototype.decodeAudioData.original = decodeAudioData;
          }

          function installClose() {
            if (OriginalAudioContext.prototype.hasOwnProperty("close")) {
              return;
            }

            //// ### AudioContext.prototype.close
            //// Closes the audio context, releasing any system audio resources used by the **`AudioContext`**.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `Promise<void>`
            replaceAudioContext();
          }

          function installResume() {
            if (OriginalAudioContext.prototype.hasOwnProperty("resume")) {
              return;
            }

            //// ### AudioContext.prototype.suspend
            //// Resumes the progression of time in an audio context that has been suspended, which may involve re-priming the frame buffer contents.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `Promise<void>`
            replaceAudioContext();
          }

          function installSuspend() {
            if (OriginalAudioContext.prototype.hasOwnProperty("suspend")) {
              return;
            }

            //// ### AudioContext.prototype.suspend
            //// Suspends the progression of time in the audio context, allows any current context processing blocks that are already processed to be played to the destination, and then allows the system to release its claim on audio hardware.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `Promise<void>`
            replaceAudioContext();
          }

          function installStartRendering() {
            var audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
            var isPromiseBased = false;

            try {
              isPromiseBased = !!audioContext.startRendering();
            } catch (e) {
              nop(e);
            }

            if (isPromiseBased) {
              return;
            }

            var startRendering = OriginalOfflineAudioContext.prototype.startRendering;

            //// ### OfflineAudioContext.prototype.startRendering
            //// Given the current connections and scheduled changes, starts rendering audio.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `Promise<AudioBuffer>`
            OriginalOfflineAudioContext.prototype.startRendering = function () {
              var _this6 = this;

              return new Promise(function (resolve) {
                var oncomplete = _this6.oncomplete;

                _this6.oncomplete = function (e) {
                  resolve(e.renderedBuffer);
                  if (typeof oncomplete === "function") {
                    oncomplete.call(_this6, e);
                  }
                };
                startRendering.call(_this6);
              });
            };
            OriginalOfflineAudioContext.prototype.startRendering.original = startRendering;
          }

          function install(stage) {
            installCreateAudioWorker();
            installCreateStereoPanner();
            installDecodeAudioData();
            installStartRendering();

            if (stage !== 0) {
              installClose();
              installResume();
              installSuspend();
            }
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "stereo-panner-node": 9 }], 5: [function (require, module, exports) {
        (function (global) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.install = install;
          var OfflineAudioContext = global.OfflineAudioContext;
          var AudioNode = global.AudioNode;
          var connect = AudioNode.prototype.connect;
          var disconnect = AudioNode.prototype.disconnect;

          function match(args, connection) {
            for (var i = 0, imax = args.length; i < imax; i++) {
              if (args[i] !== connection[i]) {
                return false;
              }
            }
            return true;
          }

          function disconnectAll(node) {
            for (var ch = 0, chmax = node.numberOfOutputs; ch < chmax; ch++) {
              disconnect.call(node, ch);
            }
            node._shim$connections = [];
          }

          function disconnectChannel(node, channel) {
            disconnect.call(node, channel);
            node._shim$connections = node._shim$connections.filter(function (connection) {
              return connection[1] !== channel;
            });
          }

          function disconnectSelect(node, args) {
            var remain = [];
            var hasDestination = false;

            node._shim$connections.forEach(function (connection) {
              hasDestination = hasDestination || args[0] === connection[0];
              if (!match(args, connection)) {
                remain.push(connection);
              }
            });

            if (!hasDestination) {
              throw new Error("Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.");
            }

            disconnectAll(node);

            remain.forEach(function (connection) {
              connect.call(node, connection[0], connection[1], connection[2]);
            });

            node._shim$connections = remain;
          }

          function installDisconnect() {
            var audioContext = new OfflineAudioContext(1, 1, 44100);
            var isSelectiveDisconnection = false;

            try {
              audioContext.createGain().disconnect(audioContext.destination);
            } catch (e) {
              isSelectiveDisconnection = true;
            }

            if (isSelectiveDisconnection) {
              return;
            }

            //// ### AudioNode.prototype.disconnect
            //// Disconnects all outgoing connections from **`AudioNode`**.
            ////
            //// #### Parameters
            //// - _none_
            ////
            //// #### Return
            //// - `void`
            ////
            //// ### AudioNode.prototype.disconnect
            //// #### Parameters
            //// - `output: number`
            ////   - This parameter is an index describing which output of the AudioNode to disconnect.
            ////
            //// #### Return
            //// - `void`
            ////
            //// ### AudioNode.prototype.disconnect
            //// #### Parameters
            //// - `destination: AudioNode|AudioParam`
            ////   - The destination parameter is the AudioNode/AudioParam to disconnect.
            ////
            //// #### Return
            //// - `void`
            ////
            //// ### AudioNode.prototype.disconnect
            //// #### Parameters
            //// - `destination: AudioNode|AudioParam`
            ////   - The destination parameter is the AudioNode/AudioParam to disconnect.
            //// - `output: number`
            ////   - The output parameter is an index describing which output of the AudioNode from which to disconnect.
            ////
            //// #### Return
            //// - `void`
            ////
            //// ### AudioNode.prototype.disconnect
            //// #### Parameters
            //// - `destination: AudioNode`
            ////   - The destination parameter is the AudioNode to disconnect.
            //// - `output: number`
            ////   - The output parameter is an index describing which output of the AudioNode from which to disconnect.
            //// - `input: number`
            ////    - The input parameter is an index describing which input of the destination AudioNode to disconnect.
            ////
            //// #### Return
            //// - `void`
            ////
            AudioNode.prototype.disconnect = function () {
              this._shim$connections = this._shim$connections || [];

              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              if (args.length === 0) {
                disconnectAll(this);
              } else if (args.length === 1 && typeof args[0] === "number") {
                disconnectChannel(this, args[0]);
              } else {
                disconnectSelect(this, args);
              }
            };
            AudioNode.prototype.disconnect.original = disconnect;

            AudioNode.prototype.connect = function (destination) {
              var output = arguments[1] === undefined ? 0 : arguments[1];
              var input = arguments[2] === undefined ? 0 : arguments[2];

              var _input = undefined;

              this._shim$connections = this._shim$connections || [];

              if (destination instanceof AudioNode) {
                connect.call(this, destination, output, input);
                _input = input;
              } else {
                connect.call(this, destination, output);
                _input = 0;
              }

              this._shim$connections.push([destination, output, _input]);
            };
            AudioNode.prototype.connect.original = connect;
          }

          function install(stage) {
            if (stage !== 0) {
              installDisconnect();
            }
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 6: [function (require, module, exports) {
        (function (global) {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports["default"] = install;

          function install() {
            var stage = arguments[0] === undefined ? Infinity : arguments[0];

            if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
              global.AudioContext = global.webkitAudioContext;
            }
            if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
              global.OfflineAudioContext = global.webkitOfflineAudioContext;
            }

            if (!global.AudioContext) {
              return;
            }

            require("./AnalyserNode").install(stage);
            require("./AudioBuffer").install(stage);
            require("./AudioNode").install(stage);
            require("./AudioContext").install(stage);
          }

          module.exports = exports["default"];
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./AnalyserNode": 2, "./AudioBuffer": 3, "./AudioContext": 4, "./AudioNode": 5 }], 7: [function (require, module, exports) {
        var WS_CURVE_SIZE = 4096;
        var curveL = new Float32Array(WS_CURVE_SIZE);
        var curveR = new Float32Array(WS_CURVE_SIZE);

        (function () {
          var i;

          for (i = 0; i < WS_CURVE_SIZE; i++) {
            curveL[i] = Math.cos(i / WS_CURVE_SIZE * Math.PI * 0.5);
            curveR[i] = Math.sin(i / WS_CURVE_SIZE * Math.PI * 0.5);
          }
        })();

        module.exports = {
          L: curveL,
          R: curveR
        };
      }, {}], 8: [function (require, module, exports) {
        (function (global) {
          var curve = require("./curve");

          /**
           *  StereoPannerImpl
           *  +--------------------------------+  +------------------------+
           *  | ChannelSplitter(inlet)         |  | BufferSourceNode(_dc1) |
           *  +--------------------------------+  | buffer: [ 1, 1 ]       |
           *    |                            |    | loop: true             |
           *    |                            |    +------------------------+
           *    |                            |       |
           *    |                            |  +----------------+
           *    |                            |  | GainNode(_pan) |
           *    |                            |  | gain: 0(pan)   |
           *    |                            |  +----------------+
           *    |                            |    |
           *    |    +-----------------------|----+
           *    |    |                       |    |
           *    |  +----------------------+  |  +----------------------+
           *    |  | WaveShaperNode(_wsL) |  |  | WaveShaperNode(_wsR) |
           *    |  | curve: curveL        |  |  | curve: curveR        |
           *    |  +----------------------+  |  +----------------------+
           *    |               |            |               |
           *    |               |            |               |
           *    |               |            |               |
           *  +--------------+  |          +--------------+  |
           *  | GainNode(_L) |  |          | GainNode(_R) |  |
           *  | gain: 0    <----+          | gain: 0    <----+
           *  +--------------+             +--------------+
           *    |                            |
           *  +--------------------------------+
           *  | ChannelMergerNode(outlet)      |
           *  +--------------------------------+
           */
          function StereoPannerImpl(audioContext) {
            this.audioContext = audioContext;
            this.inlet = audioContext.createChannelSplitter(2);
            this._pan = audioContext.createGain();
            this.pan = this._pan.gain;
            this._wsL = audioContext.createWaveShaper();
            this._wsR = audioContext.createWaveShaper();
            this._L = audioContext.createGain();
            this._R = audioContext.createGain();
            this.outlet = audioContext.createChannelMerger(2);

            this.inlet.channelCount = 2;
            this.inlet.channelCountMode = "explicit";
            this._pan.gain.value = 0;
            this._wsL.curve = curve.L;
            this._wsR.curve = curve.R;
            this._L.gain.value = 0;
            this._R.gain.value = 0;

            this.inlet.connect(this._L, 0);
            this.inlet.connect(this._R, 1);
            this._L.connect(this.outlet, 0, 0);
            this._R.connect(this.outlet, 0, 1);
            this._pan.connect(this._wsL);
            this._pan.connect(this._wsR);
            this._wsL.connect(this._L.gain);
            this._wsR.connect(this._R.gain);

            this._isConnected = false;
            this._dc1buffer = null;
            this._dc1 = null;
          }

          StereoPannerImpl.prototype.connect = function (destination) {
            var audioContext = this.audioContext;

            if (!this._isConnected) {
              this._isConnected = true;
              this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
              this._dc1buffer.getChannelData(0).set([1, 1]);

              this._dc1 = audioContext.createBufferSource();
              this._dc1.buffer = this._dc1buffer;
              this._dc1.loop = true;
              this._dc1.start(audioContext.currentTime);
              this._dc1.connect(this._pan);
            }

            global.AudioNode.prototype.connect.call(this.outlet, destination);
          };

          StereoPannerImpl.prototype.disconnect = function () {
            var audioContext = this.audioContext;

            if (this._isConnected) {
              this._isConnected = false;
              this._dc1.stop(audioContext.currentTime);
              this._dc1.disconnect();
              this._dc1 = null;
              this._dc1buffer = null;
            }

            global.AudioNode.prototype.disconnect.call(this.outlet);
          };

          module.exports = StereoPannerImpl;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./curve": 7 }], 9: [function (require, module, exports) {
        (function (global) {
          var StereoPannerImpl = require("./stereo-panner-impl");
          var AudioContext = global.AudioContext || global.webkitAudioContext;

          function StereoPanner(audioContext) {
            var impl = new StereoPannerImpl(audioContext);

            Object.defineProperties(impl.inlet, {
              pan: {
                value: impl.pan,
                enumerable: true
              },
              connect: {
                value: function (node) {
                  return impl.connect(node);
                }
              },
              disconnect: {
                value: function () {
                  return impl.disconnect();
                }
              }
            });

            return impl.inlet;
          }

          StereoPanner.polyfill = function () {
            if (!AudioContext || AudioContext.prototype.hasOwnProperty("createStereoPanner")) {
              return;
            }
            AudioContext.prototype.createStereoPanner = function () {
              return new StereoPanner(this);
            };
          };

          module.exports = StereoPanner;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "./stereo-panner-impl": 8 }] }, {}, [1]);
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic("github:mohayonao/web-audio-api-shim@0.3.0.js", ["github:mohayonao/web-audio-api-shim@0.3.0/build/web-audio-api-shim.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:mohayonao/web-audio-api-shim@0.3.0/build/web-audio-api-shim.js");
});
System.register('github:matthewbauer/window@0.0.3/window.js', ['github:mohayonao/web-audio-api-shim@0.3.0.js'], function (_export) {
	'use strict';

	var __global, JSON, Math, Reflect, encodeURIComponent, encodeURI, decodeURIComponent, decodeURI, parseInt, parseFloat, isNaN, isFinite, ArrayBuffer, DataView, Error, EvalError, Float32Array, Float64Array, Int8Array, Int16Array, Int32Array, Map, Proxy, Promise, RangeError, ReferenceError, Set, Symbol, SyntaxError, TypeError, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, URIError, WeakMap, WeakSet, navigator, document, history, location, external, requestAnimationFrame, cancelAnimationFrame, applicationCache, postMessage, setTimeout, clearTimeout, setInterval, clearInterval, btoa, atob, sessionStorage, localStorage, URL, URLSearchParams, XMLHttpRequest, FormData, Notification, FileReader, Blob, File, FileList, Gamepad, GamepadEvent, GamepadButton, AudioContext, AudioBuffer, fetch, Body, Request, Response, Headers, HTMLCanvasElement;

	function fill(name) {
		if (__global[name]) {
			return __global[name];
		}
	}

	/*
 	http://www.ecma-international.org/ecma-262/6.0/#sec-global-object
 */
	return {
		setters: [function (_githubMohayonaoWebAudioApiShim030Js) {}],
		execute: function () {
			__global = undefined;

			if (typeof window !== 'undefined') {
				__global = window;
			} else if (typeof global !== 'undefined') {
				__global = global;
			} else if (typeof self !== 'undefined') {
				__global = self;
			} else if (typeof undefined !== 'undefined') {
				__global = undefined;
			} else {
				__global = {};
			}

			JSON = fill('JSON');
			Math = fill('Math');
			Reflect = fill('Reflect');

			_export('JSON', JSON);

			_export('Math', Math);

			_export('Reflect', Reflect);

			encodeURIComponent = fill('encodeURIComponent');
			encodeURI = fill('encodeURI');
			decodeURIComponent = fill('decodeURIComponent');
			decodeURI = fill('decodeURI');
			parseInt = fill('parseInt');
			parseFloat = fill('parseFloat');
			isNaN = fill('isNaN');
			isFinite = fill('isFinite');

			_export('encodeURIComponent', encodeURIComponent);

			_export('encodeURI', encodeURI);

			_export('decodeURIComponent', decodeURIComponent);

			_export('decodeURI', decodeURI);

			_export('parseInt', parseInt);

			_export('parseFloat', parseFloat);

			_export('isNaN', isNaN);

			_export('isFinite', isFinite);

			ArrayBuffer = fill('ArrayBuffer');
			DataView = fill('DataView');
			Error = fill('Error');
			EvalError = fill('EvalError');
			Float32Array = fill('Float32Array');
			Float64Array = fill('Float64Array');
			Int8Array = fill('Int8Array');
			Int16Array = fill('Int16Array');
			Int32Array = fill('Int32Array');
			Map = fill('Map');
			Proxy = fill('Proxy');
			Promise = fill('Promise');
			RangeError = fill('RangeError');
			ReferenceError = fill('ReferenceError');
			Set = fill('Set');
			Symbol = fill('Symbol');
			SyntaxError = fill('SyntaxError');
			TypeError = fill('TypeError');
			Uint8Array = fill('Uint8Array');
			Uint8ClampedArray = fill('Uint8ClampedArray');
			Uint16Array = fill('Uint16Array');
			Uint32Array = fill('Uint32Array');
			URIError = fill('URIError');
			WeakMap = fill('WeakMap');
			WeakSet = fill('WeakSet');

			_export('ArrayBuffer', ArrayBuffer);

			_export('DataView', DataView);

			_export('Error', Error);

			_export('EvalError', EvalError);

			_export('Float32Array', Float32Array);

			_export('Float64Array', Float64Array);

			_export('Int8Array', Int8Array);

			_export('Int16Array', Int16Array);

			_export('Int32Array', Int32Array);

			_export('Map', Map);

			_export('Proxy', Proxy);

			_export('Promise', Promise);

			_export('RangeError', RangeError);

			_export('ReferenceError', ReferenceError);

			_export('Set', Set);

			_export('Symbol', Symbol);

			_export('SyntaxError', SyntaxError);

			_export('TypeError', TypeError);

			_export('Uint8Array', Uint8Array);

			_export('Uint8ClampedArray', Uint8ClampedArray);

			_export('Uint16Array', Uint16Array);

			_export('Uint32Array', Uint32Array);

			_export('URIError', URIError);

			_export('WeakMap', WeakMap);

			_export('WeakSet', WeakSet);

			/*
   	https://html.spec.whatwg.org/#window
   */
			navigator = fill('navigator');
			document = fill('document');
			history = fill('history');
			location = fill('location');
			external = fill('external');
			requestAnimationFrame = fill('requestAnimationFrame');
			cancelAnimationFrame = fill('cancelAnimationFrame');
			applicationCache = fill('applicationCache');
			postMessage = fill('postMessage');

			_export('navigator', navigator);

			_export('document', document);

			_export('history', history);

			_export('location', location);

			_export('external', external);

			_export('requestAnimationFrame', requestAnimationFrame);

			_export('cancelAnimationFrame', cancelAnimationFrame);

			_export('applicationCache', applicationCache);

			_export('postMessage', postMessage);

			/*
   	https://html.spec.whatwg.org/#windowtimers
   */
			setTimeout = fill('setTimeout');
			clearTimeout = fill('clearTimeout');
			setInterval = fill('setInterval');
			clearInterval = fill('clearInterval');

			_export('setTimeout', setTimeout);

			_export('clearTimeout', clearTimeout);

			_export('setInterval', setInterval);

			_export('clearInterval', clearInterval);

			/*
   	https://html.spec.whatwg.org/#windowbase64
   */
			btoa = fill('btoa');
			atob = fill('atob');

			_export('btoa', btoa);

			_export('atob', atob);

			/*
   	https://w3c.github.io/webstorage/
   */
			sessionStorage = fill('sessionStorage');
			localStorage = fill('localStorage');

			_export('sessionStorage', sessionStorage);

			_export('localStorage', localStorage);

			/*
   	https://url.spec.whatwg.org/
   */
			URL = fill('URL');
			URLSearchParams = fill('URLSearchParams');

			_export('URL', URL);

			_export('URLSearchParams', URLSearchParams);

			/*
   	https://xhr.spec.whatwg.org/
   */
			XMLHttpRequest = fill('XMLHttpRequest');
			FormData = fill('FormData');

			_export('XMLHttpRequest', XMLHttpRequest);

			_export('FormData', FormData);

			/*
   	https://notifications.spec.whatwg.org/
   */
			Notification = fill('Notification');

			_export('Notification', Notification);

			/*
   	https://w3c.github.io/FileAPI/
   */
			FileReader = fill('FileReader');
			Blob = fill('Blob');
			File = fill('File');
			FileList = fill('FileList');

			_export('FileReader', FileReader);

			_export('Blob', Blob);

			_export('File', File);

			_export('FileList', FileList);

			/*
   	https://w3c.github.io/gamepad/
   */
			Gamepad = fill('Gamepad');
			GamepadEvent = fill('GamepadEvent');
			GamepadButton = fill('GamepadButton');

			_export('Gamepad', Gamepad);

			_export('GamepadEvent', GamepadEvent);

			_export('GamepadButton', GamepadButton);

			/*
   	http://webaudio.github.io/web-audio-api/
   */
			AudioContext = fill('AudioContext');
			AudioBuffer = fill('AudioBuffer');

			_export('AudioContext', AudioContext);

			_export('AudioBuffer', AudioBuffer);

			fetch = fill('fetch');
			Body = fill('Body');
			Request = fill('Request');
			Response = fill('Response');
			Headers = fill('Headers');

			_export('fetch', fetch);

			_export('Body', Body);

			_export('Request', Request);

			_export('Response', Response);

			_export('Headers', Headers);

			HTMLCanvasElement = fill('HTMLCanvasElement');

			_export('HTMLCanvasElement', HTMLCanvasElement);

			_export('default', __global);
		}
	};
});
System.register("github:matthewbauer/window@0.0.3.js", ["github:matthewbauer/window@0.0.3/window.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubMatthewbauerWindow003WindowJs) {
      var _exportObj = {};

      for (var _key in _githubMatthewbauerWindow003WindowJs) {
        if (_key !== "default") _exportObj[_key] = _githubMatthewbauerWindow003WindowJs[_key];
      }

      _exportObj["default"] = _githubMatthewbauerWindow003WindowJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.registerDynamic('github:matthewbauer/x-retro@master/player.coffee!github:forresto/system-coffee@master.js', ['github:matthewbauer/window@0.0.3.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  var Player,
      cancelAnimationFrame,
      requestAnimationFrame,
      bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  requestAnimationFrame = $__require('github:matthewbauer/window@0.0.3.js').requestAnimationFrame;

  cancelAnimationFrame = $__require('github:matthewbauer/window@0.0.3.js').cancelAnimationFrame;

  module.exports = Player = function () {
    Player.prototype.update = false;

    Player.prototype.overscan = false;

    Player.prototype.can_dupe = true;

    Player.prototype.latency = 90;

    Player.prototype.bufferSize = 2480;

    function Player(gl, audio, inputs, core, game, save) {
      this.gl = gl;
      this.audio = audio;
      this.inputs = inputs;
      this.core = core;
      this.game = game;
      this.save = save;
      this.frame = bind(this.frame, this);
      this.environment = bind(this.environment, this);
      this.audio_sample_batch = bind(this.audio_sample_batch, this);
      this.video_refresh = bind(this.video_refresh, this);
      this.input_state = bind(this.input_state, this);
      this.initGL();
      this.pixelFormat = this.core.PIXEL_FORMAT_0RGB1555;
      this.core.print = function (args) {
        return console.log(args);
      };
      this.core.printErr = function (args) {
        return console.error(args);
      };
      this.core.set_environment(this.environment);
      this.core.set_video_refresh(this.video_refresh);
      this.core.set_audio_sample(this.audio_sample);
      this.core.set_audio_sample_batch(this.audio_sample_batch);
      this.core.set_input_state(this.input_state);
      this.core.set_input_poll(this.input_poll);
      this.then = 0;
      this.core.init();
      this.av_info = this.core.get_system_av_info();
      this.fpsInterval = 1000 / this.av_info.timing.fps;
      this.initAudio();
      if (this.game != null) {
        this.core.load_game(this.game);
      }
      if (this.save != null) {
        this.core.unserialize(this.save);
      }
    }

    Player.prototype.initAudio = function () {
      var i;
      this.then = 0;
      this.sampleRate = this.av_info.timing.sample_rate;
      this.numBuffers = Math.floor(this.latency * this.sampleRate / (1000 * this.bufferSize));
      if (this.numBuffers < 2) {
        this.numBuffers = 2;
      }
      i = 0;
      this.buffers = [];
      while (i < this.numBuffers) {
        this.buffers[i] = this.audio.createBuffer(2, this.bufferSize, this.sampleRate);
        i++;
      }
      this.bufOffset = 0;
      this.bufIndex = 0;
      this.destination = this.audio.createGain();
      this.destination.gain.value = 1;
      return this.destination.connect(this.audio.destination);
    };

    Player.prototype.initGL = function () {
      var buffer, fragmentShader, positionLocation, program, texCoordBuffer, texCoordLocation, vertexShader;
      fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      this.gl.shaderSource(fragmentShader, 'precision mediump float; uniform sampler2D u_image; varying vec2 v_texCoord; void main() { gl_FragColor = texture2D(u_image, v_texCoord); }');
      this.gl.compileShader(fragmentShader);
      vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
      this.gl.shaderSource(vertexShader, 'attribute vec2 a_texCoord; attribute vec2 a_position; varying vec2 v_texCoord; void main() { gl_Position = vec4(a_position, 0, 1); v_texCoord = a_texCoord; }');
      this.gl.compileShader(vertexShader);
      program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);
      this.gl.useProgram(program);
      positionLocation = this.gl.getAttribLocation(program, 'a_position');
      buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), this.gl.STATIC_DRAW);
      this.gl.enableVertexAttribArray(positionLocation);
      this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
      texCoordLocation = this.gl.getAttribLocation(program, 'a_texCoord');
      texCoordBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), this.gl.STATIC_DRAW);
      this.gl.enableVertexAttribArray(texCoordLocation);
      this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
      this.texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      return this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    };

    Player.prototype.input_state = function (port, device, index, id) {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
      if (id === this.core.DEVICE_ID_JOYPAD_LEFT && ((ref = this.inputs[port]) != null ? (ref1 = ref.axes) != null ? ref1[0] : void 0 : void 0) < -.5) {
        return true;
      }
      if (id === this.core.DEVICE_ID_JOYPAD_RIGHT && ((ref2 = this.inputs[port]) != null ? (ref3 = ref2.axes) != null ? ref3[0] : void 0 : void 0) > .5) {
        return true;
      }
      if (id === this.core.DEVICE_ID_JOYPAD_UP && ((ref4 = this.inputs[port]) != null ? (ref5 = ref4.axes) != null ? ref5[1] : void 0 : void 0) < -.5) {
        return true;
      }
      if (id === this.core.DEVICE_ID_JOYPAD_DOWN && ((ref6 = this.inputs[port]) != null ? (ref7 = ref6.axes) != null ? ref7[1] : void 0 : void 0) > .5) {
        return true;
      }
      return (ref8 = this.inputs[port]) != null ? (ref9 = ref8.buttons[{
        0: 0,
        1: 2,
        2: 8,
        3: 9,
        4: 12,
        5: 13,
        6: 14,
        7: 15,
        8: 1,
        9: 3,
        10: 4,
        11: 5,
        12: 6,
        13: 7,
        14: 10,
        15: 11
      }[id]]) != null ? ref9.pressed : void 0 : void 0;
    };

    Player.prototype.audio_sample = function () {};

    Player.prototype.input_poll = function () {};

    Player.prototype.video_refresh = function (data, width, height, pitch) {
      var _data, format, i, j, k, len, pixel, ref, type;
      this.width = width;
      this.height = height;
      this.gl.canvas.width = this.width;
      this.gl.canvas.height = this.height;
      switch (this.pixelFormat) {
        case this.core.PIXEL_FORMAT_0RGB1555:
          type = this.gl.UNSIGNED_SHORT_5_5_5_1;
          format = this.gl.RGBA;
          _data = new Uint16Array(data.length);
          for (i = j = 0, len = data.length; j < len; i = ++j) {
            pixel = data[i];
            _data[i] = pixel & 0x8000 >> 15 | pixel & 0xf800 << 1 | pixel & 0x3e0 << 1 | pixel & 0x1f << 1;
          }
          this.gl.viewport(0, 0, pitch / 2, this.height);
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, pitch / 2, this.height, 0, format, type, _data);
          break;
        case this.core.PIXEL_FORMAT_XRGB8888:
          type = this.gl.UNSIGNED_BYTE;
          format = this.gl.RGBA;
          data = new Uint8Array(data);
          _data = new Uint8Array(pitch * this.height);
          for (i = k = 0, ref = pitch * this.height; k < ref; i = k += 4) {
            _data[i] = data[i + 3];
            _data[i + 1] = data[i];
            _data[i + 2] = data[i + 2];
          }
          this.gl.viewport(0, 0, this.width, this.height);
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, this.width / 2, this.height, 0, format, type, _data);
          break;
        case this.core.PIXEL_FORMAT_RGB565:
          type = this.gl.UNSIGNED_SHORT_5_6_5;
          format = this.gl.RGB;
          this.gl.viewport(0, 0, pitch / 2, this.height);
          this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, pitch / 2, this.height, 0, format, type, data);
      }
      return this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    };

    Player.prototype.audio_sample_batch = function (left, right, frames) {
      var buf, count, fill, i, source, startTime;
      i = 0;
      while (i < this.bufIndex) {
        if (this.buffers[i].endTime < this.audio.currentTime) {
          buf = this.buffers.splice(i, 1)[0];
          this.buffers[this.numBuffers - 1] = buf;
          i--;
          this.bufIndex--;
        }
        i++;
      }
      count = 0;
      while (frames) {
        fill = this.buffers[this.bufIndex].length - this.bufOffset;
        if (fill > frames) {
          fill = frames;
        }
        if (this.bufOffset + fill >= this.bufferSize) {
          if (this.bufIndex >= this.numBuffers - 1) {
            break;
          }
          if (this.bufIndex) {
            startTime = this.buffers[this.bufIndex - 1].endTime;
          } else {
            startTime = this.audio.currentTime;
          }
          this.buffers[this.bufIndex].endTime = startTime + this.buffers[this.bufIndex].duration;
          source = this.audio.createBufferSource();
          source.buffer = this.buffers[this.bufIndex];
          source.connect(this.destination);
          source.start(startTime);
          this.bufIndex++;
          this.bufOffset = 0;
        }
        this.buffers[this.bufIndex].copyToChannel(new Float32Array(left, count * 4, fill), 0, this.bufOffset);
        this.buffers[this.bufIndex].copyToChannel(new Float32Array(right, count * 4, fill), 1, this.bufOffset);
        this.bufOffset += fill;
        count += fill;
        frames -= fill;
      }
      return count;
    };

    Player.prototype.setVariable = function (key, value) {
      this[key] = value;
      return this.update = true;
    };

    Player.prototype.log = function (level, msg) {
      return console.log(msg);
    };

    Player.prototype.environment = function (cmd, value) {
      switch (cmd) {
        case this.core.ENVIRONMENT_GET_LOG_INTERFACE:
          return this.log;
        case this.core.ENVIRONMENT_SET_PIXEL_FORMAT:
          this.pixelFormat = value;
          return true;
        case this.core.ENVIRONMENT_GET_VARIABLE_UPDATE:
          if (this.update) {
            this.update = false;
            return true;
          } else {
            return false;
          }
          break;
        case this.core.ENVIRONMENT_GET_OVERSCAN:
          return this.overscan;
        case this.core.ENVIRONMENT_GET_CAN_DUPE:
          return this.can_dupe;
        case this.core.ENVIRONMENT_GET_VARIABLE:
          if (value.key === "nestopia_palette") {
            return "rgb";
          }
          if (value.key === "nestopia_blargg_ntsc_filter") {
            return "rgb";
          }
          return true;
        case this.core.ENVIRONMENT_SET_PERFORMANCE_LEVEL:
          return true;
        case this.core.ENVIRONMENT_SET_VARIABLES:
          return true;
        case this.core.ENVIRONMENT_SET_MEMORY_MAPS:
          return true;
        default:
          console.log("Unknown environment command " + cmd);
          return true;
      }
    };

    Player.prototype.frame = function (now) {
      var elapsed;
      this.requestID = requestAnimationFrame(this.frame);
      elapsed = now - this.then;
      if (elapsed > this.fpsInterval) {
        this.then = now - elapsed % this.fpsInterval;
        return this.core.run();
      }
    };

    Player.prototype.start = function () {
      return this.frame();
    };

    Player.prototype.stop = function () {
      return cancelAnimationFrame(this.requestID);
    };

    return Player;
  }();
});
System.register('github:matthewbauer/x-retro@master/x-retro.js', ['npm:babel-runtime@5.8.38/core-js/object/create.js', 'github:matthewbauer/window@0.0.3.js', 'github:matthewbauer/document@0.0.4.js', 'github:matthewbauer/x-retro@master/player.coffee!github:forresto/system-coffee@master.js'], function (_export) {
  var _Object$create, AudioContext, HTMLCanvasElement, registerElement, Player, PlayerElement;

  return {
    setters: [function (_npmBabelRuntime5838CoreJsObjectCreateJs) {
      _Object$create = _npmBabelRuntime5838CoreJsObjectCreateJs['default'];
    }, function (_githubMatthewbauerWindow003Js) {
      AudioContext = _githubMatthewbauerWindow003Js.AudioContext;
      HTMLCanvasElement = _githubMatthewbauerWindow003Js.HTMLCanvasElement;
    }, function (_githubMatthewbauerDocument004Js) {
      registerElement = _githubMatthewbauerDocument004Js.registerElement;
    }, function (_githubMatthewbauerXRetroMasterPlayerCoffeeGithubForrestoSystemCoffeeMasterJs) {
      Player = _githubMatthewbauerXRetroMasterPlayerCoffeeGithubForrestoSystemCoffeeMasterJs['default'];
    }],
    execute: function () {
      /* */
      'use strict';

      "format esm";
      PlayerElement = _Object$create(HTMLCanvasElement.prototype);

      PlayerElement.inputs = [];
      PlayerElement.attachedCallback = function () {
        this.style['image-rendering'] = 'pixelated';
        this.style['background-color'] = 'black';
        if (this.hasAttribute('core')) {
          System['import'](this.getAttribute('core')).then((function (core) {
            this.core = core;
          }).bind(this)).then((function () {
            if (this.hasAttribute('src')) {
              return System['import'](this.getAttribute('src') + '!raw').then((function (rom) {
                this.core.load_game(new Uint8Array(rom));
                if (this.hasAttribute('save')) {
                  return System['import'](this.getAttribute('save') + '!raw').then((function (save) {
                    this.core.unserialize(save);
                  }).bind(this));
                }
              }).bind(this));
            }
          }).bind(this)).then((function () {
            if (this.hasAttribute('autostart')) {
              this.start();
            }
          }).bind(this));
        }
      };

      Object.defineProperty(PlayerElement, 'core', {
        set: function set(core) {
          this.player = new Player(this.getContext('webgl') || this.getContext('experimental-webgl'), new AudioContext(), this.inputs, core);
        },
        get: function get() {
          return this.player.core;
        }
      });

      // TODO: deprecate retro.game
      Object.defineProperty(PlayerElement, 'game', {
        set: function set(game) {
          this.player.game = game;
          this.core.load_game(game);
        },
        get: function get() {
          return this.player.game;
        }
      });

      // TODO: deprecate retro.save
      Object.defineProperty(PlayerElement, 'save', {
        set: function set(data) {
          this.core.unserialize(data);
        },
        get: function get() {
          return this.core.serialize();
        }
      });

      PlayerElement.start = function () {
        this.running = true;
        this.player.start();
      };

      PlayerElement.stop = function () {
        this.running = false;
        this.player.stop();
      };

      _export('default', registerElement('x-retro', {
        prototype: PlayerElement,
        'extends': 'canvas'
      }));
    }
  };
});
System.register("github:matthewbauer/x-retro@master.js", ["github:matthewbauer/x-retro@master/x-retro.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubMatthewbauerXRetroMasterXRetroJs) {
      var _exportObj = {};

      for (var _key in _githubMatthewbauerXRetroMasterXRetroJs) {
        if (_key !== "default") _exportObj[_key] = _githubMatthewbauerXRetroMasterXRetroJs[_key];
      }

      _exportObj["default"] = _githubMatthewbauerXRetroMasterXRetroJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.registerDynamic("settings.json!github:systemjs/plugin-json@0.1.2.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = { "extensions": { "gb": "gambatte", "gbc": "gambatte", "smc": "snes9x-next", "fig": "snes9x-next", "sfc": "snes9x-next", "swc": "snes9x-next", "gba": "vba-next", "nes": "quicknes", "sms": "picodrive", "gen": "picodrive", "smd": "picodrive", "md": "picodrive", "32x": "picodrive", "mgw": "gw", "vec": "vecx" }, "overlays": { "gambatte": "./overlays/gamepads/gameboy/", "vba-next": "./overlays/gamepads/gba/", "snes9x-next": "./overlays/gamepads/snes/", "nestopia": "./overlays/gamepads/nes/" }, "keys": { "8": "8", "9": "8", "13": "9", "16": "8", "17": "2", "18": "16", "19": "16", "20": "16", "27": "9", "32": "1", "33": "12", "34": "13", "35": "13", "36": "12", "37": "14", "38": "12", "39": "15", "40": "13", "45": "2", "46": "3", "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "65": "0", "66": "1", "67": "1", "68": "0", "69": "3", "70": "2", "71": "3", "72": "1", "73": "2", "74": "13", "75": "12", "76": "4", "77": "0", "78": "1", "79": "2", "80": "3", "81": "0", "82": "5", "83": "1", "84": "1", "85": "2", "86": "3", "87": "0", "88": "2", "89": "3", "90": "0", "91": "4", "92": "5", "93": "8", "96": "9", "97": "2", "98": "13", "99": "1", "100": "14", "101": "9", "102": "15", "103": "0", "104": "12", "105": "3", "106": "4", "107": "16", "109": "5", "110": "8", "111": "9", "112": "1", "113": "2", "114": "3", "115": "4", "116": "5", "117": "6", "118": "7", "119": "8", "120": "9", "121": "10", "122": "11", "123": "12", "144": "8", "145": "9", "186": "16", "187": "2", "189": "3", "190": "0", "191": "1", "192": "6", "219": "7", "220": "8", "221": "6", "222": "7" }, "urlPrefix": "https://crossorigin.me/" };
});
System.registerDynamic('utils.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports.getExtension = function (filename) {
    var parts = filename.split('.');
    extension = parts[parts.length - 1];
    extension = extension.toLowerCase();
    return extension;
  };
});
System.registerDynamic('index.coffee!github:forresto/system-coffee@master.js', ['github:satazor/js-spark-md5@1.0.1.js', 'github:stuk/jszip@2.6.1.js', 'npm:localforage@1.5.3.js', 'github:matthewbauer/x-retro@master.js', 'settings.json!github:systemjs/plugin-json@0.1.2.js', 'utils.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  var JSZip,
      autosaver,
      chooser,
      createOverlay,
      draghint,
      error,
      load,
      loadData,
      loadSave,
      loading,
      localForage,
      menu,
      onkey,
      play,
      play_error,
      ref,
      retro,
      savechooser,
      settings,
      sparkmd5,
      utils,
      writeSave,
      xhr,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  sparkmd5 = $__require('github:satazor/js-spark-md5@1.0.1.js');

  JSZip = $__require('github:stuk/jszip@2.6.1.js');

  localForage = $__require('npm:localforage@1.5.3.js');

  $__require('github:matthewbauer/x-retro@master.js');

  settings = $__require('settings.json!github:systemjs/plugin-json@0.1.2.js');

  utils = $__require('utils.js');

  draghint = document.getElementById('draghint');

  loading = document.getElementById('loading');

  if (location.search != null && location.search.substr(1)) {
    window.url = location.search.substr(1);
    if (window.url.startsWith('http')) {
      window.url = settings.urlPrefix + window.url;
    }
    ref = location.search.substr(1).split('/'), window.filename = ref[ref.length - 1];
  }

  if (window.url && window.filename) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', window.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
      if (this.status === 200) {
        return loadData(window.filename, new Uint8Array(this.response));
      }
    };
    xhr.send();
  } else {
    loading.classList.add('hidden');
    draghint.classList.remove('hidden');
  }

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('worker.js');
  }

  retro = null;

  onkey = function (event) {
    var base, name, pressed;
    if (retro.player && settings.keys.hasOwnProperty(event.which)) {
      pressed = event.type === 'keydown';
      if ((base = retro.player.inputs[0].buttons)[name = settings.keys[event.which]] == null) {
        base[name] = {};
      }
      retro.player.inputs[0].buttons[settings.keys[event.which]].pressed = pressed;
      return event.preventDefault();
    }
  };

  autosaver = 0;

  createOverlay = function (buttons, prefix) {
    return buttons.forEach(function (button) {
      var el, press;
      el = null;
      if (button.src) {
        el = document.createElement('img');
        el.setAttribute('src', prefix + button.src);
      } else {
        el = document.createElement('div');
      }
      el.style['z-index'] = 1;
      el.style.position = 'absolute';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.left = 100 * button.x + '%';
      el.style.top = 100 * button.y + '%';
      el.style.width = 100 * button.width + '%';
      el.style.height = 100 * button.height + '%';
      if (button.circle) {
        el.style['border-radius'] = '100%';
      }
      if (button.id != null) {
        el.style['z-index'] = 2;
        press = function (event) {
          var base, name;
          if (retro.player) {
            if ((base = retro.player.inputs[0].buttons)[name = button.id] == null) {
              base[name] = {};
            }
            retro.player.inputs[0].buttons[button.id].pressed = event.type === 'mousedown' || event.type === 'touchstart';
            return event.preventDefault();
          }
        };
        el.addEventListener('mousedown', press);
        el.addEventListener('mousemove', press);
        el.addEventListener('mouseup', press);
        el.addEventListener('touchstart', press);
        el.addEventListener('touchmove', press);
        el.addEventListener('touchend', press);
      }
      return document.getElementById('overlay').appendChild(el);
    });
  };

  error = function (e) {
    loading.classList.add('hidden');
    alert('Sorry, an error occured. If this happened while loading, you may have a corrupted file');
    draghint.classList.remove('hidden');
    return console.error(e);
  };

  play_error = function (e) {
    loading.classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
    if (retro != null) {
      document.getElementById('clear-save').classList.remove('hidden');
    }
    return console.error(e);
  };

  writeSave = function (retro) {
    var err, error1;
    try {
      return localForage.setItem(retro.md5, new Uint8Array(retro.core.serialize()));
    } catch (error1) {
      err = error1;
      return console.error(err);
    }
  };

  loadSave = function (retro) {
    var err, error1;
    try {
      return localForage.getItem(retro.md5);
    } catch (error1) {
      err = error1;
      return console.error(err);
    }
  };

  window.removeSave = function () {
    var err, error1;
    try {
      return localForage.removeItem(window.retro.md5);
    } catch (error1) {
      err = error1;
      return console.error(err);
    }
  };

  play = function (rom, extension) {
    return Promise.resolve().then(function () {
      if (!rom) {
        throw new Error('no rom!');
      }
      window.retro = retro = document.createElement('canvas', 'x-retro');
      document.body.appendChild(retro);
      retro.md5 = sparkmd5.ArrayBuffer.hash(rom);
      retro.name = settings.extensions[extension];
      return Promise.all([System["import"](settings.extensions[extension]), loadSave(retro), settings.overlays[retro.name] && indexOf.call(window, 'ontouchstart') >= 0 ? System["import"](settings.overlays[retro.name] + 'index.json!') : void 0]).then(function (arg) {
        var _overlay, core, save;
        core = arg[0], save = arg[1], _overlay = arg[2];
        if (_overlay != null) {
          createOverlay(_overlay, settings.overlays[retro.name]);
        }
        retro.core = core;
        retro.game = rom;
        if (save != null) {
          core.unserialize(new Uint8Array(save));
        }
        core.set_input_poll(function () {
          var gamepads;
          if (navigator.getGamepads) {
            gamepads = navigator.getGamepads();
          }
          if (gamepads && gamepads[0]) {
            return retro.player.inputs = gamepads;
          }
        });
        retro.player.inputs = [{
          buttons: {}
        }];
        loading.classList.add('hidden');
        overlay.classList.remove('hidden');
        autosaver = setInterval(function () {
          return writeSave(retro);
        }, 1000);
        window.addEventListener('keydown', onkey);
        window.addEventListener('keyup', onkey);
        return retro.start();
      });
    });
  };

  loadData = function (filename, buffer) {
    var extension, file, i, len, ref1, rom, zip;
    draghint.classList.add('hidden');
    extension = utils.getExtension(filename);
    rom = null;
    if (extension === 'zip') {
      zip = new JSZip(buffer);
      ref1 = zip.file(/.*/);
      for (i = 0, len = ref1.length; i < len; i++) {
        file = ref1[i];
        extension = utils.getExtension(file.name);
        if (settings.extensions[extension]) {
          rom = new Uint8Array(file.asArrayBuffer());
          break;
        }
      }
    } else if (settings.extensions[extension]) {
      rom = buffer;
    }
    return play(rom, extension)["catch"](play_error);
  };

  load = function (file) {
    var reader;
    if (!file instanceof Blob) {
      return;
    }
    draghint.classList.add('hidden');
    reader = new FileReader();
    reader.addEventListener('load', function (event) {
      return loadData(file.name, new Uint8Array(reader.result));
    });
    return reader.readAsArrayBuffer(file);
  };

  window.addEventListener('drop', function (event) {
    if (draghint.classList.contains('hidden')) {
      return;
    }
    loading.classList.remove('hidden');
    event.preventDefault();
    draghint.classList.remove('hover');
    if (event.dataTransfer.files.length > 0) {
      load(event.dataTransfer.files[0]);
    }
    return false;
  });

  window.addEventListener('dragover', function (event) {
    event.preventDefault();
    draghint.classList.add('hover');
    return false;
  });

  window.addEventListener('dragleave', function (event) {
    event.preventDefault();
    draghint.classList.remove('hover');
    return false;
  });

  window.addEventListener('focus', function () {
    return draghint.classList.remove('hover');
  });

  menu = document.getElementById('menu');

  window.addEventListener('contextmenu', function (event) {
    if (retro != null) {
      if (retro.classList.contains('hidden')) {
        retro.start();
      } else {
        retro.stop();
      }
      retro.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
      menu.classList.toggle('hidden');
      return event.preventDefault();
    }
  });

  window.resume = function () {
    retro.classList.remove('hidden');
    overlay.classList.toggle('hidden');
    menu.classList.add('hidden');
    return retro.start();
  };

  window.reset = function () {
    retro.stop();
    retro.core.reset();
    return window.resume();
  };

  window.mute = function () {
    if (retro.player.destination.gain.value === 0) {
      retro.player.destination.gain.value = 1;
      document.getElementById('mute').textContent = 'mute';
    } else {
      retro.player.destination.gain.value = 0;
      document.getElementById('mute').textContent = 'unmute';
    }
    return window.resume();
  };

  window.save = function () {
    var a, blob, url;
    a = document.createElement('a');
    document.body.appendChild(a);
    a.classList.add('hidden');
    blob = new Blob([new Uint8Array(retro.core.serialize())], {
      type: 'application/octet-binary'
    });
    url = URL.createObjectURL(blob);
    a.href = url;
    a.download = retro.md5 + '.' + retro.name + '.sav';
    a.click();
    return URL.revokeObjectURL(url);
  };

  savechooser = document.getElementById('savechooser');

  savechooser.addEventListener('change', function () {
    var file, reader;
    file = this.files[0];
    if (!file instanceof Blob) {
      return;
    }
    draghint.classList.add('hidden');
    reader = new FileReader();
    reader.addEventListener('load', function (event) {
      retro.core.unserialize(new Uint8Array(reader.result));
      return window.resume();
    });
    return reader.readAsArrayBuffer(file);
  });

  window.load = function () {
    return savechooser.click();
  };

  chooser = document.getElementById('chooser');

  chooser.addEventListener('change', function () {
    draghint.classList.remove('hover');
    loading.classList.remove('hidden');
    return load(this.files[0]);
  });

  window.addEventListener('click', function (event) {
    if (!draghint.classList.contains('hidden')) {
      draghint.classList.add('hover');
      return chooser.click();
    }
  });

  window.addEventListener('touchstart', function (e) {
    return e.preventDefault();
  });

  window.addEventListener('error', error);
});
//# sourceMappingURL=build.js.map