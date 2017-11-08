/* */ 
(function() {
  "use strict";

  describe("AudioBuffer.prototype.copyToChannel", function() {
    function writeNoise(destination) {
      var i;

      for (i = 0; i < destination.length; i++) {
        destination[i] = Math.random() - 0.5;
      }
    }
    describe("(source: Float32Array, channelNumber: number, startInChannel: number): void", function() {
      it("should copy the samples to the specified channel of the AudioBuffer, from the source array", function() {
        var source = [ new Float32Array(50), new Float32Array(50) ];
        var buffer, channelData;
        var i;

        writeNoise(source[0]);
        writeNoise(source[1]);

        buffer = audioContext.createBuffer(2, 100, audioContext.sampleRate);

        buffer.copyToChannel(source[0], 0);
        buffer.copyToChannel(source[1], 1, 50);

        channelData = [ buffer.getChannelData(0), buffer.getChannelData(1) ];

        for (i = 0; i < 50; i++) {
          assert(source[0][i] === channelData[0][i + 0], "equal [0][" + i + "]");
          assert(source[1][i] === channelData[1][i + 50], "equal [1][" + i + "]");
        }
      });
    });
  });
})();
