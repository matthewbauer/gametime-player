/* */ 
var phaser = 0;
var lastDataValue = 0;

onaudioprocess= function (e) {
  for (var channel=0; channel<e.inputBuffers.length; channel++) {
    var inputBuffer = e.inputBuffers[channel];
    var outputBuffer = e.outputBuffers[channel];
    var bufferLength = inputBuffer.length;
    var bitsArray = e.parameters.bits;
    var frequencyReductionArray = e.parameters.frequencyReduction;

    for (var i=0; i<bufferLength; i++) {
      var bits = bitsArray ? bitsArray[i] : 8;
      var frequencyReduction = frequencyReductionArray ? frequencyReductionArray[i] : 0.5;

      var step = Math.pow(1/2, bits);
      phaser += frequencyReduction;
      if (phaser >= 1.0) {
          phaser -= 1.0;
          lastDataValue = step * Math.floor(inputBuffer[i] / step + 0.5);
      }
      outputBuffer[i] = lastDataValue;
    }
  }
};
