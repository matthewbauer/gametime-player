/* */ 
var types = require('./types');
var NodePath = require('./node-path');
var Printable = types.namedTypes.Printable;
var isArray = types.builtInTypes.array;
var isObject = types.builtInTypes.object;
var isFunction = types.builtInTypes.function;
var hasOwn = Object.prototype.hasOwnProperty;
var undefined;
function PathVisitor() {
  if (!(this instanceof PathVisitor)) {
    throw new Error("PathVisitor constructor cannot be invoked without 'new'");
  }
  this._reusableContextStack = [];
  this._methodNameTable = computeMethodNameTable(this);
  this._shouldVisitComments = hasOwn.call(this._methodNameTable, "Block") || hasOwn.call(this._methodNameTable, "Line");
  this.Context = makeContextConstructor(this);
  this._visiting = false;
  this._changeReported = false;
}
function computeMethodNameTable(visitor) {
  var typeNames = Object.create(null);
  for (var methodName in visitor) {
    if (/^visit[A-Z]/.test(methodName)) {
      typeNames[methodName.slice("visit".length)] = true;
    }
  }
  var supertypeTable = types.computeSupertypeLookupTable(typeNames);
  var methodNameTable = Object.create(null);
  var typeNames = Object.keys(supertypeTable);
  var typeNameCount = typeNames.length;
  for (var i = 0; i < typeNameCount; ++i) {
    var typeName = typeNames[i];
    methodName = "visit" + supertypeTable[typeName];
    if (isFunction.check(visitor[methodName])) {
      methodNameTable[typeName] = methodName;
    }
  }
  return methodNameTable;
}
PathVisitor.fromMethodsObject = function fromMethodsObject(methods) {
  if (methods instanceof PathVisitor) {
    return methods;
  }
  if (!isObject.check(methods)) {
    return new PathVisitor;
  }
  function Visitor() {
    if (!(this instanceof Visitor)) {
      throw new Error("Visitor constructor cannot be invoked without 'new'");
    }
    PathVisitor.call(this);
  }
  var Vp = Visitor.prototype = Object.create(PVp);
  Vp.constructor = Visitor;
  extend(Vp, methods);
  extend(Visitor, PathVisitor);
  isFunction.assert(Visitor.fromMethodsObject);
  isFunction.assert(Visitor.visit);
  return new Visitor;
};
function extend(target, source) {
  for (var property in source) {
    if (hasOwn.call(source, property)) {
      target[property] = source[property];
    }
  }
  return target;
}
PathVisitor.visit = function visit(node, methods) {
  return PathVisitor.fromMethodsObject(methods).visit(node);
};
var PVp = PathVisitor.prototype;
PVp.visit = function() {
  if (this._visiting) {
    throw new Error("Recursively calling visitor.visit(path) resets visitor state. " + "Try this.visit(path) or this.traverse(path) instead.");
  }
  this._visiting = true;
  this._changeReported = false;
  this._abortRequested = false;
  var argc = arguments.length;
  var args = new Array(argc);
  for (var i = 0; i < argc; ++i) {
    args[i] = arguments[i];
  }
  if (!(args[0] instanceof NodePath)) {
    args[0] = new NodePath({root: args[0]}).get("root");
  }
  this.reset.apply(this, args);
  try {
    var root = this.visitWithoutReset(args[0]);
    var didNotThrow = true;
  } finally {
    this._visiting = false;
    if (!didNotThrow && this._abortRequested) {
      return args[0].value;
    }
  }
  return root;
};
PVp.AbortRequest = function AbortRequest() {};
PVp.abort = function() {
  var visitor = this;
  visitor._abortRequested = true;
  var request = new visitor.AbortRequest();
  request.cancel = function() {
    visitor._abortRequested = false;
  };
  throw request;
};
PVp.reset = function(path) {};
PVp.visitWithoutReset = function(path) {
  if (this instanceof this.Context) {
    return this.visitor.visitWithoutReset(path);
  }
  if (!(path instanceof NodePath)) {
    throw new Error("");
  }
  var value = path.value;
  var methodName = value && typeof value === "object" && typeof value.type === "string" && this._methodNameTable[value.type];
  if (methodName) {
    var context = this.acquireContext(path);
    try {
      return context.invokeVisitorMethod(methodName);
    } finally {
      this.releaseContext(context);
    }
  } else {
    return visitChildren(path, this);
  }
};
function visitChildren(path, visitor) {
  if (!(path instanceof NodePath)) {
    throw new Error("");
  }
  if (!(visitor instanceof PathVisitor)) {
    throw new Error("");
  }
  var value = path.value;
  if (isArray.check(value)) {
    path.each(visitor.visitWithoutReset, visitor);
  } else if (!isObject.check(value)) {} else {
    var childNames = types.getFieldNames(value);
    if (visitor._shouldVisitComments && value.comments && childNames.indexOf("comments") < 0) {
      childNames.push("comments");
    }
    var childCount = childNames.length;
    var childPaths = [];
    for (var i = 0; i < childCount; ++i) {
      var childName = childNames[i];
      if (!hasOwn.call(value, childName)) {
        value[childName] = types.getFieldValue(value, childName);
      }
      childPaths.push(path.get(childName));
    }
    for (var i = 0; i < childCount; ++i) {
      visitor.visitWithoutReset(childPaths[i]);
    }
  }
  return path.value;
}
PVp.acquireContext = function(path) {
  if (this._reusableContextStack.length === 0) {
    return new this.Context(path);
  }
  return this._reusableContextStack.pop().reset(path);
};
PVp.releaseContext = function(context) {
  if (!(context instanceof this.Context)) {
    throw new Error("");
  }
  this._reusableContextStack.push(context);
  context.currentPath = null;
};
PVp.reportChanged = function() {
  this._changeReported = true;
};
PVp.wasChangeReported = function() {
  return this._changeReported;
};
function makeContextConstructor(visitor) {
  function Context(path) {
    if (!(this instanceof Context)) {
      throw new Error("");
    }
    if (!(this instanceof PathVisitor)) {
      throw new Error("");
    }
    if (!(path instanceof NodePath)) {
      throw new Error("");
    }
    Object.defineProperty(this, "visitor", {
      value: visitor,
      writable: false,
      enumerable: true,
      configurable: false
    });
    this.currentPath = path;
    this.needToCallTraverse = true;
    Object.seal(this);
  }
  if (!(visitor instanceof PathVisitor)) {
    throw new Error("");
  }
  var Cp = Context.prototype = Object.create(visitor);
  Cp.constructor = Context;
  extend(Cp, sharedContextProtoMethods);
  return Context;
}
var sharedContextProtoMethods = Object.create(null);
sharedContextProtoMethods.reset = function reset(path) {
  if (!(this instanceof this.Context)) {
    throw new Error("");
  }
  if (!(path instanceof NodePath)) {
    throw new Error("");
  }
  this.currentPath = path;
  this.needToCallTraverse = true;
  return this;
};
sharedContextProtoMethods.invokeVisitorMethod = function invokeVisitorMethod(methodName) {
  if (!(this instanceof this.Context)) {
    throw new Error("");
  }
  if (!(this.currentPath instanceof NodePath)) {
    throw new Error("");
  }
  var result = this.visitor[methodName].call(this, this.currentPath);
  if (result === false) {
    this.needToCallTraverse = false;
  } else if (result !== undefined) {
    this.currentPath = this.currentPath.replace(result)[0];
    if (this.needToCallTraverse) {
      this.traverse(this.currentPath);
    }
  }
  if (this.needToCallTraverse !== false) {
    throw new Error("Must either call this.traverse or return false in " + methodName);
  }
  var path = this.currentPath;
  return path && path.value;
};
sharedContextProtoMethods.traverse = function traverse(path, newVisitor) {
  if (!(this instanceof this.Context)) {
    throw new Error("");
  }
  if (!(path instanceof NodePath)) {
    throw new Error("");
  }
  if (!(this.currentPath instanceof NodePath)) {
    throw new Error("");
  }
  this.needToCallTraverse = false;
  return visitChildren(path, PathVisitor.fromMethodsObject(newVisitor || this.visitor));
};
sharedContextProtoMethods.visit = function visit(path, newVisitor) {
  if (!(this instanceof this.Context)) {
    throw new Error("");
  }
  if (!(path instanceof NodePath)) {
    throw new Error("");
  }
  if (!(this.currentPath instanceof NodePath)) {
    throw new Error("");
  }
  this.needToCallTraverse = false;
  return PathVisitor.fromMethodsObject(newVisitor || this.visitor).visitWithoutReset(path);
};
sharedContextProtoMethods.reportChanged = function reportChanged() {
  this.visitor.reportChanged();
};
sharedContextProtoMethods.abort = function abort() {
  this.needToCallTraverse = false;
  this.visitor.abort();
};
module.exports = PathVisitor;
