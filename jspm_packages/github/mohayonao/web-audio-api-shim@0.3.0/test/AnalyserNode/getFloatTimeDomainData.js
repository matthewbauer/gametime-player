/* */ 
(function() {
  "use strict";

  describe("AnalyserNode.prototype.getFloatTimeDomainData", function() {
    var _ = null;

    before(function() {
      _ = {};
      _.buffer = audioContext.createBuffer(1, 4, audioContext.sampleRate);
      _.bufSrc = audioContext.createBufferSource();
      _.analyser = audioContext.createAnalyser();
      _.mute = audioContext.createGain();

      _.buffer.getChannelData(0).set([ -1, -1 / 3, 1 / 3, 1 ]);

      _.bufSrc.buffer = _.buffer;
      _.bufSrc.loop = true;
      _.bufSrc.start(audioContext.currentTime);

      _.analyser.fftSize = 32;
      _.mute.gain.value = 0;

      _.bufSrc.connect(_.analyser);
      _.analyser.connect(_.mute);
      _.mute.connect(audioContext.destination);
    });

    function expect(fn, callback) {
      var array = new Float32Array(32);

      function ready() {
        _.analyser.getFloatTimeDomainData(array);

        if (array[0] === 0) {
          return setTimeout(ready, 0);
        }

        setTimeout(test, 0);
      }

      function test() {
        fn(array);

        callback();
      }

      ready();
    }

    after(function() {
      _.bufSrc.stop(audioContext.currentTime);
      _.bufSrc.disconnect();
      _.analyser.disconnect();
      _.mute.disconnect();
      _ = null;
    });

    describe("(array: Float32Array): void", function() {
      it("should copy the current time-domain (waveform) data into the passed floating-point array", function(done) {
        expect(function(array) {
          assert(array[0] !== array[1]);
          assert(array[1] !== array[2]);
          assert(array[2] !== array[3]);
          assert(array[0] === array[4]);
        }, done);
      });
    });
  });
})();
