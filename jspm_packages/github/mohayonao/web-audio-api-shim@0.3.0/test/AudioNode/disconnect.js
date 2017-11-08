/* */ 
(function() {
  "use strict";

  describe("AudioNode.prototype.disconnect", function() {
    var _ = null;

    // +--------------------+
    // | DC [ 0.125, 0.25 ] |
    // +--------------------+
    //   |
    // +---------------------------+
    // | ChannelSplitterNode       |
    // +---------------------------+
    //   | 0.125                 | 0.25
    //   +-------------+         |
    //   |             |         |
    //   |        +----|---------+
    //   |        |    |         |
    //   |        |    +-------->+
    //   |        |              | 0.375
    //   |        |            +-----------+
    //   +-------------+       | GainNode  |
    //   |        |    |       | gain: 0.5 |
    //   |        |    |       +-----------+
    //   |        |    |         | 0.1875
    //   +<-------|----|---------+
    //   | 0.3125 |    |         |
    //   |        +----|-------->+
    //   |        |    |         | 0.4375
    //   +<-------+    |         |
    //   | 0.5625      |         |
    //   |             +-------->+
    //   |                       | 0.5625
    // +---------------------------+
    // | ChannelMergerNode         |
    // +---------------------------+
    //   | 0.5625                | 0.5625
    beforeEach(function() {
      var srcBuffer = audioContext.createBuffer(2, 2, audioContext.sampleRate);
      var trigBuffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);

      _ = {};

      srcBuffer.getChannelData(0).set([ 0.125, 0.125 ]);
      srcBuffer.getChannelData(1).set([ 0.250, 0.250 ]);
      trigBuffer.getChannelData(0).set([ 0, 0 ]);

      _.bufSrc = audioContext.createBufferSource();
      _.splitter = audioContext.createChannelSplitter(2);
      _.gain = audioContext.createGain();
      _.merger = audioContext.createChannelMerger(2);
      _.trigSrc = audioContext.createBufferSource();
      _.analyser = audioContext.createAnalyser();
      _.mute = audioContext.createGain();

      _.bufSrc.loop = true;
      _.bufSrc.buffer = srcBuffer;
      _.bufSrc.start(audioContext.currentTime);
      _.gain.gain.value = 0.5;
      _.trigSrc.loop = true;
      _.trigSrc.buffer = trigBuffer;
      _.trigSrc.start(audioContext.currentTime);
      _.analyser.fftSize = 32;
      _.mute.gain.value = 0;

      _.bufSrc.connect(_.splitter);
      _.splitter.connect(_.merger, 0, 0);
      _.splitter.connect(_.merger, 0, 1);
      _.splitter.connect(_.merger, 1, 0);
      _.splitter.connect(_.merger, 1, 1);
      _.splitter.connect(_.gain, 0, 0);
      _.splitter.connect(_.gain, 1, 0);
      _.gain.connect(_.merger, 0, 0);
      _.gain.connect(_.merger, 0, 1);
      _.merger.connect(_.analyser);
      _.trigSrc.connect(_.analyser);
      _.analyser.connect(_.mute);
      _.mute.connect(audioContext.destination);
    });

    function expect(fn, expected, callback) {
      var array = new Uint8Array(_.analyser.fftSize);
      var y = null;

      function byte2float(x) {
        return (x - 128) * 0.0078125;
      }

      function ready() {
        var x;

        _.analyser.getByteTimeDomainData(array);

        x = byte2float(array[0]);

        if (x === 0) {
          return setTimeout(ready, 0);
        }

        fn(_);

        y = x;

        setTimeout(test, 0);
      }

      function test() {
        var x;

        _.analyser.getByteTimeDomainData(array);

        x = byte2float(array[0]);

        if (x === y) {
          return setTimeout(test, 0);
        }

        assert(x === expected);

        callback();
      }

      ready();
    }

    afterEach(function() {
      _.bufSrc.stop(audioContext.currentTime);
      _.bufSrc.disconnect();
      _.splitter.disconnect();
      _.gain.disconnect();
      _.merger.disconnect();
      _.trigSrc.stop(audioContext.currentTime);
      _.trigSrc.disconnect();
      _.analyser.disconnect();
      _.mute.disconnect();
      _ = null;
    });

    describe("(): void", function() {
      // +--------------------+
      // | DC [ 0.125, 0.25 ] |
      // +--------------------+
      //   |
      // +---------------------------+
      // | ChannelSplitterNode       |
      // +---------------------------+
      //   | 0.125                 | 0.25
      // ============================= disconnect
      //
      //                         +-----------+
      //                         | GainNode  |
      //                         | gain: 0.5 |
      //                         +-----------+
      //                           | 0
      //   +-----------------------+
      //   |                       |
      // +---------------------------+
      // | ChannelMergerNode         |
      // +---------------------------+
      //   | 0                     | 0
      it("should disconnect all connections", function(done) {
        expect(function(_) {
          _.splitter.disconnect();
        }, 0, done);
      });
    });
    describe("(output: number): void", function() {
      // +--------------------+
      // | DC [ 0.125, 0.25 ] |
      // +--------------------+
      //   |
      // +---------------------------+
      // | ChannelSplitterNode       |
      // +---------------------------+
      //   | 0.125                 | 0.25
      //   |                     ===== disconnect
      //   |
      //   +---------------------->+
      //   |                       | 0.125
      //   |                     +-----------+
      //   +-------------+       | GainNode  |
      //   |             |       | gain: 0.5 |
      //   |             |       +-----------+
      //   |             |         | 0.0625
      //   +<------------|---------+
      //   | 0.1875      |         |
      //   |             |         |
      //   |             +-------->+
      //   |                       | 0.1875
      // +---------------------------+
      // | ChannelMergerNode         |
      // +---------------------------+
      //   | 0.1875                | 0.1875
      it("should disconnect the specified output connections", function(done) {
        expect(function(_) {
          _.splitter.disconnect(1);
        }, 0.1875, done);
      });
    });
    describe("(destination: AudioNode|AudioParam): void", function() {
      // +--------------------+
      // | DC [ 0.125, 0.25 ] |
      // +--------------------+
      //   |
      // +---------------------------+
      // | ChannelSplitterNode       |
      // +---------------------------+
      //   | 0.125                 | 0.25
      //   +-------------+         |
      //   |             |         |
      //   |        +----|---------+
      //   |        |    |         |
      //   |        |    +-------->+
      //   |        |              | 0.375
      // ==============          +-----------+
      //   disconnect            | GainNode  |
      //                         | gain: 0.5 |
      //                         +-----------+
      //                           | 0.1875
      //   +<----------------------+
      //   |                       | 0.1875
      // +---------------------------+
      // | ChannelMergerNode         |
      // +---------------------------+
      //   | 0.1875                | 0.1875
      it("should disconnect all connections which connect to the destination", function(done) {
        expect(function(_) {
          _.splitter.disconnect(_.merger);
        }, 0.1875, done);
      });
      it("should throw an error when given destination is not connected", function() {
        var gain = audioContext.createGain();

        assert.throws(function() {
          gain.disconnect(audioContext.destination);
        }, Error, "should throw an error");
      });
    });
    describe("(destination: AudioNode|AudioParam, output: number): void", function() {
      // +--------------------+
      // | DC [ 0.125, 0.25 ] |
      // +--------------------+
      //   |
      // +---------------------------+
      // | ChannelSplitterNode       |
      // +---------------------------+
      //   | 0.125                 | 0.25
      //   +-------------+         |
      //   |             |         |
      //   |        +----|---------+
      //   |        |    |         |
      //   |        |    +-------->+
      //   |        |              | 0.375
      //   |        |            +-----------+
      //   +-------------+       | GainNode  |
      //   |        |    |       | gain: 0.5 |
      //   |        |    |       +-----------+
      //   |        |    |         | 0.1875
      //   +<-------|----|---------+
      //   | 0.3125 |    |         |
      //   |      =====  |         |
      //   |             |         |
      //   |             +-------->+
      //   |                       | 0.5625
      // +---------------------------+
      // | ChannelMergerNode         |
      // +---------------------------+
      //   | 0.3125                | 0.3125
      it("should disconnect the specified output connections which connect to the destination", function(done) {
        expect(function(_) {
          _.splitter.disconnect(_.merger, 1);
        }, 0.3125, done);
      });
    });
    describe("destination: AudioNode, output: number, input: numebr): void", function() {
      // +--------------------+
      // | DC [ 0.125, 0.25 ] |
      // +--------------------+
      //   |
      // +---------------------------+
      // | ChannelSplitterNode       |
      // +---------------------------+
      //   | 0.125                 | 0.25
      //   +-------------+         |
      //   |             |         |
      //   |        +----|---------+
      //   |        |    |         |
      //   |        |    +-------->+
      //   |        |              | 0.375
      //   |        |            +-----------+
      //   +-------------+       | GainNode  |
      //   |        |    |       | gain: 0.5 |
      //   |        |    |       +-----------+
      //   |        |    |         | 0.1875
      //   +<-------|----|---------+
      //   | 0.3125 |    |         |
      //   |        +----|----||   |
      //   |        |    |         |
      //   +<-------+    |         |
      //   | 0.5625      |         |
      //   |             +-------->+
      //   |                       | 0.3125
      // +---------------------------+
      // | ChannelMergerNode         |
      // +---------------------------+
      //   | 0.5625                | 0.3125
      it("should disconnect the specified output connections which connect to the destination input", function(done) {
        expect(function(_) {
          _.splitter.disconnect(_.merger, 1, 1);
        }, (0.5625 + 0.3125) / 2, done);
      });
    });
  });
})();
