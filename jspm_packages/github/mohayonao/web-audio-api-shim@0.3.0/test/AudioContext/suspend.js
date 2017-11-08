/* */ 
(function() {
  "use strict";

  describe("AudioContext.prototype.suspend", function() {
    describe.skip("(): Promise<void>", function() {
      it("should resolve", function() {
      });
    });
  });

  describe("OfflineAudioContext.prototype.suspend", function() {
    describe("(): Promise<void>", function() {
      it("should reject", function() {
        var audioContext = new global.OfflineAudioContext(1, 100, 44100);

        return audioContext.suspend().catch(function(e) {
          assert(e instanceof Error);
        });
      });
    });
  });
})();
