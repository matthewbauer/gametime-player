/* */ 
(function() {
  "use strict";

  describe("AudioContext.prototype.decodeAudioData", function() {
    function validAudioData() {
      return new Uint8Array([
        0x52, 0x49, 0x46, 0x46,
        0x30, 0x00, 0x00, 0x00,
        0x57, 0x41, 0x56, 0x45,
        0x66, 0x6d, 0x74, 0x20,
        0x10, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x02, 0x00,
        0x44, 0xac, 0x00, 0x00,
        0x10, 0xb1, 0x02, 0x00,
        0x04, 0x00, 0x10, 0x00,
        0x64, 0x61, 0x74, 0x61,
        0x08, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
      ]).buffer;
    }

    function invalidAudioData() {
      return new Uint32Array(64).buffer;
    }

    describe("(validAudioData: ArrayBuffer): Promise<AudioBuffer>", function() {
      it("should resolve with an AudioBuffer", function() {
        var promise = audioContext.decodeAudioData(validAudioData());

        assert(promise instanceof Promise, "should return a Promise");

        return promise.then(function(audioBuffer) {
          assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");
        });
      });
    });
    describe("(invalidAudioData: ArrayBuffer): Promise<AudioBuffer>", function() {
      it("should reject", function() {
        var promise = audioContext.decodeAudioData(invalidAudioData());

        assert(promise instanceof Promise, "should return a Promise");

        return promise.then(function() {
          throw new Error("NOT REACHED");
        }, function() {
          assert(true);
        });
      });
    });
    describe("(validAudioData: ArrayBuffer, successCallback: function): Promise<AudioBuffer>", function() {
      it("should call the successCallback with an AudioBuffer", function(done) {
        var promise = audioContext.decodeAudioData(validAudioData(), successCallback);

        function successCallback(audioBuffer) {
          assert(audioBuffer instanceof global.AudioBuffer, "should reject with an AudioBuffer");
          done();
        }

        assert(promise instanceof Promise, "should return a Promise");
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("should call the errorCallback", function(done) {
        var promise = audioContext.decodeAudioData(invalidAudioData(), successCallback, errorCallback);

        function successCallback() {
          throw new Error("NOT REACHED");
        }

        function errorCallback() {
          done();
        }

        assert(promise instanceof Promise, "should return a Promise");
      });
    });
  });
})();
