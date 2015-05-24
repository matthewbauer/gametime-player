window.onload = function() {
  try {
    var startTime = Date.now();

    // Skip "?loadSettings=".
    var loadSettings = JSON.parse(decodeURIComponent(location.search.substr(14)));

    require('coffee-script').register();

    window.loadSettings = loadSettings;

    require(loadSettings.bootstrapScript);
  }
  catch (error) {
    var currentWindow = require('remote').getCurrentWindow();
    currentWindow.setSize(800, 600);
    currentWindow.center();
    currentWindow.show();
    currentWindow.openDevTools();

    console.error(error.stack || error);
  }
};
