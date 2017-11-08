/* */ 
var assert = require('assert');
var types = require('./types');
var getFieldValue = types.getFieldValue;
var n = types.namedTypes;
var sourceMap = require('source-map');
var SourceMapConsumer = sourceMap.SourceMapConsumer;
var SourceMapGenerator = sourceMap.SourceMapGenerator;
var hasOwn = Object.prototype.hasOwnProperty;
var util = exports;
function getUnionOfKeys() {
  var result = {};
  var argc = arguments.length;
  for (var i = 0; i < argc; ++i) {
    var keys = Object.keys(arguments[i]);
    var keyCount = keys.length;
    for (var j = 0; j < keyCount; ++j) {
      result[keys[j]] = true;
    }
  }
  return result;
}
util.getUnionOfKeys = getUnionOfKeys;
function comparePos(pos1, pos2) {
  return (pos1.line - pos2.line) || (pos1.column - pos2.column);
}
util.comparePos = comparePos;
function copyPos(pos) {
  return {
    line: pos.line,
    column: pos.column
  };
}
util.copyPos = copyPos;
util.composeSourceMaps = function(formerMap, latterMap) {
  if (formerMap) {
    if (!latterMap) {
      return formerMap;
    }
  } else {
    return latterMap || null;
  }
  var smcFormer = new SourceMapConsumer(formerMap);
  var smcLatter = new SourceMapConsumer(latterMap);
  var smg = new SourceMapGenerator({
    file: latterMap.file,
    sourceRoot: latterMap.sourceRoot
  });
  var sourcesToContents = {};
  smcLatter.eachMapping(function(mapping) {
    var origPos = smcFormer.originalPositionFor({
      line: mapping.originalLine,
      column: mapping.originalColumn
    });
    var sourceName = origPos.source;
    if (sourceName === null) {
      return;
    }
    smg.addMapping({
      source: sourceName,
      original: copyPos(origPos),
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      },
      name: mapping.name
    });
    var sourceContent = smcFormer.sourceContentFor(sourceName);
    if (sourceContent && !hasOwn.call(sourcesToContents, sourceName)) {
      sourcesToContents[sourceName] = sourceContent;
      smg.setSourceContent(sourceName, sourceContent);
    }
  });
  return smg.toJSON();
};
util.getTrueLoc = function(node, lines) {
  if (!node.loc) {
    return null;
  }
  var result = {
    start: node.loc.start,
    end: node.loc.end
  };
  function include(node) {
    expandLoc(result, node.loc);
  }
  if (node.comments) {
    node.comments.forEach(include);
  }
  if (util.isExportDeclaration(node) && node.declaration.decorators) {
    node.declaration.decorators.forEach(include);
  }
  if (comparePos(result.start, result.end) < 0) {
    result.start = copyPos(result.start);
    lines.skipSpaces(result.start, false, true);
    if (comparePos(result.start, result.end) < 0) {
      result.end = copyPos(result.end);
      lines.skipSpaces(result.end, true, true);
    }
  }
  return result;
};
function expandLoc(parentLoc, childLoc) {
  if (parentLoc && childLoc) {
    if (comparePos(childLoc.start, parentLoc.start) < 0) {
      parentLoc.start = childLoc.start;
    }
    if (comparePos(parentLoc.end, childLoc.end) < 0) {
      parentLoc.end = childLoc.end;
    }
  }
}
util.fixFaultyLocations = function(node, lines) {
  var loc = node.loc;
  if (loc) {
    if (loc.start.line < 1) {
      loc.start.line = 1;
    }
    if (loc.end.line < 1) {
      loc.end.line = 1;
    }
  }
  if (node.type === "TemplateLiteral") {
    fixTemplateLiteral(node, lines);
  } else if (loc && node.decorators) {
    node.decorators.forEach(function(decorator) {
      expandLoc(loc, decorator.loc);
    });
  } else if (node.declaration && util.isExportDeclaration(node)) {
    node.declaration.loc = null;
    var decorators = node.declaration.decorators;
    if (decorators) {
      decorators.forEach(function(decorator) {
        expandLoc(loc, decorator.loc);
      });
    }
  } else if ((n.MethodDefinition && n.MethodDefinition.check(node)) || (n.Property.check(node) && (node.method || node.shorthand))) {
    node.value.loc = null;
    if (n.FunctionExpression.check(node.value)) {
      node.value.id = null;
    }
  }
};
function fixTemplateLiteral(node, lines) {
  assert.strictEqual(node.type, "TemplateLiteral");
  if (node.quasis.length === 0) {
    return;
  }
  var afterLeftBackTickPos = copyPos(node.loc.start);
  assert.strictEqual(lines.charAt(afterLeftBackTickPos), "`");
  assert.ok(lines.nextPos(afterLeftBackTickPos));
  var firstQuasi = node.quasis[0];
  if (comparePos(firstQuasi.loc.start, afterLeftBackTickPos) < 0) {
    firstQuasi.loc.start = afterLeftBackTickPos;
  }
  var rightBackTickPos = copyPos(node.loc.end);
  assert.ok(lines.prevPos(rightBackTickPos));
  assert.strictEqual(lines.charAt(rightBackTickPos), "`");
  var lastQuasi = node.quasis[node.quasis.length - 1];
  if (comparePos(rightBackTickPos, lastQuasi.loc.end) < 0) {
    lastQuasi.loc.end = rightBackTickPos;
  }
  node.expressions.forEach(function(expr, i) {
    var dollarCurlyPos = lines.skipSpaces(expr.loc.start, true, false);
    if (lines.prevPos(dollarCurlyPos) && lines.charAt(dollarCurlyPos) === "{" && lines.prevPos(dollarCurlyPos) && lines.charAt(dollarCurlyPos) === "$") {
      var quasiBefore = node.quasis[i];
      if (comparePos(dollarCurlyPos, quasiBefore.loc.end) < 0) {
        quasiBefore.loc.end = dollarCurlyPos;
      }
    }
    var rightCurlyPos = lines.skipSpaces(expr.loc.end, false, false);
    if (lines.charAt(rightCurlyPos) === "}") {
      assert.ok(lines.nextPos(rightCurlyPos));
      var quasiAfter = node.quasis[i + 1];
      if (comparePos(quasiAfter.loc.start, rightCurlyPos) < 0) {
        quasiAfter.loc.start = rightCurlyPos;
      }
    }
  });
}
util.isExportDeclaration = function(node) {
  if (node)
    switch (node.type) {
      case "ExportDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  return false;
};
util.getParentExportDeclaration = function(path) {
  var parentNode = path.getParentNode();
  if (path.getName() === "declaration" && util.isExportDeclaration(parentNode)) {
    return parentNode;
  }
  return null;
};
