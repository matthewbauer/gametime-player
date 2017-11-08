/* */ 
(function() {
  "use strict";

  describe("AudioBuffer.prototype.copyFromChannel", function() {
    function writeNoise(destination) {
      var i;

      for (i = 0; i < destination.length; i++) {
        destination[i] = Math.random() - 0.5;
      }
    }
    describe("(destination: Float32Array, channelNumber: number, startInChannel: number): void", function() {
      it("should copy the samples from the specified channel of the AudioBuffer to the destination array", function() {
        var channelData = [ new Float32Array(100), new Float32Array(100) ];
        var destination = [ new Float32Array(50), new Float32Array(50) ];
        var buffer;
        var i;

        writeNoise(channelData[0]);
        writeNoise(channelData[1]);

        buffer = audioContext.createBuffer(2, 100, audioContext.sampleRate);
        buffer.getChannelData(0).set(channelData[0]);
        buffer.getChannelData(1).set(channelData[1]);

        buffer.copyFromChannel(destination[0], 0);
        buffer.copyFromChannel(destination[1], 1, 50);

        for (i = 0; i < 50; i++) {
          assert(destination[0][i] === channelData[0][i + 0], "equal [0][" + i + "]");
          assert(destination[1][i] === channelData[1][i + 50], "equal [1][" + i + "]");
        }
      });
    });
  });
})();
