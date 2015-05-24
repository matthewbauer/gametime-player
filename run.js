if (process.type === 'browser') {
  require('coffee-script/register');
  require('./src/main');
} else {
  var electron = require('electron-prebuilt');
  var child = require('child_process').spawn(electron, [__filename]);
}
