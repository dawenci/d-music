'use strict'

var assert = require('assert')
var $semitone = require('../dist/cjs/lib/interval/semitone')

describe('interval/semitone 模块 #######################', function() {
  it('compound(semitone)', function() {
    var semitones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    var actual = semitones.map(semitone => $semitone.compound(semitone))
    var expectedOctaves = actual.map(o => o.octave).join()
    var expectedSemitones = actual.map(o => o.semitone).join()
    assert.equal(expectedOctaves, '0,0,0,0,0,0,0,0,0,0,0,1,1,1,1')
    assert.equal(expectedSemitones, '1,2,3,4,5,6,7,8,9,10,11,0,1,2,3')
  })

  it('simplify(compound)', function() {
    assert.equal(
      $semitone.simplify({
        octave: 0,
        semitone: 0
      }),
      0
    )
    assert.equal(
      $semitone.simplify({
        octave: 1,
        semitone: 0
      }),
      12
    )
  })
})
