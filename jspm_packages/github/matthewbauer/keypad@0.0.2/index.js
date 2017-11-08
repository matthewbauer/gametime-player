export default class {
  constructor (win, keys) {
    this.keys = keys
    this.win = win
    this.id = 'keypad'
    this.mapping = 'standard'

    this.buttons = []
    for (var key in this.keys) {
      this.buttons[this.keys[key]] = {pressed: false}
    }

    this.onkey = function (event) {
      if (event.which in this.keys) {
        let pressed
        if (event.type === 'keyup') {
          pressed = false
        } else if (event.type === 'keydown') {
          pressed = true
        }
        this.buttons[this.keys[event.which]].pressed = pressed
        this.timestamp = event.timeStamp
        event.preventDefault()
      }
    }.bind(this)

    this.connect()
  }

  connect () {
    this.connected = true
    this.win.addEventListener('keydown', this.onkey)
    this.win.addEventListener('keyup', this.onkey)
  }

  disconnect () {
    this.connected = false
    this.win.removeEventListener('keydown', this.onkey)
    this.win.removeEventListener('keyup', this.onkey)
  }
}
