/* */ 
"format global";
let AnalyserNode = global.AnalyserNode;

function installGetFloatTimeDomainData() {
  if (AnalyserNode.prototype.hasOwnProperty("getFloatTimeDomainData")) {
    return;
  }

  let uint8 = new Uint8Array(2048);

  //// ### AnalyserNode.prototype.getFloatTimeDomainData
  //// Copies the current time-domain (waveform) data into the passed floating-point array.
  ////
  //// #### Parameters
  //// - `array: Float32Array`
  ////   - This parameter is where the time-domain sample data will be copied.
  ////
  //// #### Return
  //// - `void`
  AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
    this.getByteTimeDomainData(uint8);
    for (let i = 0, imax = array.length; i < imax; i++) {
      array[i] = (uint8[i] - 128) * 0.0078125;
    }
  };
}

export function install() {
  installGetFloatTimeDomainData();
}
