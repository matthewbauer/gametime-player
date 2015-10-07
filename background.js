function newWindow() {
  return new Promise(function(resolve, reject) {
    chrome.app.window.create('index.html', {}, resolve)
  })
}

function launch(file) {
  return new Promise(function(resolve, reject) {
    file.entry.file(resolve, reject)
  }).then(function(blob) {
    return newWindow().then(function(w) {
      w.contentWindow.filename = blob.name
      w.contentWindow.url = URL.createObjectURL(blob)
    })
  })
}

chrome.app.runtime.onLaunched.addListener(function(launchData) {
  if (launchData.items)
    launchData.items.forEach(launch)
  else
    newWindow()
})
