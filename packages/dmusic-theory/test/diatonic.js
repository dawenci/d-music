'use strict'

var assert = require('assert')
var $diatonic = require('../dist/cjs/lib/diatonic')

describe('diatonic 模块 #######################', function() {
  it('isStepName(stepName: string): boolean', function() {
    var expected = [true, true, true, true, true, true, true, false]
    var actual = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(function(name) {
      return $diatonic.isStepName(name)
    })
    assert.deepEqual(expected, actual)
  })

  it('isDiatonicSemitone(semitone: number): boolean', function() {
    var expected = [
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true
    ]
    var actual = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function(semitone) {
      return $diatonic.isDiatonicSemitone(semitone)
    })
    assert.deepEqual(expected, actual)
  })

  it('numberToStepName(diatonicNumber: number): StepName', function() {
    var expected = 'C,D,E,F,G,A,B,C,D,E,F,G,A,B,C'.split(',')
    var actual = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function(number) {
      return $diatonic.numberToStepName(number)
    })
    assert.deepEqual(actual, expected)
  })

  it('stepNameToNumber(stepName: StepName): StepNumber', function() {
    var names = 'C,D,E,F,G,A,B,C,D,E,F,G,A,B,C'.split(',')
    var actual = names.map(function(name) {
      return $diatonic.stepNameToNumber(name)
    })
    var expected = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1]
    assert.deepEqual(actual, expected)
  })

  it('numberToSemitone(number: number): number', function() {
    var expected = [0, 2, 4, 5, 7, 9, 11, 12, 14, 24, 26]
    var actual = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16].map(function(number) {
      return $diatonic.numberToSemitone(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('semitoneToNumber(semitone: number): number|undefined', function() {
    var semitones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    var actual = semitones.map(function(semitone) {
      return $diatonic.semitoneToNumber(semitone)
    })
    var expected = [
      1,
      undefined,
      2,
      undefined,
      3,
      4,
      undefined,
      5,
      undefined,
      6,
      undefined,
      7,
      8,
      undefined,
      9,
      undefined
    ]

    assert.deepEqual(expected, actual)
  })

  it('numberOctaves(number: number): number', function() {
    var expected = [0, 0, 1, 1, 2]
    var actual = [1, 7, 8, 9, 15].map(function(number) {
      return $diatonic.numberOctaves(number)
    })
    assert.deepEqual(expected, actual)
  })

  it('numberCompound(number: number): numberCompound', function() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    var actual = numbers.map(function(number) {
      return $diatonic.numberCompound(number)
    })
    var expected = [
      { octave: 0, number: 1 },
      { octave: 0, number: 2 },
      { octave: 0, number: 3 },
      { octave: 0, number: 4 },
      { octave: 0, number: 5 },
      { octave: 0, number: 6 },
      { octave: 0, number: 7 },
      { octave: 1, number: 1 },
      { octave: 1, number: 2 },
      { octave: 1, number: 3 },
      { octave: 1, number: 4 },
      { octave: 1, number: 5 },
      { octave: 1, number: 6 },
      { octave: 1, number: 7 },
      { octave: 2, number: 1 }
    ]
    assert.deepEqual(expected, actual)
  })

  it('numberSimplify(numberCompound: numberCompound): number', function() {
    assert.equal($diatonic.numberSimplify({ octave: 0, number: 1 }), 1)
    assert.equal($diatonic.numberSimplify({ octave: 1, number: 1 }), 8)
  })
})
