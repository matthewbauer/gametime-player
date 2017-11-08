/* */ 
(function() {
  "use strict";

  describe("OfflineAudioContext.prototype.startRendering", function() {
    describe("(): Promise<AudioBuffer>", function() {
      it("should resolve with an AudioBuffer", function() {
        var context = new global.OfflineAudioContext(1, 1, 44100);
        var promise = context.startRendering();

        assert(context.state === "running");
        assert(promise instanceof Promise, "should return a Promise");

        return promise.then(function(audioBuffer) {
          assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");

          assert(context.state === "closed");

          return context.startRendering().catch(function(e) {
            assert(e instanceof Error);
          });
        });
      });
    });
  });
})();
