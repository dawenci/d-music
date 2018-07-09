'use strict'

var assert = require('assert')
var $scale = require('../dist/cjs/lib/scale')
var $pitch = require('../dist/cjs/lib/pitch')

var C0 = $pitch.makePitch('C')
var D0 = $pitch.makePitch('D')
var E0 = $pitch.makePitch('E')
var F0 = $pitch.makePitch('F')
var G0 = $pitch.makePitch('G')
var A0 = $pitch.makePitch('A')
var B0 = $pitch.makePitch('B')

var C1 = $pitch.makePitch('C1')
var D1 = $pitch.makePitch('D1')
var E1 = $pitch.makePitch('E1')
var F1 = $pitch.makePitch('F1')
var F1Sharp = $pitch.makePitch('F#1')
var G1 = $pitch.makePitch('G1')
var G1Sharp = $pitch.makePitch('G#1')
var A1 = $pitch.makePitch('A1')
var B1 = $pitch.makePitch('B1')

var pitches = [C0, D0, E0, F0, G0, A0, B0, C1, D1, E1, F1, G1, A1, B1]

var ionian = $scale.Ionian(C0)
var dorian = $scale.Dorian(D0)
var phrygian = $scale.Phrygian(E0)
var lydian = $scale.Lydian(F0)
var mixolydian = $scale.Mixolydian(G0)
var aeolian = $scale.Aeolian(A0)
var locrian = $scale.Locrian(B0)
var major = $scale.Major(C0)
var naturalMinor = $scale.NaturalMinor(A0)
var harmonicMinor = $scale.HarmonicMinor(A0)
var melodicMinor = $scale.MelodicMinor(A0)

var scales = [ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian]
var scales2 = [major, naturalMinor, harmonicMinor, melodicMinor]

describe('Scale 音阶模块 #######################', function() {
  it('scale.step(index)', function() {
    scales.forEach(function(scale, index) {
      assert.deepEqual(scale.step(0), undefined)
      assert.deepEqual(scale.step(9), undefined)
      assert.ok($pitch.equal(scale.step(1), pitches[index]))
      assert.ok($pitch.equal(scale.step(8), pitches[index + 7]))
    })
  })

  it('scale.tonic()', function() {
    scales.forEach(function(scale, index) {
      assert.ok($pitch.equal(scale.tonic(), pitches[index]))
    })
  })

  describe('音阶构造', function() {
    it('Ionian (Major)', function() {
      Array.prototype.forEach.call(major, function(pitch, idx) {
        assert.ok($pitch.equal(pitch, ionian[idx]))
      })
      assert.ok($pitch.equal(major[0], C0))
      assert.ok($pitch.equal(major[1], D0))
      assert.ok($pitch.equal(major[2], E0))
      assert.ok($pitch.equal(major[3], F0))
      assert.ok($pitch.equal(major[4], G0))
      assert.ok($pitch.equal(major[5], A0))
      assert.ok($pitch.equal(major[6], B0))
      assert.ok($pitch.equal(major[7], C1))
    })

    it('Dorian', function() {
      assert.ok($pitch.equal(dorian[0], D0))
      assert.ok($pitch.equal(dorian[1], E0))
      assert.ok($pitch.equal(dorian[2], F0))
      assert.ok($pitch.equal(dorian[3], G0))
      assert.ok($pitch.equal(dorian[4], A0))
      assert.ok($pitch.equal(dorian[5], B0))
      assert.ok($pitch.equal(dorian[6], C1))
      assert.ok($pitch.equal(dorian[7], D1))
    })

    it('Phrygian', function() {
      assert.ok($pitch.equal(phrygian[0], E0))
      assert.ok($pitch.equal(phrygian[1], F0))
      assert.ok($pitch.equal(phrygian[2], G0))
      assert.ok($pitch.equal(phrygian[3], A0))
      assert.ok($pitch.equal(phrygian[4], B0))
      assert.ok($pitch.equal(phrygian[5], C1))
      assert.ok($pitch.equal(phrygian[6], D1))
      assert.ok($pitch.equal(phrygian[7], E1))
    })

    it('Lydian', function() {
      assert.ok($pitch.equal(lydian[0], F0))
      assert.ok($pitch.equal(lydian[1], G0))
      assert.ok($pitch.equal(lydian[2], A0))
      assert.ok($pitch.equal(lydian[3], B0))
      assert.ok($pitch.equal(lydian[4], C1))
      assert.ok($pitch.equal(lydian[5], D1))
      assert.ok($pitch.equal(lydian[6], E1))
      assert.ok($pitch.equal(lydian[7], F1))
    })

    it('Mixolydian', function() {
      assert.ok($pitch.equal(mixolydian[0], G0))
      assert.ok($pitch.equal(mixolydian[1], A0))
      assert.ok($pitch.equal(mixolydian[2], B0))
      assert.ok($pitch.equal(mixolydian[3], C1))
      assert.ok($pitch.equal(mixolydian[4], D1))
      assert.ok($pitch.equal(mixolydian[5], E1))
      assert.ok($pitch.equal(mixolydian[6], F1))
      assert.ok($pitch.equal(mixolydian[7], G1))
    })

    it('Aeolian (Minor)', function() {
      Array.prototype.forEach.call(naturalMinor, function(note, idx) {
        assert.ok($pitch.equal(note, aeolian[idx]))
      })
      assert.ok($pitch.equal(naturalMinor[0], A0))
      assert.ok($pitch.equal(naturalMinor[1], B0))
      assert.ok($pitch.equal(naturalMinor[2], C1))
      assert.ok($pitch.equal(naturalMinor[3], D1))
      assert.ok($pitch.equal(naturalMinor[4], E1))
      assert.ok($pitch.equal(naturalMinor[5], F1))
      assert.ok($pitch.equal(naturalMinor[6], G1))
      assert.ok($pitch.equal(naturalMinor[7], A1))
    })

    it('Locrian', function() {
      assert.ok($pitch.equal(locrian[0], B0))
      assert.ok($pitch.equal(locrian[1], C1))
      assert.ok($pitch.equal(locrian[2], D1))
      assert.ok($pitch.equal(locrian[3], E1))
      assert.ok($pitch.equal(locrian[4], F1))
      assert.ok($pitch.equal(locrian[5], G1))
      assert.ok($pitch.equal(locrian[6], A1))
      assert.ok($pitch.equal(locrian[7], B1))
    })

    it('HarmonicMinor', function() {
      assert.ok($pitch.equal(harmonicMinor[0], A0))
      assert.ok($pitch.equal(harmonicMinor[1], B0))
      assert.ok($pitch.equal(harmonicMinor[2], C1))
      assert.ok($pitch.equal(harmonicMinor[3], D1))
      assert.ok($pitch.equal(harmonicMinor[4], E1))
      assert.ok($pitch.equal(harmonicMinor[5], F1))
      assert.ok($pitch.equal(harmonicMinor[6], G1Sharp))
      assert.ok($pitch.equal(harmonicMinor[7], A1))
    })

    it('MelodicMinor', function() {
      assert.ok($pitch.equal(melodicMinor[0], A0))
      assert.ok($pitch.equal(melodicMinor[1], B0))
      assert.ok($pitch.equal(melodicMinor[2], C1))
      assert.ok($pitch.equal(melodicMinor[3], D1))
      assert.ok($pitch.equal(melodicMinor[4], E1))
      assert.ok($pitch.equal(melodicMinor[5], F1Sharp))
      assert.ok($pitch.equal(melodicMinor[6], G1Sharp))
      assert.ok($pitch.equal(melodicMinor[7], A1))
    })
  })

  describe('音阶上行、下行', function() {
    it('旋律小调', function() {
      // 旋律小调
      var descending = melodicMinor.descending()
      assert.ok($pitch.equal(descending.step(1), A1))
      assert.ok($pitch.equal(descending.step(2), G1))
      assert.ok($pitch.equal(descending.step(3), F1))
      assert.ok($pitch.equal(descending.step(4), E1))
      assert.ok($pitch.equal(descending.step(5), D1))
      assert.ok($pitch.equal(descending.step(6), C1))
      assert.ok($pitch.equal(descending.step(7), B0))
      assert.ok($pitch.equal(descending.step(8), A0))
    })

    it('其他调式', function() {
      // 旋律小调除外（不是倒序），需要特殊判断
      var allScales = [
        ionian,
        dorian,
        phrygian,
        lydian,
        mixolydian,
        aeolian,
        locrian,
        major,
        naturalMinor,
        harmonicMinor
      ]
      var ascendingScales = allScales.map(function(scale) {
        return scale.ascending()
      })
      var descendingScales = allScales.map(function(scale) {
        return scale.descending()
      })

      var length = allScales.length
      var ascending
      var descending
      for (var i = 0; i < length; i += 1) {
        ascending = ascendingScales[i]
        descending = descendingScales[i]
        assert.ok($pitch.equal(ascending.step(1), descending.step(8)))
        assert.ok($pitch.equal(ascending.step(2), descending.step(7)))
        assert.ok($pitch.equal(ascending.step(3), descending.step(6)))
        assert.ok($pitch.equal(ascending.step(4), descending.step(5)))
        assert.ok($pitch.equal(ascending.step(5), descending.step(4)))
        assert.ok($pitch.equal(ascending.step(6), descending.step(3)))
        assert.ok($pitch.equal(ascending.step(7), descending.step(2)))
        assert.ok($pitch.equal(ascending.step(8), descending.step(1)))
      }
    })
  })

  describe('toString()', function() {
    it('toString', function() {
      assert.equal(major.toString(), 'C,D,E,F,G,A,B,C1')
      assert.equal(major.descending().toString(), 'C1,B,A,G,F,E,D,C')
    })
  })
})
