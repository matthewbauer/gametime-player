var test = require('ava')
var utils = require('./utils')

var files = {
  'Pokemon Ruby.GBA': 'gba',
  'Pokemon Sapphire.GBA': 'gba',
  'new_Pokemon - Light Platinum.gba': 'gba',
  'Pokemon - Emerald Version (U) (1).gba': 'gba',
  'PokemonGold.gbc': 'gbc',
  'PokemonRed (2) (1).gbc': 'gbc'
}

test('testing file name detection', function(t) {
  for (var file in files) {
    t.is(files[file], utils.getExtension(file))
  }
  t.end()
})
