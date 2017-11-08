/* */ 
var types = require('./types');
var Type = types.Type;
var builtin = types.builtInTypes;
var isNumber = builtin.number;
exports.geq = function(than) {
  return new Type(function(value) {
    return isNumber.check(value) && value >= than;
  }, isNumber + " >= " + than);
};
exports.defaults = {
  "null": function() {
    return null;
  },
  "emptyArray": function() {
    return [];
  },
  "false": function() {
    return false;
  },
  "true": function() {
    return true;
  },
  "undefined": function() {}
};
var naiveIsPrimitive = Type.or(builtin.string, builtin.number, builtin.boolean, builtin.null, builtin.undefined);
exports.isPrimitive = new Type(function(value) {
  if (value === null)
    return true;
  var type = typeof value;
  return !(type === "object" || type === "function");
}, naiveIsPrimitive.toString());
