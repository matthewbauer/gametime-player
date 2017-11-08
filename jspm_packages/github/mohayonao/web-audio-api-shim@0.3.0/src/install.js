/* */ 
"format global";
export default function install(stage = Infinity) {
  if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
    global.AudioContext = global.webkitAudioContext;
  }
  if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
    global.OfflineAudioContext = global.webkitOfflineAudioContext;
  }

  if (!global.AudioContext) {
    return;
  }

  require("./AnalyserNode").install(stage);
  require("./AudioBuffer").install(stage);
  require("./AudioNode").install(stage);
  require("./AudioContext").install(stage);
}
