module.exports = class coffeeTest
  constructor: (@message) ->
  go: (count) ->
    console.log 'go'
    out = ""
    for i in [1..count]
      out += "#{@message} #{i}! "
    return out