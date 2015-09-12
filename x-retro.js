import {AudioContext, HTMLCanvasElement} from 'window'
import {registerElement} from 'document'
import Player from './player.coffee!'

let PlayerElement = Object.create(HTMLCanvasElement.prototype)

PlayerElement.inputs = []
PlayerElement.attachedCallback = function () {
  if (this.hasAttribute('core')) {
    System.import(this.getAttribute('core')).then(function (core) {
      this.core = core
    }.bind(this)).then(function () {
      if (this.hasAttribute('src')) {
        return System.import(`${this.getAttribute('src')}!raw`).then(function (rom) {
          this.game = new Uint8Array(rom)
          if (this.hasAttribute('save')) {
            return System.import(`${this.getAttribute('save')}!raw`).then(function (save) {
              this.save = save
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

Object.defineProperty(PlayerElement, 'game', {
  set: function (game) {
    this.player.game = game
    this.core.load_game(game)
  },
  get: function () {
    return this.player.game
  }
})

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
