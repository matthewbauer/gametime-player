chromedriver = require 'chromedrive'
webdriver = require 'selenium-webdriver'
test = require('selenium-webdriver/testing')
expect = require('chai').expect

test.describe 'Open app', ->
  test.it 'should work', ->
    driver = new webdriver.Builder().build()
    driver.quit()
