var Builder = require('systemjs-builder')

var builder = new Builder()
builder.loadConfig('./config.js').then(function () {
  return builder.buildSFX('./index.js', 'index.min.js', {
    minify: true
  })
})
.then(function () {
  console.log('Build complete')
})
.catch(function (err) {
  console.log('Build error')
  console.log(err)
})
