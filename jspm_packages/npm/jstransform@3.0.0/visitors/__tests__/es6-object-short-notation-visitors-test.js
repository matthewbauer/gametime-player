/* */ 
require('mock-modules').autoMockOff();
describe('es6-object-short-notation-visitors', function() {
  var transformFn;
  var visitors;
  beforeEach(function() {
    require('mock-modules').dumpCache();
    visitors = require('../es6-object-short-notation-visitors').visitorList;
    transformFn = require('../../jstransform').transform;
  });
  function transform(code) {
    return transformFn(visitors, code).code;
  }
  function expectTransform(code, result) {
    expect(transform(code)).toEqual(result);
  }
  it('should transform short notation and return 5', function() {
    var code = transform(['(function(x, y) {', '  var data = {x, y};', '  return data.x + data.y;', '})(2, 3);'].join('\n'));
    expect(eval(code)).toEqual(5);
  });
  it('should transform simple short notation', function() {
    expectTransform('function foo(x, y) { return {x, y}; }', 'function foo(x, y) { return {x:x, y:y}; }');
    expectTransform(['function init({name, points: [{x, y}, {z, q}]}) {', '  return function([{data: {value, score}}]) {', '    return {z, q, score, name};', '  };', '}'].join('\n'), ['function init({name:name, points: [{x:x, y:y}, {z:z, q:q}]}) {', '  return function([{data: {value:value, score:score}}]) {', '    return {z:z, q:q, score:score, name:name};', '  };', '}'].join('\n'));
    expectTransform(['function', '', 'foo    ({', '    x,', '          y', '', '})', '', '        {', ' return         {', '          x,', '  y};', '}'].join('\n'), ['function', '', 'foo    ({', '    x:x,', '          y:y', '', '})', '', '        {', ' return         {', '          x:x,', '  y:y};', '}'].join('\n'));
  });
});
