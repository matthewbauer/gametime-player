/* */ 
"format global";
let OriginalAudioContext = global.AudioContext;
let OriginalOfflineAudioContext = global.OfflineAudioContext;
let AudioNode = global.AudioNode;
let EventTarget = global.EventTarget || global.Object.constructor;

function nop() {}

function inherits(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
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
      get: function() {
        return this._.destination;
      },
    },
    sampleRate: {
      get: function() {
        return this._.sampleRate;
      },
    },
    currentTime: {
      get: function() {
        return this._.currentTime || this._.audioContext.currentTime;
      },
    },
    listener: {
      get: function() {
        return this._.audioContext.listener;
      },
    },
    state: {
      get: function() {
        return this._.state;
      },
    },
    onstatechange: {
      set: function(fn) {
        if (typeof fn === "function") {
          this._.onstatechange = fn;
        }
      },
      get: function() {
        return this._.onstatechange;
      },
    },
  });

  class AudioContext extends BaseAudioContext {
    constructor() {
      super(new OriginalAudioContext());
      this._.state = "running";

      if (!OriginalAudioContext.prototype.hasOwnProperty("suspend")) {
        this._.destination = this._.audioContext.createGain();
        this._.destination.connect(this._.audioContext.destination);
        this._.destination.connect = function() {
          this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
        };
        this._.destination.disconnect = function() {
          this._.audioContext.destination.connect.apply(this._.audioContext.destination, arguments);
        };
        this._.destination.channelCountMode = "explicit";
      }
    }
  }

  AudioContext.prototype.suspend = function() {
    if (this._.state === "closed") {
      return Promise.reject(new Error("cannot suspend a closed AudioContext"));
    }

    function changeState() {
      this._.state = "suspended";
      this._.currentTime = this._.audioContext.currentTime;
    }

    let promise;

    if (typeof this._.audioContext === "function") {
      promise = this._.audioContext.suspend();
      promise.then(() => {
        changeState.call(this);
      });
    } else {
      AudioNode.prototype.disconnect.call(this._.destination);

      promise = Promise.resolve();
      promise.then(() => {
        changeState.call(this);

        let e = new global.Event("statechange");

        if (typeof this._.onstatechange === "function") {
          this._.onstatechange(e);
        }

        this.dispatchEvent(e);
      });
    }

    return promise;
  };

  AudioContext.prototype.resume = function() {
    if (this._.state === "closed") {
      return Promise.reject(new Error("cannot resume a closed AudioContext"));
    }

    function changeState() {
      this._.state = "running";
      this._.currentTime = 0;
    }

    let promise;

    if (typeof this._.audioContext.resume === "function") {
      promise = this._.audioContext.resume();
      promise.then(() => {
        changeState.call(this);
      });
    } else {
      AudioNode.prototype.connect.call(this._.destination, this._.audioContext.destination);

      promise = Promise.resolve();
      promise.then(() => {
        changeState.call(this);

        let e = new global.Event("statechange");

        if (typeof this._.onstatechange === "function") {
          this._.onstatechange(e);
        }

        this.dispatchEvent(e);
      });
    }

    return promise;
  };

  AudioContext.prototype.close = function() {
    if (this._.state === "closed") {
      return Promise.reject(new Error("Cannot close a context that is being closed or has already been closed."));
    }

    function changeState() {
      this._.state = "closed";
      this._.currentTime = Infinity;
      this._.sampleRate = 0;
    }

    let promise;

    if (typeof this._.audioContext.close === "function") {
      promise = this._.audioContext.close();
      promise.then(() => {
        changeState.call(this);
      });
    } else {
      if (typeof this._.audioContext.suspend === "function") {
        this._.audioContext.suspend();
      } else {
        AudioNode.prototype.disconnect.call(this._.destination);
      }
      promise = Promise.resolve();

      promise.then(() => {
        changeState.call(this);

        let e = new global.Event("statechange");

        if (typeof this._.onstatechange === "function") {
          this._.onstatechange(e);
        }

        this.dispatchEvent(e);
      });
    }

    return promise;
  };

  [
    "addEventListener",
    "removeEventListener",
    "dispatchEvent",
    "createBuffer",
  ].forEach(function(methodName) {
    AudioContext.prototype[methodName] = function() {
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  [
    "decodeAudioData",
    "createBufferSource",
    "createMediaElementSource",
    "createMediaStreamSource",
    "createMediaStreamDestination",
    "createAudioWorker",
    "createScriptProcessor",
    "createAnalyser",
    "createGain",
    "createDelay",
    "createBiquadFilter",
    "createWaveShaper",
    "createPanner",
    "createStereoPanner",
    "createConvolver",
    "createChannelSplitter",
    "createChannelMerger",
    "createDynamicsCompressor",
    "createOscillator",
    "createPeriodicWave",
  ].forEach(function(methodName) {
    AudioContext.prototype[methodName] = function() {
      if (this._.state === "closed") {
        throw new Error(`Failed to execute '${methodName}' on 'AudioContext': AudioContext has been closed`);
      }
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  class OfflineAudioContext extends BaseAudioContext {
    constructor(numberOfChannels, length, sampleRate) {
      super(new OriginalOfflineAudioContext(numberOfChannels, length, sampleRate));
      this._.state = "suspended";
    }

    set oncomplete(fn) {
      this._.audioContext.oncomplete = fn;
    }

    get oncomplete() {
      return this._.audioContext.oncomplete;
    }
  }

  [
    "addEventListener",
    "removeEventListener",
    "dispatchEvent",
    "createBuffer",
    "decodeAudioData",
    "createBufferSource",
    "createMediaElementSource",
    "createMediaStreamSource",
    "createMediaStreamDestination",
    "createAudioWorker",
    "createScriptProcessor",
    "createAnalyser",
    "createGain",
    "createDelay",
    "createBiquadFilter",
    "createWaveShaper",
    "createPanner",
    "createStereoPanner",
    "createConvolver",
    "createChannelSplitter",
    "createChannelMerger",
    "createDynamicsCompressor",
    "createOscillator",
    "createPeriodicWave",
  ].forEach(function(methodName) {
    OfflineAudioContext.prototype[methodName] = function() {
      return this._.audioContext[methodName].apply(this._.audioContext, arguments);
    };
  });

  OfflineAudioContext.prototype.startRendering = function() {
    if (this._.state !== "suspended") {
      return Promise.reject(new Error("cannot call startRendering more than once"));
    }

    this._.state = "running";

    let promise = this._.audioContext.startRendering();

    promise.then(() => {
      this._.state = "closed";

      let e = new global.Event("statechange");

      if (typeof this._.onstatechange === "function") {
        this._.onstatechange(e);
      }

      this.dispatchEvent(e);
    });

    return promise;
  };

  OfflineAudioContext.prototype.suspend = function() {
    if (typeof this._.audioContext.suspend === "function") {
      return this._.audioContext.suspend();
    }
    return Promise.reject(new Error("cannot suspend an OfflineAudioContext"));
  };

  OfflineAudioContext.prototype.resume = function() {
    if (typeof this._.audioContext.resume === "function") {
      return this._.audioContext.resume();
    }
    return Promise.reject(new Error("cannot resume an OfflineAudioContext"));
  };

  OfflineAudioContext.prototype.close = function() {
    if (typeof this._.audioContext.close === "function") {
      return this._.audioContext.close();
    }
    return Promise.reject(new Error("cannot close an OfflineAudioContext"));
  };

  global.AudioContext = AudioContext;
  global.OfflineAudioContext = OfflineAudioContext;
}

function installCreateAudioWorker() {
}

function installCreateStereoPanner() {
  if (OriginalAudioContext.prototype.hasOwnProperty("createStereoPanner")) {
    return;
  }

  let StereoPannerNode = require("stereo-panner-node");

  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  OriginalAudioContext.prototype.createStereoPanner = function() {
    return new StereoPannerNode(this);
  };
}

function installDecodeAudioData() {
  let audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
  let isPromiseBased = false;

  try {
    let audioData = new Uint32Array([ 1179011410, 48, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 8, 0, 0, 0, 0 ]).buffer;

    isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
  } catch (e) {
    nop(e);
  }

  if (isPromiseBased) {
    return;
  }

  let decodeAudioData = OriginalAudioContext.prototype.decodeAudioData;

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
  OriginalAudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
    let promise = new Promise((resolve, reject) => {
      return decodeAudioData.call(this, audioData, resolve, reject);
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
  let audioContext = new OriginalOfflineAudioContext(1, 1, 44100);
  let isPromiseBased = false;

  try {
    isPromiseBased = !!audioContext.startRendering();
  } catch (e) {
    nop(e);
  }

  if (isPromiseBased) {
    return;
  }

  let startRendering = OriginalOfflineAudioContext.prototype.startRendering;

  //// ### OfflineAudioContext.prototype.startRendering
  //// Given the current connections and scheduled changes, starts rendering audio.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<AudioBuffer>`
  OriginalOfflineAudioContext.prototype.startRendering = function() {
    return new Promise((resolve) => {
      let oncomplete = this.oncomplete;

      this.oncomplete = (e) => {
        resolve(e.renderedBuffer);
        if (typeof oncomplete === "function") {
          oncomplete.call(this, e);
        }
      };
      startRendering.call(this);
    });
  };
  OriginalOfflineAudioContext.prototype.startRendering.original = startRendering;
}

export function install(stage) {
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
