'use strict'

var assert = require('assert')
var $accidental = require('../dist/cjs/lib/accidental')

describe('pitch/accidental 模块 #######################', function() {
  var signs = ['\u266d\u266d', '\u266d', '\u266E', '\u266f', '\u00d7']
  var offset = [-2, -1, 0, 1, 2]
  var names = ['double flat', 'flat', 'natural', 'sharp', 'double sharp']

  it('isAccidental(offset: number): boolean', function() {
    offset.forEach(function(offset) {
      assert.ok($accidental.isAccidental(offset))
    })
    assert.ok(!$accidental.isAccidental(-3))
    assert.ok(!$accidental.isAccidental(3))
    assert.ok(!$accidental.isAccidental(''))
    assert.ok(!$accidental.isAccidental())

    signs.forEach(function(sign) {
      assert.ok($accidental.isAccidental(sign))
    })
    assert.ok(!$accidental.isAccidental(''))

    assert.ok(!$accidental.isAccidental(undefined))
    assert.ok(!$accidental.isAccidental(null))
  })

  it('offset(accidental: Sign|Offset|NiceName): Offset', function() {
    var resultSigns = signs.map(function(s) {
      return $accidental.offset(s)
    })
    var resultNames = names.map(function(n) {
      return $accidental.offset(n)
    })
    var resultOffsets = offset.map(function(o) {
      return $accidental.offset(o)
    })
    assert.deepEqual(offset, resultSigns)
    assert.deepEqual(offset, resultNames)
    assert.deepEqual(offset, resultOffsets)
  })

  it('niceName(accidental: Sign|Offset|NiceName): NiceName', function() {
    var resultSigns = signs.map(function(s) {
      return $accidental.niceName(s)
    })
    var resultNames = names.map(function(n) {
      return $accidental.niceName(n)
    })
    var resultOffsets = offset.map(function(o) {
      return $accidental.niceName(o)
    })
    assert.deepEqual(names, resultSigns)
    assert.deepEqual(names, resultNames)
    assert.deepEqual(names, resultOffsets)
  })

  it('sign(accidental: Sign|Offset|NiceName): Sign', function() {
    var resultSigns = signs.map(function(s) {
      return $accidental.sign(s)
    })
    var resultNames = names.map(function(n) {
      return $accidental.sign(n)
    })
    var resultOffsets = offset.map(function(o) {
      return $accidental.sign(o)
    })
    assert.deepEqual(signs, resultSigns)
    assert.deepEqual(signs, resultNames)
    assert.deepEqual(signs, resultOffsets)
  })

  it('fromString(input)', function() {
    ''
      .replace(/[#＃]/, '\u266f')
      .replace(/b/g, '\u266d')
      .replace(/x/, '\u00d7')
      .match(/♭{1,3}|♯×|♯|×/)

    assert.equal($accidental.fromString('C#'), '\u266f')
    assert.equal($accidental.fromString('C＃'), '\u266f')
    assert.equal($accidental.fromString('C♯'), '\u266f')

    assert.equal($accidental.fromString('Cb'), '\u266d')
    assert.equal($accidental.fromString('C♭'), '\u266d')

    assert.equal($accidental.fromString('Cx'), '\u00d7')

    assert.equal($accidental.fromString('C♯×'), '♯×')
    assert.equal($accidental.fromString('C#×'), '♯×')
    assert.equal($accidental.fromString('C＃×'), '♯×')

    assert.equal($accidental.fromString('Cbbb'), '♭♭♭')

    assert.equal($accidental.fromString('Cbb'), '♭♭')
  })
})
