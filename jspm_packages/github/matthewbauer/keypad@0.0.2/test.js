/* global it, describe */

import GamePad from './index'
import chai from 'chai'

describe('gamepad-key', function () {
  it('gamepad loads', function () {
    let gamepad = new GamePad(window, {
      37: 14,
      38: 12,
      39: 15,
      40: 13
    })
    chai.expect(gamepad.connected).to.equal(true)
    gamepad.disconnect()
    chai.expect(gamepad.connected).to.equal(false)
  })
})
