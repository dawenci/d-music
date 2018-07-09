'use strict'

var assert = require('assert')
var $interval = require('../dist/cjs/lib/interval/number')
var $pitch = require('../dist/cjs/lib/pitch')

describe('pitch 模块 #######################', function() {
  it('toIntervalStartWithC0(pitch: Pitch): ', function() {
    var expectedNumber = [1, 2, 3, 4, 5, 6, 7, 29, 30, 31, 32, 33, 34, 35]
    var expectedSemitone = [0, 2, 4, 5, 7, 9, 11, 48, 50, 52, 53, 55, 57, 59]
    var pitches = [
      { stepName: 'C', accidental: '\u266E', octave: 0 },
      { stepName: 'D', accidental: '\u266E', octave: 0 },
      { stepName: 'E', accidental: '\u266E', octave: 0 },
      { stepName: 'F', accidental: '\u266E', octave: 0 },
      { stepName: 'G', accidental: '\u266E', octave: 0 },
      { stepName: 'A', accidental: '\u266E', octave: 0 },
      { stepName: 'B', accidental: '\u266E', octave: 0 },

      { stepName: 'C', accidental: '\u266E', octave: 4 },
      { stepName: 'D', accidental: '\u266E', octave: 4 },
      { stepName: 'E', accidental: '\u266E', octave: 4 },
      { stepName: 'F', accidental: '\u266E', octave: 4 },
      { stepName: 'G', accidental: '\u266E', octave: 4 },
      { stepName: 'A', accidental: '\u266E', octave: 4 },
      { stepName: 'B', accidental: '\u266E', octave: 4 }
    ]
    var intervals = pitches.map(pitch => $pitch.toIntervalStartWithC0(pitch))

    intervals.forEach(function(interval, index) {
      assert.equal(interval.number, expectedNumber[index])
      assert.equal(interval.semitone, expectedSemitone[index])
    })
  })

  it('fromIntervalStartWithC0(pitch: Pitch): $accidental.Accidental', function() {
    var intervals = [
      { number: 1, semitone: 0 },
      { number: 1, semitone: 1 },
      { number: 1, semitone: 2 },
      { number: 2, semitone: 1 },
      { number: 2, semitone: 0 }
    ]
    var expected = [
      { stepName: 'C', accidental: 0, octave: 0 },
      { stepName: 'C', accidental: 'sharp', octave: 0 },
      { stepName: 'C', accidental: 'double sharp', octave: 0 },
      { stepName: 'D', accidental: 'flat', octave: 0 },
      { stepName: 'D', accidental: 'double flat', octave: 0 }
    ]
    var pitches = intervals.map(function(interval) {
      return $pitch.fromIntervalStartWithC0(interval)
    })
    pitches.forEach(function(pitch, index) {
      assert.ok($pitch.equal(pitch, expected[index]))
    })
  })

  it('isPitch(pitch: any): pitch is Pitch', function() {
    var pitches = [
      { stepName: 'C', accidental: 0 },
      { stepName: 'D', accidental: 0 },
      { stepName: 'E', accidental: 0 },
      { stepName: 'F', accidental: 0 },
      { stepName: 'G', accidental: 0 },
      { stepName: 'A', accidental: 0 },
      { stepName: 'B', accidental: 0 },

      { stepName: 'C', accidental: 0, octave: 4 },
      { stepName: 'D', accidental: 0, octave: 4 },
      { stepName: 'E', accidental: 0, octave: 4 },
      { stepName: 'F', accidental: 0, octave: 4 },
      { stepName: 'G', accidental: 0, octave: 4 },
      { stepName: 'A', accidental: 0, octave: 4 },
      { stepName: 'B', accidental: 0, octave: 4 },

      { stepName: 'B', accidental: -1, octave: 4 },
      { stepName: 'B', accidental: -2, octave: 4 },
      { stepName: 'B', accidental: 1, octave: 4 },
      { stepName: 'B', accidental: 2, octave: 4 }
    ]
    pitches.forEach(pitch => {
      assert.ok($pitch.isPitch(pitch))
    })

    assert.ok(!$pitch.isPitch({ stepName: 'C', accidental: -1 }))
    assert.ok(!$pitch.isPitch({ stepName: 'C', accidental: -3, octave: 4 }))
    assert.ok(!$pitch.isPitch({ stepName: 'C', accidental: 3, octave: 4 }))
  })

  it('toMidiNumber(pitch)', function() {
    assert.equal($pitch.toMidiNumber({ stepName: 'C', accidental: -1, octave: 0 }), undefined)
    assert.equal($pitch.toMidiNumber({ stepName: 'C', accidental: 0, octave: 0 }), 12)
    assert.equal($pitch.toMidiNumber({ stepName: 'G', accidental: 0, octave: 9 }), 127)
    assert.equal($pitch.toMidiNumber({ stepName: 'G', accidental: 1, octave: 10 }), undefined)
  })

  it('toPianoKeyNumber(pitch)', function() {
    assert.equal($pitch.toPianoKeyNumber({ stepName: 'A', accidental: -1, octave: 0 }), undefined)
    assert.equal($pitch.toPianoKeyNumber({ stepName: 'A', accidental: 0, octave: 0 }), 1)
    assert.equal($pitch.toPianoKeyNumber({ stepName: 'C', accidental: 0, octave: 8 }), 88)
    assert.equal($pitch.toPianoKeyNumber({ stepName: 'C', accidental: 1, octave: 8 }), undefined)
  })

  it('frequency(pitch, toFixed)', function() {
    assert.equal($pitch.frequency({ stepName: 'C', accidental: 0 }, 2), 16.35)
    assert.equal($pitch.frequency({ stepName: 'A', accidental: 0, octave: 4 }), 440)
  })

  it('name(pitch, format)', function() {
    var pitchNames = ['C', 'C\u266F', 'C\u00D7', 'D', 'D\u266D', 'D\u266D\u266D']
    var pitchDatas = [
      { stepName: 'C', accidental: 0 },
      { stepName: 'C', accidental: 1 },
      { stepName: 'C', accidental: 2 },
      { stepName: 'D', accidental: 0 },
      { stepName: 'D', accidental: -1 },
      { stepName: 'D', accidental: -2 }
    ].map(function(pitch) {
      return $pitch.name(pitch)
    })
    assert.deepEqual(pitchNames, pitchDatas)
  })

  it('simplify(pitch)', function() {
    var C0 = { stepName: 'C', accidental: 0, octave: 0 }
    var C1 = { stepName: 'C', accidental: 0, octave: 1 }
    var Cb1 = { stepName: 'C', accidental: -1, octave: 1 }
    var C2 = { stepName: 'C', accidental: 0, octave: 2 }
    var Cb2 = { stepName: 'C', accidental: -1, octave: 1 }
    var D0 = { stepName: 'D', accidental: 0, octave: 0 }
    var D1 = { stepName: 'D', accidental: 0, octave: 1 }

    assert.ok($pitch.equal($pitch.simplify(C1), C0))
    assert.ok($pitch.equal($pitch.simplify(C2), C0))
    assert.ok($pitch.equal($pitch.simplify(Cb2), Cb1))
    assert.ok($pitch.equal($pitch.simplify(D1), D0))
  })

  it('equal(pitch1, pitch2): boolean', function() {
    var pitches = [
      { stepName: 'C', accidental: 0 },
      { stepName: 'D', accidental: 0 },
      { stepName: 'E', accidental: 0 },
      { stepName: 'F', accidental: 0 },
      { stepName: 'G', accidental: 0 },
      { stepName: 'A', accidental: 0 },
      { stepName: 'B', accidental: 0 },
      { stepName: 'C', accidental: 0, octave: 1 },
      { stepName: 'D', accidental: 0, octave: 1 },
      { stepName: 'E', accidental: 0, octave: 1 },
      { stepName: 'F', accidental: 0, octave: 1 },
      { stepName: 'G', accidental: 0, octave: 1 },
      { stepName: 'A', accidental: 0, octave: 1 },
      { stepName: 'B', accidental: 0, octave: 1 },
      { stepName: 'C', accidental: 0, octave: 2 }
    ]
    var pitches2 = JSON.parse(JSON.stringify(pitches))
    pitches.forEach(function(pitch, index) {
      assert.ok($pitch.equal(pitch, pitches2[index]))
    })
  })

  it('simpleEqual(pitch1, pitch2)', function() {
    var C0 = { stepName: 'C', accidental: 0, octave: 0 }
    var C1 = { stepName: 'C', accidental: 0, octave: 1 }
    var Cb1 = { stepName: 'C', accidental: -1, octave: 1 }
    var C2 = { stepName: 'C', accidental: 0, octave: 2 }
    var Cb2 = { stepName: 'C', accidental: -1, octave: 1 }
    var D0 = { stepName: 'D', accidental: 0, octave: 0 }
    var D1 = { stepName: 'D', accidental: 0, octave: 1 }

    assert.ok($pitch.simpleEqual(C1, C0))
    assert.ok($pitch.simpleEqual(C2, C1))
    assert.ok($pitch.simpleEqual(Cb2, Cb1))
    assert.ok($pitch.simpleEqual(D1, D0))
  })

  it('semitoneEqual(pitch1, pitch2)', function() {
    var CDoubleSharp = { stepName: 'C', accidental: 2, octave: 0 }
    var D = { stepName: 'D', accidental: 0, octave: 0 }
    var EDoubleFlat = { stepName: 'E', accidental: -2, octave: 0 }

    assert.ok($pitch.semitoneEqual(CDoubleSharp, D))
    assert.ok($pitch.semitoneEqual(EDoubleFlat, D))
    assert.ok($pitch.semitoneEqual(EDoubleFlat, CDoubleSharp))
  })

  it('enharmonicNotes(semitone)', function() {
    var stepString = $pitch
      .enharmonicNotes(0)
      .map(pitch => {
        return pitch.stepName
      })
      .join()
    assert.equal(stepString, 'C,B,D')
  })

  it('fromString(pitchName)', function() {
    assert.ok($pitch.equal({ stepName: 'C', accidental: 0 }, $pitch.fromString('C')))
    assert.ok($pitch.equal({ stepName: 'C', accidental: 0, octave: 4 }, $pitch.fromString('C4')))
    assert.ok($pitch.equal({ stepName: 'B', accidental: 1 }, $pitch.fromString('B#')))
    assert.ok($pitch.equal({ stepName: 'B', accidental: 1, octave: 4 }, $pitch.fromString('B#4')))
    assert.ok($pitch.equal({ stepName: 'C', accidental: 2 }, $pitch.fromString('Cx')))
    assert.ok($pitch.equal({ stepName: 'C', accidental: 2, octave: 4 }, $pitch.fromString('Cx4')))
    assert.ok($pitch.equal({ stepName: 'C', accidental: -2, octave: 1 }, $pitch.fromString('Cbb1')))
    assert.ok($pitch.equal({ stepName: 'C', accidental: -2, octave: 4 }, $pitch.fromString('Cbb4')))
  })

  it('makePitch(input)', function() {
    const C4 = { stepName: 'C', accidental: 0, octave: 4 }
    assert.ok($pitch.equal($pitch.makePitch({ stepName: 'C', accidental: 0, octave: 4 }), C4))
    assert.ok($pitch.equal($pitch.makePitch('C4'), C4))
  })
})
