/* */ 
'use strict';
var base62 = require('base62');
var Syntax = require('esprima-fb').Syntax;
var utils = require('../src/utils');
var SUPER_PROTO_IDENT_PREFIX = '____SuperProtoOf';
var _anonClassUUIDCounter = 0;
var _mungedSymbolMaps = {};
function _generateAnonymousClassName(state) {
  var mungeNamespace = state.mungeNamespace || '';
  return '____Class' + mungeNamespace + base62.encode(_anonClassUUIDCounter++);
}
function _getMungedName(identName, state) {
  var mungeNamespace = state.mungeNamespace;
  var shouldMinify = state.g.opts.minify;
  if (shouldMinify) {
    if (!_mungedSymbolMaps[mungeNamespace]) {
      _mungedSymbolMaps[mungeNamespace] = {
        symbolMap: {},
        identUUIDCounter: 0
      };
    }
    var symbolMap = _mungedSymbolMaps[mungeNamespace].symbolMap;
    if (!symbolMap[identName]) {
      symbolMap[identName] = base62.encode(_mungedSymbolMaps[mungeNamespace].identUUIDCounter++);
    }
    identName = symbolMap[identName];
  }
  return '$' + mungeNamespace + identName;
}
function _getSuperClassInfo(node, state) {
  var ret = {
    name: null,
    expression: null
  };
  if (node.superClass) {
    if (node.superClass.type === Syntax.Identifier) {
      ret.name = node.superClass.name;
    } else {
      ret.name = _generateAnonymousClassName(state);
      ret.expression = state.g.source.substring(node.superClass.range[0], node.superClass.range[1]);
    }
  }
  return ret;
}
function _isConstructorMethod(classElement) {
  return classElement.type === Syntax.MethodDefinition && classElement.key.type === Syntax.Identifier && classElement.key.name === 'constructor';
}
function _shouldMungeIdentifier(node, state) {
  return (!!state.methodFuncNode && !utils.getDocblock(state).hasOwnProperty('preventMunge') && /^_(?!_)/.test(node.name));
}
function visitClassMethod(traverse, node, path, state) {
  utils.catchup(node.range[0], state);
  path.unshift(node);
  traverse(node.value, path, state);
  path.shift();
  return false;
}
visitClassMethod.test = function(node, path, state) {
  return node.type === Syntax.MethodDefinition;
};
function visitClassFunctionExpression(traverse, node, path, state) {
  var methodNode = path[0];
  state = utils.updateState(state, {methodFuncNode: node});
  if (methodNode.key.name === 'constructor') {
    utils.append('function ' + state.className, state);
  } else {
    var methodName = methodNode.key.name;
    if (_shouldMungeIdentifier(methodNode.key, state)) {
      methodName = _getMungedName(methodName, state);
    }
    var prototypeOrStatic = methodNode.static ? '' : 'prototype.';
    utils.append(state.className + '.' + prototypeOrStatic + methodName + '=function', state);
  }
  utils.move(methodNode.key.range[1], state);
  var params = node.params;
  var paramName;
  if (params.length > 0) {
    for (var i = 0; i < params.length; i++) {
      utils.catchup(node.params[i].range[0], state);
      paramName = params[i].name;
      if (_shouldMungeIdentifier(params[i], state)) {
        paramName = _getMungedName(params[i].name, state);
      }
      utils.append(paramName, state);
      utils.move(params[i].range[1], state);
    }
  } else {
    utils.append('(', state);
  }
  utils.append(')', state);
  utils.catchupWhiteSpace(node.body.range[0], state);
  utils.append('{', state);
  if (!state.scopeIsStrict) {
    utils.append('"use strict";', state);
  }
  utils.move(node.body.range[0] + '{'.length, state);
  path.unshift(node);
  traverse(node.body, path, state);
  path.shift();
  utils.catchup(node.body.range[1], state);
  if (methodNode.key.name !== 'constructor') {
    utils.append(';', state);
  }
  return false;
}
visitClassFunctionExpression.test = function(node, path, state) {
  return node.type === Syntax.FunctionExpression && path[0].type === Syntax.MethodDefinition;
};
function _renderClassBody(traverse, node, path, state) {
  var className = state.className;
  var superClass = state.superClass;
  if (superClass.name) {
    if (superClass.expression !== null) {
      utils.append('var ' + superClass.name + '=' + superClass.expression + ';', state);
    }
    var keyName = superClass.name + '____Key';
    var keyNameDeclarator = '';
    if (!utils.identWithinLexicalScope(keyName, state)) {
      keyNameDeclarator = 'var ';
      utils.declareIdentInLocalScope(keyName, state);
    }
    utils.append('for(' + keyNameDeclarator + keyName + ' in ' + superClass.name + '){' + 'if(' + superClass.name + '.hasOwnProperty(' + keyName + ')){' + className + '[' + keyName + ']=' + superClass.name + '[' + keyName + '];' + '}' + '}', state);
    var superProtoIdentStr = SUPER_PROTO_IDENT_PREFIX + superClass.name;
    if (!utils.identWithinLexicalScope(superProtoIdentStr, state)) {
      utils.append('var ' + superProtoIdentStr + '=' + superClass.name + '===null?' + 'null:' + superClass.name + '.prototype;', state);
      utils.declareIdentInLocalScope(superProtoIdentStr, state);
    }
    utils.append(className + '.prototype=Object.create(' + superProtoIdentStr + ');', state);
    utils.append(className + '.prototype.constructor=' + className + ';', state);
    utils.append(className + '.__superConstructor__=' + superClass.name + ';', state);
  }
  if (!node.body.body.filter(_isConstructorMethod).pop()) {
    utils.append('function ' + className + '(){', state);
    if (!state.scopeIsStrict) {
      utils.append('"use strict";', state);
    }
    if (superClass.name) {
      utils.append('if(' + superClass.name + '!==null){' + superClass.name + '.apply(this,arguments);}', state);
    }
    utils.append('}', state);
  }
  utils.move(node.body.range[0] + '{'.length, state);
  traverse(node.body, path, state);
  utils.catchupWhiteSpace(node.range[1], state);
}
function visitClassDeclaration(traverse, node, path, state) {
  var className = node.id.name;
  var superClass = _getSuperClassInfo(node, state);
  state = utils.updateState(state, {
    mungeNamespace: className,
    className: className,
    superClass: superClass
  });
  _renderClassBody(traverse, node, path, state);
  return false;
}
visitClassDeclaration.test = function(node, path, state) {
  return node.type === Syntax.ClassDeclaration;
};
function visitClassExpression(traverse, node, path, state) {
  var className = node.id && node.id.name || _generateAnonymousClassName(state);
  var superClass = _getSuperClassInfo(node, state);
  utils.append('(function(){', state);
  state = utils.updateState(state, {
    mungeNamespace: className,
    className: className,
    superClass: superClass
  });
  _renderClassBody(traverse, node, path, state);
  utils.append('return ' + className + ';})()', state);
  return false;
}
visitClassExpression.test = function(node, path, state) {
  return node.type === Syntax.ClassExpression;
};
function visitPrivateIdentifier(traverse, node, path, state) {
  utils.append(_getMungedName(node.name, state), state);
  utils.move(node.range[1], state);
}
visitPrivateIdentifier.test = function(node, path, state) {
  if (node.type === Syntax.Identifier && _shouldMungeIdentifier(node, state)) {
    if (path[0].type === Syntax.MemberExpression && path[0].object !== node && path[0].computed === false) {
      return true;
    }
    if (utils.identWithinLexicalScope(node.name, state, state.methodFuncNode)) {
      return true;
    }
    if (path[0].type === Syntax.Property && path[1].type === Syntax.ObjectExpression) {
      return true;
    }
    if (path[0].type === Syntax.FunctionExpression || path[0].type === Syntax.FunctionDeclaration) {
      for (var i = 0; i < path[0].params.length; i++) {
        if (path[0].params[i] === node) {
          return true;
        }
      }
    }
  }
  return false;
};
function visitSuperCallExpression(traverse, node, path, state) {
  var superClassName = state.superClass.name;
  if (node.callee.type === Syntax.Identifier) {
    utils.append(superClassName + '.call(', state);
    utils.move(node.callee.range[1], state);
  } else if (node.callee.type === Syntax.MemberExpression) {
    utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state);
    utils.move(node.callee.object.range[1], state);
    if (node.callee.computed) {
      utils.catchup(node.callee.property.range[1] + ']'.length, state);
    } else {
      utils.append('.' + node.callee.property.name, state);
    }
    utils.append('.call(', state);
    utils.move(node.callee.range[1], state);
  }
  utils.append('this', state);
  if (node.arguments.length > 0) {
    utils.append(',', state);
    utils.catchupWhiteSpace(node.arguments[0].range[0], state);
    traverse(node.arguments, path, state);
  }
  utils.catchupWhiteSpace(node.range[1], state);
  utils.append(')', state);
  return false;
}
visitSuperCallExpression.test = function(node, path, state) {
  if (state.superClass && node.type === Syntax.CallExpression) {
    var callee = node.callee;
    if (callee.type === Syntax.Identifier && callee.name === 'super' || callee.type == Syntax.MemberExpression && callee.object.name === 'super') {
      return true;
    }
  }
  return false;
};
function visitSuperMemberExpression(traverse, node, path, state) {
  var superClassName = state.superClass.name;
  utils.append(SUPER_PROTO_IDENT_PREFIX + superClassName, state);
  utils.move(node.object.range[1], state);
}
visitSuperMemberExpression.test = function(node, path, state) {
  return state.superClass && node.type === Syntax.MemberExpression && node.object.type === Syntax.Identifier && node.object.name === 'super';
};
exports.visitorList = [visitClassDeclaration, visitClassExpression, visitClassFunctionExpression, visitClassMethod, visitPrivateIdentifier, visitSuperCallExpression, visitSuperMemberExpression];
