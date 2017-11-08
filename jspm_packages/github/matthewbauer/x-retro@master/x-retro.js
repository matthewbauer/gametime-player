/* */ 
"format esm";
import {AudioContext, HTMLCanvasElement} from 'window'
import {registerElement} from 'document'
import Player from './player.coffee!coffee'

let PlayerElement = Object.create(HTMLCanvasElement.prototype)

PlayerElement.inputs = []
PlayerElement.attachedCallback = function () {
  this.style['image-rendering'] = 'pixelated'
  this.style['background-color'] = 'black'
  if (this.hasAttribute('core')) {
    System.import(this.getAttribute('core')).then(function (core) {
      this.core = core
    }.bind(this)).then(function () {
      if (this.hasAttribute('src')) {
        return System.import(`${this.getAttribute('src')}!raw`).then(function (rom) {
          this.core.load_game(new Uint8Array(rom))
          if (this.hasAttribute('save')) {
            return System.import(`${this.getAttribute('save')}!raw`).then(function (save) {
              this.core.unserialize(save)
            }.bind(this))
          }
        }.bind(this))
      }
    }.bind(this)).then(function () {
      if (this.hasAttribute('autostart')) {
        this.start()
      }
    }.bind(this))
  }
}

Object.defineProperty(PlayerElement, 'core', {
  set: function (core) {
    this.player = new Player(this.getContext('webgl') || this.getContext('experimental-webgl'), new AudioContext(), this.inputs, core)
  },
  get: function () {
    return this.player.core
  }
})

// TODO: deprecate retro.game
Object.defineProperty(PlayerElement, 'game', {
  set: function (game) {
    this.player.game = game
    this.core.load_game(game)
  },
  get: function () {
    return this.player.game
  }
})

// TODO: deprecate retro.save
Object.defineProperty(PlayerElement, 'save', {
  set: function (data) {
    this.core.unserialize(data)
  },
  get: function () {
    return this.core.serialize()
  }
})

PlayerElement.start = function () {
  this.running = true
  this.player.start()
}

PlayerElement.stop = function () {
  this.running = false
  this.player.stop()
}

export default registerElement('x-retro', {
  prototype: PlayerElement,
  extends: 'canvas'
})
