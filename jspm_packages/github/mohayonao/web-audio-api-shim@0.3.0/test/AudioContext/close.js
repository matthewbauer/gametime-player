/* */ 
(function() {
  "use strict";

  describe("AudioContext.prototype.close", function() {
    describe.skip("(): Promise<void>", function() {
      it("should resolve", function() {
      });
    });
  });

  describe("OfflineAudioContext.prototype.close", function() {
    describe("(): Promise<void>", function() {
      it("should reject", function() {
        var audioContext = new global.OfflineAudioContext(1, 100, 44100);

        return audioContext.close().catch(function(e) {
          assert(e instanceof Error);
        });
      });
    });
  });
})();
