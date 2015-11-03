module.exports.getExtension = function(filename) {
  var parts = filename.split('.')
  extension = parts[parts.length - 1]
  extension = extension.toLowerCase()
  return extension
}
