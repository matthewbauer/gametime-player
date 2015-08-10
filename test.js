var webdriver = require('selenium-webdriver')
var test = require('selenium-webdriver/testing')

test.describe('Open app', function () {
  test.it('should work', function () {
    var driver = new webdriver.Builder().forBrowser('firefox').build()
    driver.quit()
  })
})
