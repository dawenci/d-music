'use strict'

var assert = require('assert')
var $quality = require('../dist/cjs/lib/interval/quality')

describe('interval/quality 模块 #######################', function() {
  var niceName1458 = [
    'quadruply diminished',
    'triply diminished',
    'doubly diminished',
    'diminished',
    'perfect',
    'augmented',
    'doubly augmented',
    'triply augmented',
    'quadruply augmented'
  ]
  var prefix1458 = ['dddd', 'ddd', 'dd', 'd', 'P', 'A', 'AA', 'AAA', 'AAAA']
  var offset1458 = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

  var niceName2367 = [
    'quadruply diminished',
    'triply diminished',
    'doubly diminished',
    'diminished',
    'minor',
    'major',
    'augmented',
    'doubly augmented',
    'triply augmented',
    'quadruply augmented'
  ]
  var prefix2367 = ['dddd', 'ddd', 'dd', 'd', 'm', 'M', 'A', 'AA', 'AAA', 'AAAA']
  var offset2367 = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]

  it('isQuality(qualityName: string, is1458: boolean = false): qualityName is Name', function() {
    niceName1458.forEach(function(name) {
      assert.ok($quality.isQuality(name, true))
    })
    niceName2367.forEach(function(name) {
      assert.ok($quality.isQuality(name, false))
    })
    prefix1458.forEach(function(name) {
      assert.ok($quality.isQuality(name, true))
    })
    prefix2367.forEach(function(name) {
      assert.ok($quality.isQuality(name, false))
    })
    assert.ok(!$quality.isQuality('minor', true))
    assert.ok(!$quality.isQuality('major', true))
    assert.ok(!$quality.isQuality('perfect', false))

    offset1458.forEach(function(offset) {
      assert.ok($quality.isQuality(offset, true))
    })
    offset2367.forEach(function(offset) {
      assert.ok($quality.isQuality(offset, false))
    })
    assert.ok(!$quality.isQuality(-5, true))
  })

  it('invert(quality: Name|Offset, is1458:boolean = false): Name|Offset', function() {
    var expected = [
      'minor',
      'major',
      'diminished',
      'augmented',
      'perfect',
      'doubly diminished',
      'doubly augmented',
      'triply augmented',
      'triply diminished',
      'quadruply diminished',
      'quadruply augmented'
    ]
    var actual = [
      'major',
      'minor',
      'augmented',
      'diminished',
      'perfect',
      'doubly augmented',
      'doubly diminished',
      'triply diminished',
      'triply augmented',
      'quadruply augmented',
      'quadruply diminished'
    ].map(function(q) {
      if (q === 'perfect') return $quality.invert(q, true)
      return $quality.invert(q)
    })

    assert.deepEqual(expected, actual)

    expected = ['m', 'M', 'd', 'A', 'P', 'dd', 'AA', 'AAA', 'ddd', 'dddd', 'AAAA']
    actual = ['M', 'm', 'A', 'd', 'P', 'AA', 'dd', 'ddd', 'AAA', 'AAAA', 'dddd'].map(function(q) {
      if (q === 'P') return $quality.invert(q, true)
      return $quality.invert(q)
    })
    assert.deepEqual(expected, actual)
  })

  it('offset(quality: Name, is1458: boolean = false): Offset', function() {
    var actual1 = niceName1458.map(function(niceName) {
      return $quality.offset(niceName, true)
    })
    var actual2 = prefix1458.map(function(prefix) {
      return $quality.offset(prefix, true)
    })
    var actual3 = offset1458.map(function(offset) {
      return $quality.offset(offset, true)
    })
    assert.deepEqual(offset1458, actual1)
    assert.deepEqual(offset1458, actual2)
    assert.deepEqual(offset1458, actual3)

    actual1 = niceName2367.map(function(niceName) {
      return $quality.offset(niceName)
    })
    actual2 = prefix2367.map(function(prefix) {
      return $quality.offset(prefix)
    })
    actual3 = offset2367.map(function(offset) {
      return $quality.offset(offset)
    })
    assert.deepEqual(offset2367, actual1)
    assert.deepEqual(offset2367, actual2)
    assert.deepEqual(offset2367, actual3)
  })

  it('prefix(quality: Name|Offset, is1458: boolean = false): PrefixName', function() {
    var actual1 = niceName1458.map(function(niceName) {
      return $quality.prefix(niceName, true)
    })
    var actual2 = prefix1458.map(function(prefix) {
      return $quality.prefix(prefix, true)
    })
    var actual3 = offset1458.map(function(offset) {
      return $quality.prefix(offset, true)
    })
    assert.deepEqual(prefix1458, actual1)
    assert.deepEqual(prefix1458, actual2)
    assert.deepEqual(prefix1458, actual3)

    actual1 = niceName2367.map(function(niceName) {
      return $quality.prefix(niceName)
    })
    actual2 = prefix2367.map(function(prefix) {
      return $quality.prefix(prefix)
    })
    actual3 = offset2367.map(function(offset) {
      return $quality.prefix(offset)
    })
    assert.deepEqual(prefix2367, actual1)
    assert.deepEqual(prefix2367, actual2)
    assert.deepEqual(prefix2367, actual3)
  })

  it('niceName(quality: Name|Offset, is1458: boolean = false): NiceName', function() {
    var actual1 = niceName1458.map(function(niceName) {
      return $quality.niceName(niceName, true)
    })
    var actual2 = prefix1458.map(function(prefix) {
      return $quality.niceName(prefix, true)
    })
    var actual3 = offset1458.map(function(offset) {
      return $quality.niceName(offset, true)
    })
    assert.deepEqual(niceName1458, actual1)
    assert.deepEqual(niceName1458, actual2)
    assert.deepEqual(niceName1458, actual3)
    actual1 = niceName2367.map(function(niceName) {
      return $quality.niceName(niceName)
    })
    actual2 = prefix2367.map(function(prefix) {
      return $quality.niceName(prefix)
    })
    actual3 = offset2367.map(function(offset) {
      return $quality.niceName(offset)
    })
    assert.deepEqual(niceName2367, actual1)
    assert.deepEqual(niceName2367, actual2)
    assert.deepEqual(niceName2367, actual3)
  })

  it('fromString(input: string, is1458: boolean): Name|undefined', function() {
    assert.equal('P', $quality.fromString('P1', true))
    assert.equal('M', $quality.fromString('M2', false))
    assert.equal('m', $quality.fromString('m2', false))
    assert.equal('A', $quality.fromString('A2', false))
    assert.equal('AA', $quality.fromString('AA2', false))
    assert.equal('AAA', $quality.fromString('AAA2', false))
    assert.equal('AAAA', $quality.fromString('AAAA2', false))
    assert.equal('d', $quality.fromString('d5', true))
    assert.equal('dd', $quality.fromString('dd5', true))
    assert.equal('ddd', $quality.fromString('ddd5', true))
    assert.equal('dddd', $quality.fromString('dddd5', true))

    assert.equal('perfect', $quality.fromString('perfect unison', true))
    assert.equal('major', $quality.fromString('major second', false))
    assert.equal('minor', $quality.fromString('minor 2nd', false))
    assert.equal('augmented', $quality.fromString('augmented 2nd', false))
    assert.equal('doubly augmented', $quality.fromString('doubly augmented 2nd', false))
    assert.equal('triply augmented', $quality.fromString('triply augmented 2nd', false))
    assert.equal('quadruply augmented', $quality.fromString('quadruply augmented 2nd', false))

    assert.equal('diminished', $quality.fromString('diminished 5th', true))
    assert.equal('doubly diminished', $quality.fromString('doubly diminished 5th', true))
    assert.equal('triply diminished', $quality.fromString('triply diminished 5th', true))
    assert.equal('quadruply diminished', $quality.fromString('quadruply diminished 5th', true))

    assert.equal('diminished', $quality.fromString('diminished 5th', true))
    assert.equal('doubly diminished', $quality.fromString('doubly-diminished 5th', true))
    assert.equal('triply diminished', $quality.fromString('triply-diminished 5th', true))
    assert.equal('quadruply diminished', $quality.fromString('quadruply-diminished 5th', true))
  })
})
