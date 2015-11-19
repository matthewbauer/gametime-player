#!/usr/bin/env node

var fs = require('fs')
var ini = require('ini')
var path = require('path')

var filename = process.argv[2]

var overlays = ini.parse(fs.readFileSync(filename, 'utf-8'))
var buttons = []

var i = 0
for (var j = 0; j < overlays['overlay' + i + '_descs']; j++) {
  var button = {}
  var data = overlays['overlay' + i + '_desc' + j].split(',')
  var id = {
    "left": 14,
    "right": 15,
    "up": 12,
    "down": 13,
    "start": 9,
    "select": 8,
    "a": 0,
    "b": 1,
    "l": 4,
    "r": 5,
    "x": 2,
    "y": 3
  }[data[0]]
  if (id) {
    button.id = id
  }
  button.x = parseFloat(data[1])
  button.y = parseFloat(data[2])
  button.circle = data[3] === 'radial'
  button.width = parseFloat(data[4])
  button.height = parseFloat(data[5])
  if (overlays['overlay' + i + '_desc' + j + '_overlay']) {
    button.src = overlays['overlay' + i + '_desc' + j + '_overlay']
  }
  buttons.push(button)
}

fs.writeFileSync(path.join(path.dirname(filename), 'index.json'), JSON.stringify(buttons, null, '  '))
