/* */ 
"format global";
let AudioBuffer = global.AudioBuffer;

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
  AudioBuffer.prototype.copyFromChannel = function(destination, channelNumber, startInChannel) {
    let source = this.getChannelData(channelNumber|0).subarray(startInChannel|0);

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
  AudioBuffer.prototype.copyToChannel = function(source, channelNumber, startInChannel) {
    let clipped = source.subarray(0, Math.min(source.length, this.length - (startInChannel|0)));

    this.getChannelData(channelNumber|0).set(clipped, startInChannel|0);
  };
}

export function install() {
  installCopyFromChannel();
  installCopyToChannel();
}
