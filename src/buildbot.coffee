fs = require('fs')
request = require('request')
unzip = require('unzip')

getURL = (filename) ->
  baseurl = 'http://buildbot.libretro.com/'
  if process.platform == 'win32'
    if process.arch == 'ia32'
      baseurl += 'nightly/win-x86/latest'
    else if process.arch == 'x64'
      baseurl += 'nightly/win-x86_64/latest'
  else if process.platform == 'darwin'
    if process.arch == 'ia32'
      baseurl += 'nightly/osx-i386/latest'
    else if process.arch == 'x64'
      baseurl += 'nightly/osx-x86_64/latest'
  else if process.platform == 'linux'
    baseurl += 'nightly/linux/x86_64/latest'
  baseurl += '/' + filename
  baseurl += '.zip'
  baseurl

exports.getCore = (core, cb) ->
  filename = core
  if process.platform == 'win32'
    filename += '.dll'
  else
    filename += '.dylib'
  if !fs.existsSync('.cores')
    fs.mkdirSync '.cores'
  path = '.cores/' + filename
  if fs.existsSync(path)
    cb path
    return
  request(getURL(filename)).pipe(unzip.Parse()).on 'entry', (entry) ->
    if entry.type == 'File' and entry.path == filename
      entry.pipe(fs.createWriteStream(path)).on 'close', ->
        cb path
    else
      entry.autodrain()
