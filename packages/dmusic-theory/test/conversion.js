'use strict'

var assert = require('assert')
var $conversion = require('../dist/cjs/lib/conversion')

describe('interval/convert 模块 #######################', function() {
  it('frequencyRatioToSemitones(ratio: number, toFixed?:number): number', function() {
    // A4/A3, 12 semitones
    assert.equal(12, $conversion.frequencyRatioToSemitones(2 / 1))

    // A4/A4, 0 semitone
    assert.equal(0, $conversion.frequencyRatioToSemitones(1 / 1))

    // A3/A4, -12 semitones
    assert.equal(-12, $conversion.frequencyRatioToSemitones(1 / 2))

    // D/C, 2 semitones
    assert.ok($conversion.frequencyRatioToSemitones(293.66 / 261.63) !== 2)
    assert.equal(2, $conversion.frequencyRatioToSemitones(293.66 / 261.63, 0))
  })

  it('semitonesToFrequencyRatio(semitones: number, toFixed?:number): number', function() {
    assert.equal($conversion.semitonesToFrequencyRatio(12), 2 / 1)
    assert.equal($conversion.semitonesToFrequencyRatio(0), 1 / 1)
    assert.equal($conversion.semitonesToFrequencyRatio(-12), 1 / 2)
    assert.equal(293.66 / 261.63, $conversion.semitonesToFrequencyRatio(1.9994254646089504))
  })

  it('semitonesToCents(semitones)', function() {
    assert.equal($conversion.semitonesToCents(12), 1200)
    assert.equal($conversion.semitonesToCents(0), 0)
    assert.equal($conversion.semitonesToCents(-12), -1200)
  })

  it('centsToSemitones(cents)', function() {
    assert.equal($conversion.centsToSemitones(1200), 12)
    assert.equal($conversion.centsToSemitones(0), 0)
    assert.equal($conversion.centsToSemitones(-1200), -12)
  })
})
