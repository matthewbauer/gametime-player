function launch(file) {
  var p = new Promise(function(resolve, reject) {
    file.file(resolve, reject)
  })
  return p.then(function(blob) {
    var w = chrome.app.window.create('index.html')
    w.contentWindow.postMessage(JSON.stringify({
      filename: blob.name,
      url: URL.createObjectURL(blob)
    }), '*')
  })
}

chrome.app.runtime.onLaunched.addListener(function(launchData) {
  if (launchData.items)
    launchData.items.forEach(launch)
  else
    chrome.app.window.create('index.html')
})
