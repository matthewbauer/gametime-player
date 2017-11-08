/* */ 
"format global";
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.install = install;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

  var AudioContext = (function (_BaseAudioContext) {
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
  })(BaseAudioContext);

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

  var OfflineAudioContext = (function (_BaseAudioContext2) {
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
  })(BaseAudioContext);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"stereo-panner-node":9}],4:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioContext":3,"./AudioNode":4}],6:[function(require,module,exports){
module.exports = require("./lib/install")(0);

},{"./lib/install":5}],7:[function(require,module,exports){
var WS_CURVE_SIZE = 4096;
var curveL = new Float32Array(WS_CURVE_SIZE);
var curveR = new Float32Array(WS_CURVE_SIZE);

(function() {
  var i;

  for (i = 0; i < WS_CURVE_SIZE; i++) {
    curveL[i] = Math.cos((i / WS_CURVE_SIZE) * Math.PI * 0.5);
    curveR[i] = Math.sin((i / WS_CURVE_SIZE) * Math.PI * 0.5);
  }
})();

module.exports = {
  L: curveL,
  R: curveR,
};

},{}],8:[function(require,module,exports){
(function (global){
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

StereoPannerImpl.prototype.connect = function(destination) {
  var audioContext = this.audioContext;

  if (!this._isConnected) {
    this._isConnected = true;
    this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
    this._dc1buffer.getChannelData(0).set([ 1, 1 ]);

    this._dc1 = audioContext.createBufferSource();
    this._dc1.buffer = this._dc1buffer;
    this._dc1.loop = true;
    this._dc1.start(audioContext.currentTime);
    this._dc1.connect(this._pan);
  }

  global.AudioNode.prototype.connect.call(this.outlet, destination);
};

StereoPannerImpl.prototype.disconnect = function() {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./curve":7}],9:[function(require,module,exports){
(function (global){
var StereoPannerImpl = require("./stereo-panner-impl");
var AudioContext = global.AudioContext || global.webkitAudioContext;

function StereoPanner(audioContext) {
  var impl = new StereoPannerImpl(audioContext);

  Object.defineProperties(impl.inlet, {
    pan: {
      value: impl.pan,
      enumerable: true,
    },
    connect: {
      value: function(node) {
        return impl.connect(node);
      },
    },
    disconnect: {
      value: function() {
        return impl.disconnect();
      },
    },
  });

  return impl.inlet;
}

StereoPanner.polyfill = function() {
  if (!AudioContext || AudioContext.prototype.hasOwnProperty("createStereoPanner")) {
    return;
  }
  AudioContext.prototype.createStereoPanner = function() {
    return new StereoPanner(this);
  };
};

module.exports = StereoPanner;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./stereo-panner-impl":8}]},{},[6]);
