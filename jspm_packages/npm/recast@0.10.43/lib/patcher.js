/* */ 
var assert = require('assert');
var linesModule = require('./lines');
var types = require('./types');
var getFieldValue = types.getFieldValue;
var Printable = types.namedTypes.Printable;
var Expression = types.namedTypes.Expression;
var SourceLocation = types.namedTypes.SourceLocation;
var util = require('./util');
var comparePos = util.comparePos;
var FastPath = require('./fast-path');
var isObject = types.builtInTypes.object;
var isArray = types.builtInTypes.array;
var isString = types.builtInTypes.string;
var riskyAdjoiningCharExp = /[0-9a-z_$]/i;
function Patcher(lines) {
  assert.ok(this instanceof Patcher);
  assert.ok(lines instanceof linesModule.Lines);
  var self = this,
      replacements = [];
  self.replace = function(loc, lines) {
    if (isString.check(lines))
      lines = linesModule.fromString(lines);
    replacements.push({
      lines: lines,
      start: loc.start,
      end: loc.end
    });
  };
  self.get = function(loc) {
    loc = loc || {
      start: {
        line: 1,
        column: 0
      },
      end: {
        line: lines.length,
        column: lines.getLineLength(lines.length)
      }
    };
    var sliceFrom = loc.start,
        toConcat = [];
    function pushSlice(from, to) {
      assert.ok(comparePos(from, to) <= 0);
      toConcat.push(lines.slice(from, to));
    }
    replacements.sort(function(a, b) {
      return comparePos(a.start, b.start);
    }).forEach(function(rep) {
      if (comparePos(sliceFrom, rep.start) > 0) {} else {
        pushSlice(sliceFrom, rep.start);
        toConcat.push(rep.lines);
        sliceFrom = rep.end;
      }
    });
    pushSlice(sliceFrom, loc.end);
    return linesModule.concat(toConcat);
  };
}
exports.Patcher = Patcher;
var Pp = Patcher.prototype;
Pp.tryToReprintComments = function(newNode, oldNode, print) {
  var patcher = this;
  if (!newNode.comments && !oldNode.comments) {
    return true;
  }
  var newPath = FastPath.from(newNode);
  var oldPath = FastPath.from(oldNode);
  newPath.stack.push("comments", getSurroundingComments(newNode));
  oldPath.stack.push("comments", getSurroundingComments(oldNode));
  var reprints = [];
  var ableToReprintComments = findArrayReprints(newPath, oldPath, reprints);
  if (ableToReprintComments && reprints.length > 0) {
    reprints.forEach(function(reprint) {
      var oldComment = reprint.oldPath.getValue();
      assert.ok(oldComment.leading || oldComment.trailing);
      patcher.replace(oldComment.loc, print(reprint.newPath).indentTail(oldComment.loc.indent));
    });
  }
  return ableToReprintComments;
};
function getSurroundingComments(node) {
  var result = [];
  if (node.comments && node.comments.length > 0) {
    node.comments.forEach(function(comment) {
      if (comment.leading || comment.trailing) {
        result.push(comment);
      }
    });
  }
  return result;
}
Pp.deleteComments = function(node) {
  if (!node.comments) {
    return;
  }
  var patcher = this;
  node.comments.forEach(function(comment) {
    if (comment.leading) {
      patcher.replace({
        start: comment.loc.start,
        end: node.loc.lines.skipSpaces(comment.loc.end, false, false)
      }, "");
    } else if (comment.trailing) {
      patcher.replace({
        start: node.loc.lines.skipSpaces(comment.loc.start, true, false),
        end: comment.loc.end
      }, "");
    }
  });
};
exports.getReprinter = function(path) {
  assert.ok(path instanceof FastPath);
  var node = path.getValue();
  if (!Printable.check(node))
    return;
  var orig = node.original;
  var origLoc = orig && orig.loc;
  var lines = origLoc && origLoc.lines;
  var reprints = [];
  if (!lines || !findReprints(path, reprints))
    return;
  return function(print) {
    var patcher = new Patcher(lines);
    reprints.forEach(function(reprint) {
      var newNode = reprint.newPath.getValue();
      var oldNode = reprint.oldPath.getValue();
      SourceLocation.assert(oldNode.loc, true);
      var needToPrintNewPathWithComments = !patcher.tryToReprintComments(newNode, oldNode, print);
      if (needToPrintNewPathWithComments) {
        patcher.deleteComments(oldNode);
      }
      var newLines = print(reprint.newPath, needToPrintNewPathWithComments).indentTail(oldNode.loc.indent);
      var nls = needsLeadingSpace(lines, oldNode.loc, newLines);
      var nts = needsTrailingSpace(lines, oldNode.loc, newLines);
      if (nls || nts) {
        var newParts = [];
        nls && newParts.push(" ");
        newParts.push(newLines);
        nts && newParts.push(" ");
        newLines = linesModule.concat(newParts);
      }
      patcher.replace(oldNode.loc, newLines);
    });
    return patcher.get(origLoc).indentTail(-orig.loc.indent);
  };
};
function needsLeadingSpace(oldLines, oldLoc, newLines) {
  var posBeforeOldLoc = util.copyPos(oldLoc.start);
  var charBeforeOldLoc = oldLines.prevPos(posBeforeOldLoc) && oldLines.charAt(posBeforeOldLoc);
  var newFirstChar = newLines.charAt(newLines.firstPos());
  return charBeforeOldLoc && riskyAdjoiningCharExp.test(charBeforeOldLoc) && newFirstChar && riskyAdjoiningCharExp.test(newFirstChar);
}
function needsTrailingSpace(oldLines, oldLoc, newLines) {
  var charAfterOldLoc = oldLines.charAt(oldLoc.end);
  var newLastPos = newLines.lastPos();
  var newLastChar = newLines.prevPos(newLastPos) && newLines.charAt(newLastPos);
  return newLastChar && riskyAdjoiningCharExp.test(newLastChar) && charAfterOldLoc && riskyAdjoiningCharExp.test(charAfterOldLoc);
}
function findReprints(newPath, reprints) {
  var newNode = newPath.getValue();
  Printable.assert(newNode);
  var oldNode = newNode.original;
  Printable.assert(oldNode);
  assert.deepEqual(reprints, []);
  if (newNode.type !== oldNode.type) {
    return false;
  }
  var oldPath = new FastPath(oldNode);
  var canReprint = findChildReprints(newPath, oldPath, reprints);
  if (!canReprint) {
    reprints.length = 0;
  }
  return canReprint;
}
function findAnyReprints(newPath, oldPath, reprints) {
  var newNode = newPath.getValue();
  var oldNode = oldPath.getValue();
  if (newNode === oldNode)
    return true;
  if (isArray.check(newNode))
    return findArrayReprints(newPath, oldPath, reprints);
  if (isObject.check(newNode))
    return findObjectReprints(newPath, oldPath, reprints);
  return false;
}
function findArrayReprints(newPath, oldPath, reprints) {
  var newNode = newPath.getValue();
  var oldNode = oldPath.getValue();
  isArray.assert(newNode);
  var len = newNode.length;
  if (!(isArray.check(oldNode) && oldNode.length === len))
    return false;
  for (var i = 0; i < len; ++i) {
    newPath.stack.push(i, newNode[i]);
    oldPath.stack.push(i, oldNode[i]);
    var canReprint = findAnyReprints(newPath, oldPath, reprints);
    newPath.stack.length -= 2;
    oldPath.stack.length -= 2;
    if (!canReprint) {
      return false;
    }
  }
  return true;
}
function findObjectReprints(newPath, oldPath, reprints) {
  var newNode = newPath.getValue();
  isObject.assert(newNode);
  if (newNode.original === null) {
    return false;
  }
  var oldNode = oldPath.getValue();
  if (!isObject.check(oldNode))
    return false;
  if (Printable.check(newNode)) {
    if (!Printable.check(oldNode)) {
      return false;
    }
    if (newNode.type === oldNode.type) {
      var childReprints = [];
      if (findChildReprints(newPath, oldPath, childReprints)) {
        reprints.push.apply(reprints, childReprints);
      } else if (oldNode.loc) {
        reprints.push({
          oldPath: oldPath.copy(),
          newPath: newPath.copy()
        });
      } else {
        return false;
      }
      return true;
    }
    if (Expression.check(newNode) && Expression.check(oldNode) && oldNode.loc) {
      reprints.push({
        oldPath: oldPath.copy(),
        newPath: newPath.copy()
      });
      return true;
    }
    return false;
  }
  return findChildReprints(newPath, oldPath, reprints);
}
var reusablePos = {
  line: 1,
  column: 0
};
var nonSpaceExp = /\S/;
function hasOpeningParen(oldPath) {
  var oldNode = oldPath.getValue();
  var loc = oldNode.loc;
  var lines = loc && loc.lines;
  if (lines) {
    var pos = reusablePos;
    pos.line = loc.start.line;
    pos.column = loc.start.column;
    while (lines.prevPos(pos)) {
      var ch = lines.charAt(pos);
      if (ch === "(") {
        return comparePos(oldPath.getRootValue().loc.start, pos) <= 0;
      }
      if (nonSpaceExp.test(ch)) {
        return false;
      }
    }
  }
  return false;
}
function hasClosingParen(oldPath) {
  var oldNode = oldPath.getValue();
  var loc = oldNode.loc;
  var lines = loc && loc.lines;
  if (lines) {
    var pos = reusablePos;
    pos.line = loc.end.line;
    pos.column = loc.end.column;
    do {
      var ch = lines.charAt(pos);
      if (ch === ")") {
        return comparePos(pos, oldPath.getRootValue().loc.end) <= 0;
      }
      if (nonSpaceExp.test(ch)) {
        return false;
      }
    } while (lines.nextPos(pos));
  }
  return false;
}
function hasParens(oldPath) {
  return hasOpeningParen(oldPath) && hasClosingParen(oldPath);
}
function findChildReprints(newPath, oldPath, reprints) {
  var newNode = newPath.getValue();
  var oldNode = oldPath.getValue();
  isObject.assert(newNode);
  isObject.assert(oldNode);
  if (newNode.original === null) {
    return false;
  }
  if (!newPath.canBeFirstInStatement() && newPath.firstInStatement() && !hasOpeningParen(oldPath))
    return false;
  if (newPath.needsParens(true) && !hasParens(oldPath)) {
    return false;
  }
  for (var k in util.getUnionOfKeys(newNode, oldNode)) {
    if (k === "loc")
      continue;
    newPath.stack.push(k, types.getFieldValue(newNode, k));
    oldPath.stack.push(k, types.getFieldValue(oldNode, k));
    var canReprint = findAnyReprints(newPath, oldPath, reprints);
    newPath.stack.length -= 2;
    oldPath.stack.length -= 2;
    if (!canReprint) {
      return false;
    }
  }
  return true;
}
