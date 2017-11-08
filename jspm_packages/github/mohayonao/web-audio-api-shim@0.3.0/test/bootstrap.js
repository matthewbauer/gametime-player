/* */ 
(function() {
  "use strict";

  global.assert = function(value, message) {
    if (!value) {
      throw new Error(message);
    }
  };
  global.assert.throws = function(block, expected, message) {
    var actual;

    try {
      block();
    } catch (e) {
      actual = e;
    }

    if (actual instanceof expected) {
      return;
    }

    throw new Error(message);
  };

  global.audioContext = new global.AudioContext();
})();
