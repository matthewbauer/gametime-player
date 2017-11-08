/* */ 
"format global";
let OfflineAudioContext = global.OfflineAudioContext;
let AudioNode = global.AudioNode;
let connect = AudioNode.prototype.connect;
let disconnect = AudioNode.prototype.disconnect;

function match(args, connection) {
  for (let i = 0, imax = args.length; i < imax; i++) {
    if (args[i] !== connection[i]) {
      return false;
    }
  }
  return true;
}

function disconnectAll(node) {
  for (let ch = 0, chmax = node.numberOfOutputs; ch < chmax; ch++) {
    disconnect.call(node, ch);
  }
  node._shim$connections = [];
}

function disconnectChannel(node, channel) {
  disconnect.call(node, channel);
  node._shim$connections = node._shim$connections.filter(connection => connection[1] !== channel);
}

function disconnectSelect(node, args) {
  let remain = [];
  let hasDestination = false;

  node._shim$connections.forEach((connection) => {
    hasDestination = hasDestination || (args[0] === connection[0]);
    if (!match(args, connection)) {
      remain.push(connection);
    }
  });

  if (!hasDestination) {
    throw new Error("Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.");
  }

  disconnectAll(node);

  remain.forEach((connection) => {
    connect.call(node, connection[0], connection[1], connection[2]);
  });

  node._shim$connections = remain;
}

function installDisconnect() {
  let audioContext = new OfflineAudioContext(1, 1, 44100);
  let isSelectiveDisconnection = false;

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
  AudioNode.prototype.disconnect = function(...args) {
    this._shim$connections = this._shim$connections || [];

    if (args.length === 0) {
      disconnectAll(this);
    } else if (args.length === 1 && typeof args[0] === "number") {
      disconnectChannel(this, args[0]);
    } else {
      disconnectSelect(this, args);
    }
  };
  AudioNode.prototype.disconnect.original = disconnect;

  AudioNode.prototype.connect = function(destination, output = 0, input = 0) {
    let _input;

    this._shim$connections = this._shim$connections || [];

    if (destination instanceof AudioNode) {
      connect.call(this, destination, output, input);
      _input = input;
    } else {
      connect.call(this, destination, output);
      _input = 0;
    }

    this._shim$connections.push([ destination, output, _input ]);
  };
  AudioNode.prototype.connect.original = connect;
}

export function install(stage) {
  if (stage !== 0) {
    installDisconnect();
  }
}
