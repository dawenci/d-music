'use strict'

var assert = require('assert')
var $number = require('../dist/cjs/lib/interval/number')

describe('interval/number 模块 #######################', function() {
  var NAMES = [
    'unison',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'octave',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth',
    'twentieth',
    'twenty-first',
    'thirtieth'
  ]

  var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 30]

  var ORDINALS = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8ve',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21th',
    '30th'
  ]

  it('is1458(number: number): boolean', function() {
    var expected, actual
    expected = [
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true
    ]
    actual = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function(number) {
      return $number.is1458(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('isCompound(number: number): boolean', function() {
    var expected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ]
    var actual = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function(number) {
      return $number.isCompound(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('isSimple(number: number): boolean', function() {
    var expected = [
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
    var actual = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function(number) {
      return $number.isSimple(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('isOctaves(number: number): boolean, function()', function() {
    var expected = [false, false, true, false, true]
    var actual = [1, 7, 8, 9, 15].map(function(number) {
      return $number.isOctaves(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('toOrdinal(number: number): string|undefined', function() {
    var expected = [
      undefined,
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8ve',
      '9th',
      '99th',
      undefined
    ]
    var actual = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 99, 100].map(function(number) {
      return $number.toOrdinal(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('fromOrdinal(ordinal: string): number|undefined', function() {
    var expected = [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 99, undefined]
    var actual = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8ve', '9th', '99th', '100th'].map(
      function(number) {
        return $number.fromOrdinal(number)
      }
    )
    assert.deepEqual(expected, actual)
  })

  it('toOrdinalWord(number: number): string|undefined', function() {
    var expected = [
      undefined,
      'unison',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'octave',
      'ninth',
      'tenth',
      'eleventh',
      'twelfth',
      'thirteenth',
      'fourteenth',
      'fifteenth',
      'sixteenth',
      'seventeenth',
      'eighteenth',
      'nineteenth',
      'twentieth',
      'twenty-first',
      'thirtieth',
      'fortieth',
      'fiftieth',
      'sixtieth',
      'seventieth',
      'eightieth',
      'ninetieth',
      'ninety-ninth',
      undefined
    ]
    var actual = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      99,
      100
    ].map(function(number) {
      return $number.toOrdinalWord(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('fromOrdinalWord(ordinalWord: string): number|undefined', function() {
    var expected = [
      undefined,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      99,
      undefined
    ]
    var actual = [
      undefined,
      'unison',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'octave',
      'ninth',
      'tenth',
      'eleventh',
      'twelfth',
      'thirteenth',
      'fourteenth',
      'fifteenth',
      'sixteenth',
      'seventeenth',
      'eighteenth',
      'nineteenth',
      'twentieth',
      'twenty-first',
      'thirtieth',
      'fortieth',
      'fiftieth',
      'sixtieth',
      'seventieth',
      'eightieth',
      'ninetieth',
      'ninety-ninth',
      undefined
    ].map(function(number) {
      return $number.fromOrdinalWord(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('fromString(input: string): number|undefined', function() {
    assert.equal(1, $number.fromString('perfect unison'))
    assert.equal(1, $number.fromString('perfect first'))
    assert.equal(1, $number.fromString('perfect 1st'))
    assert.equal(1, $number.fromString('P1'))

    assert.equal(8, $number.fromString('perfect octave'))
    assert.equal(8, $number.fromString('perfect eighth'))
    assert.equal(8, $number.fromString('P8'))

    assert.equal(2, $number.fromString('major second'))
    assert.equal(2, $number.fromString('major 2nd'))
    assert.equal(2, $number.fromString('major M2'))

    assert.equal(3, $number.fromString('major third'))
    assert.equal(3, $number.fromString('major 3rd'))
    assert.equal(3, $number.fromString('major M3'))

    assert.equal(10, $number.fromString('major tenth'))
    assert.equal(20, $number.fromString('major twentieth'))
    assert.equal(21, $number.fromString('major twenty-first'))
  })
})
