/* */ 
'use strict';
var Buffer = require('../../index').Buffer;
var common = {skip: function() {}};
var assert = require('assert');
var Buffer = require('../../index').Buffer;
var cntr = 0;
var b = Buffer.allocUnsafe(1024);
assert.strictEqual(1024, b.length);
b[0] = -1;
assert.strictEqual(b[0], 255);
for (var i = 0; i < 1024; i++) {
  b[i] = i % 256;
}
for (var i = 0; i < 1024; i++) {
  assert.strictEqual(i % 256, b[i]);
}
var c = Buffer.allocUnsafe(512);
assert.strictEqual(512, c.length);
var d = Buffer.from([]);
assert.strictEqual(0, d.length);
var ui32 = new Uint32Array(4).fill(42);
var e = Buffer.from(ui32);
for (var [index, value] of e.entries()) {
  assert.strictEqual(value, ui32[index]);
}
assert.throws(function() {
  Buffer.allocUnsafe(8).fill('a', -1);
});
assert.throws(function() {
  Buffer.allocUnsafe(8).fill('a', 0, 9);
});
Buffer.allocUnsafe(8).fill('');
Buffer.alloc(8, '');
{
  var buf = Buffer.alloc(64, 10);
  for (var i = 0; i < buf.length; i++)
    assert.equal(buf[i], 10);
  buf.fill(11, 0, buf.length >> 1);
  for (var i = 0; i < buf.length >> 1; i++)
    assert.equal(buf[i], 11);
  for (var i = (buf.length >> 1) + 1; i < buf.length; i++)
    assert.equal(buf[i], 10);
  buf.fill('h');
  for (var i = 0; i < buf.length; i++)
    assert.equal('h'.charCodeAt(0), buf[i]);
  buf.fill(0);
  for (var i = 0; i < buf.length; i++)
    assert.equal(0, buf[i]);
  buf.fill(null);
  for (var i = 0; i < buf.length; i++)
    assert.equal(0, buf[i]);
  buf.fill(1, 16, 32);
  for (var i = 0; i < 16; i++)
    assert.equal(0, buf[i]);
  for (var i = 16; i < 32; i++)
    assert.equal(1, buf[i]);
  for (var i = 32; i < buf.length; i++)
    assert.equal(0, buf[i]);
}
{
  var buf = Buffer.alloc(10, 'abc');
  assert.equal(buf.toString(), 'abcabcabca');
  buf.fill('է');
  assert.equal(buf.toString(), 'էէէէէ');
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 512);
  assert.strictEqual(512, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = c.copy(b, 0, 0);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(c[i], b[i]);
  }
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = c.copy(b, 0);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(c[i], b[i]);
  }
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, b.length - Math.floor(c.length / 2));
  assert.strictEqual(Math.floor(c.length / 2), copied);
  for (var i = 0; i < Math.floor(c.length / 2); i++) {
    assert.strictEqual(b[b.length - Math.floor(c.length / 2) + i], c[i]);
  }
  for (var i = Math.floor(c.length / 2) + 1; i < c.length; i++) {
    assert.strictEqual(c[c.length - 1], c[i]);
  }
}
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 513);
  assert.strictEqual(c.length, copied);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}
{
  b.fill(++cntr);
  b.fill(++cntr, 256);
  var copied = b.copy(b, 0, 256, 1024);
  assert.strictEqual(768, copied);
  for (var i = 0; i < b.length; i++) {
    assert.strictEqual(cntr, b[i]);
  }
}
var bb = Buffer.allocUnsafe(10);
bb.fill('hello crazy world');
assert.doesNotThrow(() => {
  b.copy(c, 0, 100, 10);
});
assert.throws(function() {
  Buffer.allocUnsafe(5).copy(Buffer.allocUnsafe(5), 0, -1);
}, RangeError);
{
  b.fill(++cntr);
  c.fill(++cntr);
  var copied = b.copy(c, 0, 0, 1025);
  for (var i = 0; i < c.length; i++) {
    assert.strictEqual(b[i], c[i]);
  }
}
assert.throws(function() {
  b.copy(c, 0, 0, -1);
}, RangeError);
assert.equal(b.copy(c, 0, 100, 10), 0);
assert.equal(b.copy(c, 512, 0, 10), 0);
var caught_error;
caught_error = null;
try {
  b.toString('invalid');
} catch (err) {
  caught_error = err;
}
assert.strictEqual('Unknown encoding: invalid', caught_error.message);
caught_error = null;
try {
  b.write('test string', 0, 5, 'invalid');
} catch (err) {
  caught_error = err;
}
assert.strictEqual('Unknown encoding: invalid', caught_error.message);
Buffer.from('');
Buffer.from('', 'ascii');
Buffer.from('', 'latin1');
Buffer.alloc(0);
Buffer.allocUnsafe(0);
assert.throws(function() {
  b.write('', 2048);
}, RangeError);
assert.throws(function() {
  b.write('a', -1);
}, RangeError);
assert.throws(function() {
  b.write('a', 2048);
}, RangeError);
assert.throws(function() {
  b.write('a', -1);
}, RangeError);
b.copy(Buffer.alloc(0), 0, 0, 0);
b.copy(Buffer.alloc(0), 1, 1, 1);
b.copy(Buffer.alloc(1), 1, 1, 1);
b.copy(Buffer.alloc(1), 0, 2048, 2048);
var rangeBuffer = Buffer.from('abc');
assert.equal(rangeBuffer.toString('ascii', 3), '');
assert.equal(rangeBuffer.toString('ascii', +Infinity), '');
assert.equal(rangeBuffer.toString('ascii', 3.14, 3), '');
assert.equal(rangeBuffer.toString('ascii', 'Infinity', 3), '');
assert.equal(rangeBuffer.toString('ascii', 1, 0), '');
assert.equal(rangeBuffer.toString('ascii', 1, -1.2), '');
assert.equal(rangeBuffer.toString('ascii', 1, -100), '');
assert.equal(rangeBuffer.toString('ascii', 1, -Infinity), '');
assert.equal(rangeBuffer.toString('ascii', -1, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', -1.99, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', -Infinity, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-1', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-1.99', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-Infinity', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', 'node.js', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', {}, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', [], 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', NaN, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', null, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', undefined, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', false, 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '-1', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '1', 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', '-Infinity', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', '3', 3), '');
assert.equal(rangeBuffer.toString('ascii', Number(3), 3), '');
assert.equal(rangeBuffer.toString('ascii', '3.14', 3), '');
assert.equal(rangeBuffer.toString('ascii', '1.99', 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', '-1.99', 3), 'abc');
assert.equal(rangeBuffer.toString('ascii', 1.99, 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', true, 3), 'bc');
assert.equal(rangeBuffer.toString('ascii', 0, 5), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, 6.99), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, Infinity), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '5'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '6.99'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, 'Infinity'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, 'node.js'), '');
assert.equal(rangeBuffer.toString('ascii', 0, {}), '');
assert.equal(rangeBuffer.toString('ascii', 0, NaN), '');
assert.equal(rangeBuffer.toString('ascii', 0, undefined), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, null), '');
assert.equal(rangeBuffer.toString('ascii', 0, []), '');
assert.equal(rangeBuffer.toString('ascii', 0, false), '');
assert.equal(rangeBuffer.toString('ascii', 0, ''), '');
assert.equal(rangeBuffer.toString('ascii', 0, '-1'), '');
assert.equal(rangeBuffer.toString('ascii', 0, '1'), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, '-Infinity'), '');
assert.equal(rangeBuffer.toString('ascii', 0, '3'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, Number(3)), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '3.14'), 'abc');
assert.equal(rangeBuffer.toString('ascii', 0, '1.99'), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, '-1.99'), '');
assert.equal(rangeBuffer.toString('ascii', 0, 1.99), 'a');
assert.equal(rangeBuffer.toString('ascii', 0, true), 'a');
assert.equal(rangeBuffer.toString({toString: function() {
    return 'ascii';
  }}), 'abc');
var writeTest = Buffer.from('abcdes');
writeTest.write('n', 'ascii');
writeTest.write('o', '1', 'ascii');
writeTest.write('d', '2', 'ascii');
writeTest.write('e', 3, 'ascii');
writeTest.write('j', 4, 'ascii');
assert.equal(writeTest.toString(), 'nodejs');
{
  var asciiString = 'hello world';
  for (var i = 0; i < asciiString.length; i++) {
    b[i] = asciiString.charCodeAt(i);
  }
  var asciiSlice = b.toString('ascii', 0, asciiString.length);
  assert.equal(asciiString, asciiSlice);
}
{
  var asciiString = 'hello world';
  var offset = 100;
  var written = b.write(asciiString, offset, 'ascii');
  assert.equal(asciiString.length, written);
  var asciiSlice = b.toString('ascii', offset, offset + asciiString.length);
  assert.equal(asciiString, asciiSlice);
}
{
  var asciiString = 'hello world';
  var offset = 100;
  var sliceA = b.slice(offset, offset + asciiString.length);
  var sliceB = b.slice(offset, offset + asciiString.length);
  for (var i = 0; i < asciiString.length; i++) {
    assert.equal(sliceA[i], sliceB[i]);
  }
}
var utf8String = '¡hέlló wôrld!';
var offset = 100;
b.write(utf8String, 0, Buffer.byteLength(utf8String), 'utf8');
var utf8Slice = b.toString('utf8', 0, Buffer.byteLength(utf8String));
assert.equal(utf8String, utf8Slice);
var written = b.write(utf8String, offset, 'utf8');
assert.equal(Buffer.byteLength(utf8String), written);
utf8Slice = b.toString('utf8', offset, offset + Buffer.byteLength(utf8String));
assert.equal(utf8String, utf8Slice);
var sliceA = b.slice(offset, offset + Buffer.byteLength(utf8String));
var sliceB = b.slice(offset, offset + Buffer.byteLength(utf8String));
for (var i = 0; i < Buffer.byteLength(utf8String); i++) {
  assert.equal(sliceA[i], sliceB[i]);
}
{
  var slice = b.slice(100, 150);
  assert.equal(50, slice.length);
  for (var i = 0; i < 50; i++) {
    assert.equal(b[100 + i], slice[i]);
  }
}
{
  var b = Buffer.allocUnsafe(5);
  var c = b.slice(0, 4);
  var d = c.slice(0, 2);
  assert.equal(b.parent, c.parent);
  assert.equal(b.parent, d.parent);
}
{
  var b = Buffer.allocUnsafeSlow(5);
  var c = b.slice(0, 4);
  var d = c.slice(0, 2);
  assert.equal(c.parent, d.parent);
}
{
  var testValue = '\u00F6\u65E5\u672C\u8A9E';
  var buffer = Buffer.allocUnsafe(32);
  var size = buffer.write(testValue, 0, 'utf8');
  var slice = buffer.toString('utf8', 0, size);
  assert.equal(slice, testValue);
}
{
  var a = Buffer.allocUnsafe(8);
  for (var i = 0; i < 8; i++)
    a[i] = i;
  var b = a.slice(4, 8);
  assert.equal(4, b[0]);
  assert.equal(5, b[1]);
  assert.equal(6, b[2]);
  assert.equal(7, b[3]);
  var c = b.slice(2, 4);
  assert.equal(6, c[0]);
  assert.equal(7, c[1]);
}
{
  var d = Buffer.from([23, 42, 255]);
  assert.equal(d.length, 3);
  assert.equal(d[0], 23);
  assert.equal(d[1], 42);
  assert.equal(d[2], 255);
  assert.deepStrictEqual(d, Buffer.from(d));
}
{
  var e = Buffer.from('über');
  assert.deepStrictEqual(e, Buffer.from([195, 188, 98, 101, 114]));
}
{
  var f = Buffer.from('über', 'ascii');
  assert.deepStrictEqual(f, Buffer.from([252, 98, 101, 114]));
}
['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
  {
    var f = Buffer.from('über', encoding);
    assert.deepStrictEqual(f, Buffer.from([252, 0, 98, 0, 101, 0, 114, 0]));
  }
  {
    var f = Buffer.from('привет', encoding);
    assert.deepStrictEqual(f, Buffer.from([63, 4, 64, 4, 56, 4, 50, 4, 53, 4, 66, 4]));
    assert.equal(f.toString(encoding), 'привет');
  }
  {
    var f = Buffer.from([0, 0, 0, 0, 0]);
    assert.equal(f.length, 5);
    var size = f.write('あいうえお', encoding);
    assert.equal(size, 4);
    assert.deepStrictEqual(f, Buffer.from([0x42, 0x30, 0x44, 0x30, 0x00]));
  }
});
{
  var f = Buffer.from('\uD83D\uDC4D', 'utf-16le');
  assert.equal(f.length, 4);
  assert.deepStrictEqual(f, Buffer.from('3DD84DDC', 'hex'));
}
var arrayIsh = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  length: 4
};
var g = Buffer.from(arrayIsh);
assert.deepStrictEqual(g, Buffer.from([0, 1, 2, 3]));
var strArrayIsh = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  length: 4
};
g = Buffer.from(strArrayIsh);
assert.deepStrictEqual(g, Buffer.from([0, 1, 2, 3]));
assert.equal('TWFu', (Buffer.from('Man')).toString('base64'));
{
  var expected = [0xff, 0xff, 0xbe, 0xff, 0xef, 0xbf, 0xfb, 0xef, 0xff];
  assert.deepStrictEqual(Buffer.from('//++/++/++//', 'base64'), Buffer.from(expected));
  assert.deepStrictEqual(Buffer.from('__--_--_--__', 'base64'), Buffer.from(expected));
}
{
  var quote = 'Man is distinguished, not only by his reason, but by this ' + 'singular passion from other animals, which is a lust ' + 'of the mind, that by a perseverance of delight in the ' + 'continued and indefatigable generation of knowledge, ' + 'exceeds the short vehemence of any carnal pleasure.';
  var expected = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb' + '24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlci' + 'BhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQ' + 'gYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGlu' + 'dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZ' + 'GdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm' + '5hbCBwbGVhc3VyZS4=';
  assert.equal(expected, (Buffer.from(quote)).toString('base64'));
  var b = Buffer.allocUnsafe(1024);
  var bytesWritten = b.write(expected, 0, 'base64');
  assert.equal(quote.length, bytesWritten);
  assert.equal(quote, b.toString('ascii', 0, quote.length));
  var expectedWhite = expected.slice(0, 60) + ' \n' + expected.slice(60, 120) + ' \n' + expected.slice(120, 180) + ' \n' + expected.slice(180, 240) + ' \n' + expected.slice(240, 300) + '\n' + expected.slice(300, 360) + '\n';
  b = Buffer.allocUnsafe(1024);
  bytesWritten = b.write(expectedWhite, 0, 'base64');
  assert.equal(quote.length, bytesWritten);
  assert.equal(quote, b.toString('ascii', 0, quote.length));
  b = Buffer.from(expectedWhite, 'base64');
  assert.equal(quote.length, b.length);
  assert.equal(quote, b.toString('ascii', 0, quote.length));
  var expectedIllegal = expected.slice(0, 60) + ' \x80' + expected.slice(60, 120) + ' \xff' + expected.slice(120, 180) + ' \x00' + expected.slice(180, 240) + ' \x98' + expected.slice(240, 300) + '\x03' + expected.slice(300, 360);
  b = Buffer.from(expectedIllegal, 'base64');
  assert.equal(quote.length, b.length);
  assert.equal(quote, b.toString('ascii', 0, quote.length));
}
assert.equal(Buffer.from('', 'base64').toString(), '');
assert.equal(Buffer.from('K', 'base64').toString(), '');
assert.equal(Buffer.from('Kg==', 'base64').toString(), '*');
assert.equal(Buffer.from('Kio=', 'base64').toString(), '**');
assert.equal(Buffer.from('Kioq', 'base64').toString(), '***');
assert.equal(Buffer.from('KioqKg==', 'base64').toString(), '****');
assert.equal(Buffer.from('KioqKio=', 'base64').toString(), '*****');
assert.equal(Buffer.from('KioqKioq', 'base64').toString(), '******');
assert.equal(Buffer.from('KioqKioqKg==', 'base64').toString(), '*******');
assert.equal(Buffer.from('KioqKioqKio=', 'base64').toString(), '********');
assert.equal(Buffer.from('KioqKioqKioq', 'base64').toString(), '*********');
assert.equal(Buffer.from('KioqKioqKioqKg==', 'base64').toString(), '**********');
assert.equal(Buffer.from('KioqKioqKioqKio=', 'base64').toString(), '***********');
assert.equal(Buffer.from('KioqKioqKioqKioq', 'base64').toString(), '************');
assert.equal(Buffer.from('KioqKioqKioqKioqKg==', 'base64').toString(), '*************');
assert.equal(Buffer.from('KioqKioqKioqKioqKio=', 'base64').toString(), '**************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioq', 'base64').toString(), '***************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKg==', 'base64').toString(), '****************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKio=', 'base64').toString(), '*****************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKioq', 'base64').toString(), '******************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKioqKg==', 'base64').toString(), '*******************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKioqKio=', 'base64').toString(), '********************');
assert.equal(Buffer.from('Kg', 'base64').toString(), '*');
assert.equal(Buffer.from('Kio', 'base64').toString(), '**');
assert.equal(Buffer.from('KioqKg', 'base64').toString(), '****');
assert.equal(Buffer.from('KioqKio', 'base64').toString(), '*****');
assert.equal(Buffer.from('KioqKioqKg', 'base64').toString(), '*******');
assert.equal(Buffer.from('KioqKioqKio', 'base64').toString(), '********');
assert.equal(Buffer.from('KioqKioqKioqKg', 'base64').toString(), '**********');
assert.equal(Buffer.from('KioqKioqKioqKio', 'base64').toString(), '***********');
assert.equal(Buffer.from('KioqKioqKioqKioqKg', 'base64').toString(), '*************');
assert.equal(Buffer.from('KioqKioqKioqKioqKio', 'base64').toString(), '**************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKg', 'base64').toString(), '****************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKio', 'base64').toString(), '*****************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKioqKg', 'base64').toString(), '*******************');
assert.equal(Buffer.from('KioqKioqKioqKioqKioqKioqKio', 'base64').toString(), '********************');
assert.equal(Buffer.from('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw==', 'base64').length, 32);
assert.equal(Buffer.from('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw=', 'base64').length, 32);
assert.equal(Buffer.from('72INjkR5fchcxk9+VgdGPFJDxUBFR5/rMFsghgxADiw', 'base64').length, 32);
assert.equal(Buffer.from('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg==', 'base64').length, 31);
assert.equal(Buffer.from('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg=', 'base64').length, 31);
assert.equal(Buffer.from('w69jACy6BgZmaFvv96HG6MYksWytuZu3T1FvGnulPg', 'base64').length, 31);
var dot = Buffer.from('//4uAA==', 'base64');
assert.equal(dot[0], 0xff);
assert.equal(dot[1], 0xfe);
assert.equal(dot[2], 0x2e);
assert.equal(dot[3], 0x00);
assert.equal(dot.toString('base64'), '//4uAA==');
{
  var segments = ['TWFkbmVzcz8h', 'IFRoaXM=', 'IGlz', 'IG5vZGUuanMh'];
  var b = Buffer.allocUnsafe(64);
  var pos = 0;
  for (var i = 0; i < segments.length; ++i) {
    pos += b.write(segments[i], pos, 'base64');
  }
  assert.equal(b.toString('latin1', 0, pos), 'Madness?! This is node.js!');
}
{
  var l = Buffer.poolSize + 5;
  var s = '';
  for (var i = 0; i < l; i++) {
    s += 'h';
  }
  var b = Buffer.from(s);
  for (var i = 0; i < l; i++) {
    assert.equal('h'.charCodeAt(0), b[i]);
  }
  var sb = b.toString();
  assert.equal(sb.length, s.length);
  assert.equal(sb, s);
}
{
  var b = Buffer.from('abcde');
  assert.equal('bcde', b.slice(1).toString());
}
assert.equal(0, Buffer.from('hello').slice(0, 0).length);
var hexb = Buffer.allocUnsafe(256);
for (var i = 0; i < 256; i++) {
  hexb[i] = i;
}
var hexStr = hexb.toString('hex');
assert.equal(hexStr, '000102030405060708090a0b0c0d0e0f' + '101112131415161718191a1b1c1d1e1f' + '202122232425262728292a2b2c2d2e2f' + '303132333435363738393a3b3c3d3e3f' + '404142434445464748494a4b4c4d4e4f' + '505152535455565758595a5b5c5d5e5f' + '606162636465666768696a6b6c6d6e6f' + '707172737475767778797a7b7c7d7e7f' + '808182838485868788898a8b8c8d8e8f' + '909192939495969798999a9b9c9d9e9f' + 'a0a1a2a3a4a5a6a7a8a9aaabacadaeaf' + 'b0b1b2b3b4b5b6b7b8b9babbbcbdbebf' + 'c0c1c2c3c4c5c6c7c8c9cacbcccdcecf' + 'd0d1d2d3d4d5d6d7d8d9dadbdcdddedf' + 'e0e1e2e3e4e5e6e7e8e9eaebecedeeef' + 'f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff');
var hexb2 = Buffer.from(hexStr, 'hex');
for (var i = 0; i < 256; i++) {
  assert.equal(hexb2[i], hexb[i]);
}
{
  var b = Buffer.from([1, 2, 3, 4, 5]);
  var b2 = b.toString('hex', 1, 10000);
  var b3 = b.toString('hex', 1, 5);
  var b4 = b.toString('hex', 1);
  assert.equal(b2, b3);
  assert.equal(b2, b4);
}
function buildBuffer(data) {
  if (Array.isArray(data)) {
    var buffer = Buffer.allocUnsafe(data.length);
    data.forEach(function(v, k) {
      buffer[k] = v;
    });
    return buffer;
  }
  return null;
}
var x = buildBuffer([0x81, 0xa3, 0x66, 0x6f, 0x6f, 0xa3, 0x62, 0x61, 0x72]);
assert.equal('<Buffer 81 a3 66 6f 6f a3 62 61 72>', x.inspect());
{
  var z = x.slice(4);
  assert.equal(5, z.length);
  assert.equal(0x6f, z[0]);
  assert.equal(0xa3, z[1]);
  assert.equal(0x62, z[2]);
  assert.equal(0x61, z[3]);
  assert.equal(0x72, z[4]);
}
{
  var z = x.slice(0);
  assert.equal(z.length, x.length);
}
{
  var z = x.slice(0, 4);
  assert.equal(4, z.length);
  assert.equal(0x81, z[0]);
  assert.equal(0xa3, z[1]);
}
{
  var z = x.slice(0, 9);
  assert.equal(9, z.length);
}
{
  var z = x.slice(1, 4);
  assert.equal(3, z.length);
  assert.equal(0xa3, z[0]);
}
{
  var z = x.slice(2, 4);
  assert.equal(2, z.length);
  assert.equal(0x66, z[0]);
  assert.equal(0x6f, z[1]);
}
assert.equal(0, Buffer.from('hello').slice(0, 0).length);
['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
  var b = Buffer.allocUnsafe(10);
  b.write('あいうえお', encoding);
  assert.equal(b.toString(encoding), 'あいうえお');
});
{
  var b = Buffer.from([0xde, 0xad, 0xbe, 0xef]);
  var s = String.fromCharCode(0xffff);
  b.write(s, 0, 'latin1');
  assert.equal(0xff, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
  s = String.fromCharCode(0xaaee);
  b.write(s, 0, 'latin1');
  assert.equal(0xee, b[0]);
  assert.equal(0xad, b[1]);
  assert.equal(0xbe, b[2]);
  assert.equal(0xef, b[3]);
}
{
  var buf = Buffer.from('\0');
  assert.equal(buf.length, 1);
  buf = Buffer.from('\0\0');
  assert.equal(buf.length, 2);
}
{
  var buf = Buffer.allocUnsafe(2);
  var written = buf.write('');
  assert.equal(written, 0);
  written = buf.write('\0');
  assert.equal(written, 1);
  written = buf.write('a\0');
  assert.equal(written, 2);
  written = buf.write('あ');
  assert.equal(written, 0);
  written = buf.write('\0あ');
  assert.equal(written, 1);
  written = buf.write('\0\0あ');
  assert.equal(written, 2);
}
{
  var buf = Buffer.allocUnsafe(10);
  written = buf.write('あいう');
  assert.equal(written, 9);
  written = buf.write('あいう\0');
  assert.equal(written, 10);
}
{
  var buf = Buffer.allocUnsafe(4);
  buf.fill(0xFF);
  var written = buf.write('abcd', 1, 2, 'utf8');
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0xFF);
  buf.fill(0xFF);
  written = buf.write('abcd', 1, 4);
  assert.equal(written, 3);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0x63);
  buf.fill(0xFF);
  written = buf.write('abcd', 1, 2, 'utf8');
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0x61);
  assert.equal(buf[2], 0x62);
  assert.equal(buf[3], 0xFF);
  buf.fill(0xFF);
  written = buf.write('abcdef', 1, 2, 'hex');
  assert.equal(written, 2);
  assert.equal(buf[0], 0xFF);
  assert.equal(buf[1], 0xAB);
  assert.equal(buf[2], 0xCD);
  assert.equal(buf[3], 0xFF);
  ['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
    buf.fill(0xFF);
    written = buf.write('abcd', 0, 2, encoding);
    assert.equal(written, 2);
    assert.equal(buf[0], 0x61);
    assert.equal(buf[1], 0x00);
    assert.equal(buf[2], 0xFF);
    assert.equal(buf[3], 0xFF);
  });
}
{
  var b = Buffer.allocUnsafe(16);
  assert.equal(4, b.writeUInt32LE(0, 0));
  assert.equal(6, b.writeUInt16LE(0, 4));
  assert.equal(7, b.writeUInt8(0, 6));
  assert.equal(8, b.writeInt8(0, 7));
  assert.equal(16, b.writeDoubleLE(0, 8));
}
{
  var buf = Buffer.from('ab\ud800cd', 'utf8');
  assert.equal(buf[0], 0x61);
  assert.equal(buf[1], 0x62);
  assert.equal(buf[2], 0xef);
  assert.equal(buf[3], 0xbf);
  assert.equal(buf[4], 0xbd);
  assert.equal(buf[5], 0x63);
  assert.equal(buf[6], 0x64);
}
{
  var buf = Buffer.from([0, 0, 0, 0, 0]);
  var sub = buf.slice(0, 4);
  written = sub.write('12345', 'latin1');
  assert.equal(written, 4);
  assert.equal(buf[4], 0);
}
Buffer.allocUnsafe(3.3).fill().toString();
Buffer.alloc(3.3).fill().toString();
assert.equal(Buffer.allocUnsafe(NaN).length, 0);
assert.equal(Buffer.allocUnsafe(3.3).length, 3);
assert.equal(Buffer.from({length: 3.3}).length, 3);
assert.equal(Buffer.from({length: 'BAM'}).length, 0);
assert.equal(Buffer.from('99').length, 2);
assert.equal(Buffer.from('13.37').length, 5);
'ascii utf8 hex base64 latin1'.split(' ').forEach(function(enc) {
  assert.equal(Buffer.allocUnsafe(1).write('aaaaaa', 0, 1, enc), 1);
});
{
  var a = Buffer.allocUnsafe(3);
  var b = Buffer.from('xxx');
  a.write('aaaaaaaa', 'base64');
  assert.equal(b.toString(), 'xxx');
}
Buffer.from(Buffer.allocUnsafe(0), 0, 0);
['hex', 'utf8', 'utf-8', 'ascii', 'latin1', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(enc) {
  assert.equal(Buffer.isEncoding(enc), true);
});
['utf9', 'utf-7', 'Unicode-FTW', 'new gnu gun', false, NaN, {}, Infinity, [], 1, 0, -1].forEach(function(enc) {
  assert.equal(Buffer.isEncoding(enc), false);
});
{
  var buffer = Buffer.from('test');
  var string = JSON.stringify(buffer);
  assert.strictEqual(string, '{"type":"Buffer","data":[116,101,115,116]}');
  assert.deepStrictEqual(buffer, JSON.parse(string, function(key, value) {
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
  }));
}
{
  var buf = Buffer.from('test');
  var json = JSON.stringify(buf);
  var obj = JSON.parse(json);
  var copy = Buffer.from(obj);
  assert(buf.equals(copy));
}
assert.throws(function() {
  Buffer.allocUnsafe(0xFFFFFFFF);
}, RangeError);
assert.throws(function() {
  Buffer.allocUnsafe(0xFFFFFFFFF);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.readFloatLE(0xffffffff);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.writeFloatLE(0.0, 0xffffffff);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.readFloatLE(0xffffffff);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.writeFloatLE(0.0, 0xffffffff);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.readFloatLE(-1);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.writeFloatLE(0.0, -1);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.readFloatLE(-1);
}, RangeError);
assert.throws(function() {
  var buf = Buffer.allocUnsafe(8);
  buf.writeFloatLE(0.0, -1);
}, RangeError);
{
  var buf = Buffer.allocUnsafe(0);
  assert.throws(function() {
    buf.readUInt8(0);
  }, RangeError);
  assert.throws(function() {
    buf.readInt8(0);
  }, RangeError);
}
{
  var buf = Buffer.from([0xFF]);
  assert.equal(buf.readUInt8(0), 255);
  assert.equal(buf.readInt8(0), -1);
}
[16, 32].forEach(function(bits) {
  var buf = Buffer.allocUnsafe(bits / 8 - 1);
  assert.throws(function() {
    buf['readUInt' + bits + 'BE'](0);
  }, RangeError, 'readUInt' + bits + 'BE');
  assert.throws(function() {
    buf['readUInt' + bits + 'LE'](0);
  }, RangeError, 'readUInt' + bits + 'LE');
  assert.throws(function() {
    buf['readInt' + bits + 'BE'](0);
  }, RangeError, 'readInt' + bits + 'BE()');
  assert.throws(function() {
    buf['readInt' + bits + 'LE'](0);
  }, RangeError, 'readInt' + bits + 'LE()');
});
[16, 32].forEach(function(bits) {
  var buf = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF]);
  assert.equal(buf['readUInt' + bits + 'BE'](0), (0xFFFFFFFF >>> (32 - bits)));
  assert.equal(buf['readUInt' + bits + 'LE'](0), (0xFFFFFFFF >>> (32 - bits)));
  assert.equal(buf['readInt' + bits + 'BE'](0), (0xFFFFFFFF >> (32 - bits)));
  assert.equal(buf['readInt' + bits + 'LE'](0), (0xFFFFFFFF >> (32 - bits)));
});
{
  var buf = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
  assert.strictEqual(buf.readUIntLE(0, 1), 0x01);
  assert.strictEqual(buf.readUIntBE(0, 1), 0x01);
  assert.strictEqual(buf.readUIntLE(0, 3), 0x030201);
  assert.strictEqual(buf.readUIntBE(0, 3), 0x010203);
  assert.strictEqual(buf.readUIntLE(0, 5), 0x0504030201);
  assert.strictEqual(buf.readUIntBE(0, 5), 0x0102030405);
  assert.strictEqual(buf.readUIntLE(0, 6), 0x060504030201);
  assert.strictEqual(buf.readUIntBE(0, 6), 0x010203040506);
  assert.strictEqual(buf.readIntLE(0, 1), 0x01);
  assert.strictEqual(buf.readIntBE(0, 1), 0x01);
  assert.strictEqual(buf.readIntLE(0, 3), 0x030201);
  assert.strictEqual(buf.readIntBE(0, 3), 0x010203);
  assert.strictEqual(buf.readIntLE(0, 5), 0x0504030201);
  assert.strictEqual(buf.readIntBE(0, 5), 0x0102030405);
  assert.strictEqual(buf.readIntLE(0, 6), 0x060504030201);
  assert.strictEqual(buf.readIntBE(0, 6), 0x010203040506);
}
{
  var buf = Buffer.allocUnsafe(3);
  buf.writeUIntLE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
  assert.equal(buf.readUIntLE(0, 3), 0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeUIntBE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
  assert.equal(buf.readUIntBE(0, 3), 0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntLE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
  assert.equal(buf.readIntLE(0, 3), 0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntBE(0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
  assert.equal(buf.readIntBE(0, 3), 0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntLE(-0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xaa, 0xcb, 0xed]);
  assert.equal(buf.readIntLE(0, 3), -0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntBE(-0x123456, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcb, 0xaa]);
  assert.equal(buf.readIntBE(0, 3), -0x123456);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntLE(-0x123400, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0xcc, 0xed]);
  assert.equal(buf.readIntLE(0, 3), -0x123400);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntBE(-0x123400, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcc, 0x00]);
  assert.equal(buf.readIntBE(0, 3), -0x123400);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntLE(-0x120000, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0x00, 0xee]);
  assert.equal(buf.readIntLE(0, 3), -0x120000);
  buf = Buffer.allocUnsafe(3);
  buf.writeIntBE(-0x120000, 0, 3);
  assert.deepStrictEqual(buf.toJSON().data, [0xee, 0x00, 0x00]);
  assert.equal(buf.readIntBE(0, 3), -0x120000);
  buf = Buffer.allocUnsafe(5);
  buf.writeUIntLE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
  assert.equal(buf.readUIntLE(0, 5), 0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeUIntBE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
  assert.equal(buf.readUIntBE(0, 5), 0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntLE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
  assert.equal(buf.readIntLE(0, 5), 0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntBE(0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
  assert.equal(buf.readIntBE(0, 5), 0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntLE(-0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x70, 0x87, 0xa9, 0xcb, 0xed]);
  assert.equal(buf.readIntLE(0, 5), -0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntBE(-0x1234567890, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0xed, 0xcb, 0xa9, 0x87, 0x70]);
  assert.equal(buf.readIntBE(0, 5), -0x1234567890);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntLE(-0x0012000000, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0x00, 0x00, 0x00, 0xee, 0xff]);
  assert.equal(buf.readIntLE(0, 5), -0x0012000000);
  buf = Buffer.allocUnsafe(5);
  buf.writeIntBE(-0x0012000000, 0, 5);
  assert.deepStrictEqual(buf.toJSON().data, [0xff, 0xee, 0x00, 0x00, 0x00]);
  assert.equal(buf.readIntBE(0, 5), -0x0012000000);
}
{
  var buf = Buffer.from('0123456789');
  assert.equal(buf.slice(-10, 10), '0123456789');
  assert.equal(buf.slice(-20, 10), '0123456789');
  assert.equal(buf.slice(-20, -10), '');
  assert.equal(buf.slice(), '0123456789');
  assert.equal(buf.slice(0), '0123456789');
  assert.equal(buf.slice(0, 0), '');
  assert.equal(buf.slice(undefined), '0123456789');
  assert.equal(buf.slice('foobar'), '0123456789');
  assert.equal(buf.slice(undefined, undefined), '0123456789');
  assert.equal(buf.slice(2), '23456789');
  assert.equal(buf.slice(5), '56789');
  assert.equal(buf.slice(10), '');
  assert.equal(buf.slice(5, 8), '567');
  assert.equal(buf.slice(8, -1), '8');
  assert.equal(buf.slice(-10), '0123456789');
  assert.equal(buf.slice(0, -9), '0');
  assert.equal(buf.slice(0, -10), '');
  assert.equal(buf.slice(0, -1), '012345678');
  assert.equal(buf.slice(2, -2), '234567');
  assert.equal(buf.slice(0, 65536), '0123456789');
  assert.equal(buf.slice(65536, 0), '');
  assert.equal(buf.slice(-5, -8), '');
  assert.equal(buf.slice(-5, -3), '56');
  assert.equal(buf.slice(-10, 10), '0123456789');
  for (var i = 0,
      s = buf.toString(); i < buf.length; ++i) {
    assert.equal(buf.slice(i), s.slice(i));
    assert.equal(buf.slice(0, i), s.slice(0, i));
    assert.equal(buf.slice(-i), s.slice(-i));
    assert.equal(buf.slice(0, -i), s.slice(0, -i));
  }
  var utf16Buf = Buffer.from('0123456789', 'utf16le');
  assert.equal(buf.slice('0', '1'), '0');
  assert.equal(buf.slice('-5', '10'), '56789');
  assert.equal(buf.slice('-10', '10'), '0123456789');
  assert.equal(buf.slice('-10', '-5'), '01234');
  assert.equal(buf.slice('-10', '-0'), '');
  assert.equal(buf.slice('111'), '');
  assert.equal(buf.slice('0', '-111'), '');
  Buffer.alloc(0).slice(0, 1);
}
assert.throws(function() {
  Buffer.from('', 'buffer');
}, TypeError);
{
  var a = [0];
  for (var i = 0; i < 7; ++i)
    a = a.concat(a);
  a = a.map(function(_, i) {
    return i;
  });
  var b = Buffer.from(a);
  var c = Buffer.from(b);
  assert.strictEqual(b.length, a.length);
  assert.strictEqual(c.length, a.length);
  for (var i = 0,
      k = a.length; i < k; ++i) {
    assert.strictEqual(a[i], i);
    assert.strictEqual(b[i], i);
    assert.strictEqual(c[i], i);
  }
}
assert.throws(function() {
  Buffer.allocUnsafe((-1 >>> 0) + 1);
}, RangeError);
assert.throws(function() {
  Buffer.allocUnsafeSlow((-1 >>> 0) + 1);
}, RangeError);
if (common.hasCrypto) {
  var crypto = require('crypto');
  var b1 = Buffer.from('YW55=======', 'base64');
  var b2 = Buffer.from('YW55', 'base64');
  assert.equal(crypto.createHash('sha1').update(b1).digest('hex'), crypto.createHash('sha1').update(b2).digest('hex'));
} else {
  common.skip('missing crypto');
}
{
  var b = Buffer.alloc(1, 'a');
  var c = Buffer.alloc(1, 'c');
  var d = Buffer.alloc(2, 'aa');
  assert.equal(b.compare(c), -1);
  assert.equal(c.compare(d), 1);
  assert.equal(d.compare(b), 1);
  assert.equal(b.compare(d), -1);
  assert.equal(b.compare(b), 0);
  assert.equal(Buffer.compare(b, c), -1);
  assert.equal(Buffer.compare(c, d), 1);
  assert.equal(Buffer.compare(d, b), 1);
  assert.equal(Buffer.compare(b, d), -1);
  assert.equal(Buffer.compare(c, c), 0);
  assert.equal(Buffer.compare(Buffer.alloc(0), Buffer.alloc(0)), 0);
  assert.equal(Buffer.compare(Buffer.alloc(0), Buffer.alloc(1)), -1);
  assert.equal(Buffer.compare(Buffer.alloc(1), Buffer.alloc(0)), 1);
}
assert.throws(function() {
  var b = Buffer.allocUnsafe(1);
  Buffer.compare(b, 'abc');
});
assert.throws(function() {
  var b = Buffer.allocUnsafe(1);
  Buffer.compare('abc', b);
});
assert.throws(function() {
  var b = Buffer.allocUnsafe(1);
  b.compare('abc');
});
{
  var b = Buffer.alloc(5, 'abcdf');
  var c = Buffer.alloc(5, 'abcdf');
  var d = Buffer.alloc(5, 'abcde');
  var e = Buffer.alloc(6, 'abcdef');
  assert.ok(b.equals(c));
  assert.ok(!c.equals(d));
  assert.ok(!d.equals(e));
  assert.ok(d.equals(d));
}
assert.throws(function() {
  var b = Buffer.allocUnsafe(1);
  b.equals('abc');
});
assert.throws(() => {
  Buffer.allocUnsafe(1422561062959).toString('utf8');
});
var ps = Buffer.poolSize;
Buffer.poolSize = 0;
assert.equal(Buffer.allocUnsafe(1).parent, undefined);
Buffer.poolSize = ps;
assert.throws(function() {
  Buffer.allocUnsafe(10).copy();
});
var regErrorMsg = new RegExp('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
assert.throws(function() {
  Buffer.from();
}, regErrorMsg);
assert.throws(function() {
  Buffer.from(null);
}, regErrorMsg);
assert.throws(function() {
  Buffer.from(new ArrayBuffer(0), -1 >>> 0);
}, /RangeError: 'offset' is out of bounds/);
assert.throws(() => {
  var a = Buffer(1).fill(0);
  var b = Buffer(1).fill(0);
  a.copy(b, 0, 0x100000000, 0x100000001);
}), /out of range index/;
var ubuf = Buffer.allocUnsafeSlow(10);
assert(ubuf);
assert(ubuf.buffer);
assert.equal(ubuf.buffer.byteLength, 10);
assert.doesNotThrow(() => {
  Buffer.from(new ArrayBuffer());
});
assert.throws(() => Buffer.alloc(-Buffer.poolSize), '"size" argument must not be negative');
assert.throws(() => Buffer.alloc(-100), '"size" argument must not be negative');
assert.throws(() => Buffer.allocUnsafe(-Buffer.poolSize), '"size" argument must not be negative');
assert.throws(() => Buffer.allocUnsafe(-100), '"size" argument must not be negative');
assert.throws(() => Buffer.allocUnsafeSlow(-Buffer.poolSize), '"size" argument must not be negative');
assert.throws(() => Buffer.allocUnsafeSlow(-100), '"size" argument must not be negative');
assert.throws(() => Buffer.alloc({valueOf: () => 1}), /"size" argument must be a number/);
assert.throws(() => Buffer.alloc({valueOf: () => -1}), /"size" argument must be a number/);
