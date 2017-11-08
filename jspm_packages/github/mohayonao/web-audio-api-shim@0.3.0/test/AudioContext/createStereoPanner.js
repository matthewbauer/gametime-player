/* */ 
(function() {
  "use strict";

  describe("AudioContext.prototype.createStereoPanner", function() {
    describe("(): AudioNode", function() {
      it("should return an AudioNode as StereoPannerNode", function() {
        var node = audioContext.createStereoPanner();

        assert(node instanceof global.AudioNode);
        assert(node.pan instanceof global.AudioParam);
      });
    });
  });
})();
