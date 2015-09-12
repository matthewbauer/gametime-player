var wd = require('wd')
var _ = require('lodash')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()
chaiAsPromised.transferPromiseness = wd.transferPromiseness

wd.configureHttp({
  timeout: 60000,
  retryDelay: 15000,
  retries: 5
})

var browserName = process.env.BROWSER || 'chrome';

describe(browserName, function() {
  this.timeout(60000)
  var browser
  var allPassed = true

  after(function(done) {
    browser
      .quit()
      .sauceJobStatus(allPassed)
      .nodeify(done)
  })

  before(function(done) {
    var username = process.env.SAUCE_USERNAME
    var accessKey = process.env.SAUCE_ACCESS_KEY
    browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey)
    browser
      .init({
        browserName: browserName
      })
      .nodeify(done)
  })

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed')
    done()
  })

  it('page has correct title', function(done) {
    browser
      .get('http://localhost:8080/')
      .title()
      .should.become('gametime-player')
      .nodeify(done)
  })

  it('file is uploadable', function(done) {
    browser
      .get('http://localhost:8080/')
      .elementById('chooser')
      .sendKeys('./roms/Super Mario All-Stars (USA).sfc')
      .elementsByTagName('canvas')
      .should.exist
      .nodeify(done)
  })
})
