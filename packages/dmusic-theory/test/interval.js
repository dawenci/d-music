'use strict'

var assert = require('assert')
var $interval = require('../dist/cjs/lib/interval')

describe('interval 模块 #######################', function() {
  it('isInterval(interval: any): interval is Interval', function() {
    assert.ok($interval.isInterval({ number: 1, quality: 'perfect' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'augmented' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'doubly augmented' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'triply augmented' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'quadruply augmented' }))
    assert.ok(!$interval.isInterval({ number: 1, quality: 'diminished' }))
    assert.ok(!$interval.isInterval({ number: 2, quality: 'doubly diminished' }))
    assert.ok($interval.isInterval({ number: 3, quality: 'triply diminished' }))
    assert.ok(!$interval.isInterval({ number: 3, quality: 'quadruply diminished' }))

    assert.ok($interval.isInterval({ number: 1, quality: 'P' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'A' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'AA' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'AAA' }))
    assert.ok($interval.isInterval({ number: 1, quality: 'AAAA' }))
    assert.ok(!$interval.isInterval({ number: 1, quality: 'd' }))
    assert.ok(!$interval.isInterval({ number: 1, quality: 'dd' }))
    assert.ok(!$interval.isInterval({ number: 1, quality: 'dddd' }))
    assert.ok(!$interval.isInterval({ number: 1, quality: 'dddd' }))

    assert.ok($interval.isInterval({ number: 1, semitone: 0 }))
    assert.ok($interval.isInterval({ number: 1, semitone: 1 }))
    assert.ok($interval.isInterval({ number: 1, semitone: 2 }))
    assert.ok($interval.isInterval({ number: 1, semitone: 3 }))
    assert.ok($interval.isInterval({ number: 1, semitone: 4 }))
    assert.ok(!$interval.isInterval({ number: 1, semitone: -1 }))
    assert.ok(!$interval.isInterval({ number: 2, semitone: -1 }))
    assert.ok($interval.isInterval({ number: 3, semitone: 0 }))
    assert.ok(!$interval.isInterval({ number: 3, semitone: -1 }))

    assert.ok($interval.isInterval({ number: 8, quality: 'diminished' }))
    assert.ok($interval.isInterval({ number: 8, semitone: 11 }))
  })

  it('quality(interval)', function() {
    var expected = [0, 1, 2, 3, 4, -1, -2, -3, -4, -1, 0, 0, 0]
    // var expected2 = ['P','A','AA','AAA','AAAA','d','dd','ddd','dddd','m','M','M','P']
    var intervals = [
      { number: 1, semitone: 0 },
      { number: 1, semitone: 1 },
      { number: 1, semitone: 2 },
      { number: 1, semitone: 3 },
      { number: 1, semitone: 4 },
      { number: 8, semitone: 11 },
      { number: 8, semitone: 10 },
      { number: 8, semitone: 9 },
      { number: 8, semitone: 8 },
      { number: 2, semitone: 1 },
      { number: 2, semitone: 2 },
      { number: 9, semitone: 14 },
      { number: 15, semitone: 24 }
    ]
    var actual = intervals.map(interval => {
      return $interval.quality(interval)
    })
    assert.deepEqual(expected, actual)
  })

  it('semitones(interval: Interval): number', function() {
    var expected = [0, 1, 0, 1, 2, 11, 12, 24]
    var actual = [
      { number: 1, quality: 'perfect' },
      { number: 1, quality: 'augmented' },
      { number: 2, quality: 'diminished' },
      { number: 2, quality: 'minor' },
      { number: 2, quality: 'major' },
      { number: 8, quality: 'diminished' },
      { number: 9, quality: 'diminished' },
      { number: 15, quality: 'perfect' }
    ].map(interval => {
      return $interval.semitones(interval)
    })
    assert.deepEqual(expected, actual)
  })

  it('numbers(semitone: number, quality:string): number|undefined', function() {
    assert.ok($interval.numbers(0, 'augmented') === undefined)
    assert.ok($interval.numbers(0, 'doubly augmented') === undefined)
    assert.ok($interval.numbers(0, 'triply augmented') === undefined)
    assert.ok($interval.numbers(0, 'quadruply augmented') === undefined)
    assert.ok($interval.numbers(0, 'doubly diminished') === undefined)
    assert.ok($interval.numbers(0, 'quadruply diminished') === undefined)

    assert.ok($interval.numbers(0, 'perfect') === 1)
    assert.ok($interval.numbers(0, 'diminished') === 2)
    assert.ok($interval.numbers(0, 'triply diminished') === 3)
    assert.ok($interval.numbers(1, 'quadruply diminished') === 4)
    assert.ok($interval.numbers(0, 'perfect') === 1)
  })

  it('equal(interval1: Interval, interval2: Interval): boolean', function() {
    var expected
    var intervals1 = [
      { number: 1, semitone: 0 },
      { number: 2, semitone: 2 },
      { number: 3, semitone: 4 },
      { number: 4, semitone: 5 },
      { number: 5, semitone: 7 },
      { number: 6, semitone: 9 },
      { number: 7, semitone: 11 },
      { number: 8, semitone: 12 },
      { number: 9, semitone: 14 },
      { number: 10, semitone: 16 },
      { number: 11, semitone: 17 },
      { number: 12, semitone: 19 },
      { number: 13, semitone: 21 },
      { number: 14, semitone: 23 },
      { number: 15, semitone: 24 }
    ]
    var intervals2 = [
      { number: 1, quality: 'P' },
      { number: 2, quality: 'M' },
      { number: 3, quality: 'M' },
      { number: 4, quality: 'P' },
      { number: 5, quality: 'P' },
      { number: 6, quality: 'M' },
      { number: 7, quality: 'M' },
      { number: 8, quality: 'P' },
      { number: 9, quality: 'M' },
      { number: 10, quality: 'M' },
      { number: 11, quality: 'P' },
      { number: 12, quality: 'P' },
      { number: 13, quality: 'M' },
      { number: 14, quality: 'M' },
      { number: 15, quality: 'P' }
    ]
    intervals1.forEach(function(i1, index) {
      assert.ok($interval.equal(i1, intervals2[index]))
    })
    assert.ok(!$interval.equal({ number: 1, semitone: 0 }, { number: 8, semitone: 12 }))
  })

  it('simpleEqual(interval1: Interval, interval2: Interval): boolean', function() {
    var P1 = { number: 1, semitone: 0 }
    var M2 = { number: 2, semitone: 2 }
    var M3 = { number: 3, semitone: 4 }
    var P4 = { number: 4, semitone: 5 }
    var P5 = { number: 5, semitone: 7 }
    var M6 = { number: 6, semitone: 9 }
    var M7 = { number: 7, semitone: 11 }
    var P8 = { number: 8, semitone: 12 }
    var M9 = { number: 9, semitone: 14 }
    var M10 = { number: 10, semitone: 16 }
    var P11 = { number: 11, semitone: 17 }
    var P12 = { number: 12, semitone: 19 }
    var M13 = { number: 13, semitone: 21 }
    var M14 = { number: 14, semitone: 23 }
    var P15 = { number: 15, semitone: 24 }
    var M16 = { number: 16, semitone: 26 }
    var M17 = { number: 17, semitone: 28 }
    var P18 = { number: 18, semitone: 29 }
    var P19 = { number: 19, semitone: 31 }
    var M20 = { number: 20, semitone: 33 }
    var M21 = { number: 21, semitone: 35 }
    var P22 = { number: 22, semitone: 36 }

    var expected = [P1, M2, M3, P4, P5, M6, M7, P8, M2, M3, P4, P5, M6, M7, P1, M2, M3, P4, P5, M6, M7, P1]
    ;[
      P1,
      M2,
      M3,
      P4,
      P5,
      M6,
      M7,
      P8,
      M9,
      M10,
      P11,
      P12,
      M13,
      M14,
      P15,
      M16,
      M17,
      P18,
      P19,
      M20,
      M21,
      P22
    ].forEach(function(interval, index) {
      assert.ok($interval.simpleEqual(interval, expected[index]))
    })
  })

  it('semitoneEqual(interval1: Interval, interval2: Interval): boolean', function() {
    assert.ok(!$interval.semitoneEqual({ number: 1, semitone: 0 }, { number: 1, semitone: 1 }))
    assert.ok($interval.semitoneEqual({ number: 1, semitone: 0 }, { number: 1, semitone: 0 }))
    assert.ok($interval.semitoneEqual({ number: 1, semitone: 0 }, { number: 2, semitone: 0 }))
    assert.ok($interval.semitoneEqual({ number: 1, semitone: 0 }, { number: 3, semitone: 0 }))
  })

  it('increaseOctave(interval: Interval, times: number = 1): Interval', function() {
    var sP1 = { number: 1, semitone: 0 }
    var qP1 = { number: 1, quality: 'P' }
    assert.deepEqual({ number: 1, semitone: 0 }, $interval.increaseOctave(sP1, 0))
    assert.deepEqual({ number: 1, quality: 'P' }, $interval.increaseOctave(qP1, 0))
    assert.deepEqual({ number: 8, semitone: 12 }, $interval.increaseOctave(sP1))
    assert.deepEqual({ number: 8, quality: 'P' }, $interval.increaseOctave(qP1))
    assert.deepEqual({ number: 8, semitone: 12 }, $interval.increaseOctave(sP1, 1))
    assert.deepEqual({ number: 8, quality: 'P' }, $interval.increaseOctave(qP1, 1))
    assert.deepEqual({ number: 15, semitone: 24 }, $interval.increaseOctave(sP1, 2))
    assert.deepEqual({ number: 15, quality: 'P' }, $interval.increaseOctave(qP1, 2))
  })

  it('decreaseOctave(interval: Interval, times: number = 1): Interval', function() {
    var sP1 = { number: 15, semitone: 24 }
    var qP1 = { number: 15, quality: 'P' }
    assert.deepEqual({ number: 15, semitone: 24 }, $interval.decreaseOctave(sP1, 0))
    assert.deepEqual({ number: 15, quality: 'P' }, $interval.decreaseOctave(qP1, 0))
    assert.deepEqual({ number: 8, semitone: 12 }, $interval.decreaseOctave(sP1))
    assert.deepEqual({ number: 8, quality: 'P' }, $interval.decreaseOctave(qP1))
    assert.deepEqual({ number: 8, semitone: 12 }, $interval.decreaseOctave(sP1, 1))
    assert.deepEqual({ number: 8, quality: 'P' }, $interval.decreaseOctave(qP1, 1))
    assert.deepEqual({ number: 1, semitone: 0 }, $interval.decreaseOctave(sP1, 2))
    assert.deepEqual({ number: 1, quality: 'P' }, $interval.decreaseOctave(qP1, 2))

    assert.deepEqual({ number: 8, quality: 'd' }, $interval.decreaseOctave({ number: 8, quality: 'd' }))
    assert.deepEqual({ number: 8, quality: 'd' }, $interval.decreaseOctave({ number: 15, quality: 'd' }, 10))
  })

  it('rationalize(interval: Interval): Interval', function() {
    var actual = $interval.rationalize({ number: 1, semitone: 0 })
    assert.ok(actual.number === 1 && actual.semitone === 0)

    actual = $interval.rationalize({ number: 0, semitone: 0 })
    assert.ok(actual.number === 7 && actual.semitone === 12)

    actual = $interval.rationalize({ number: 0, semitone: -1 })
    assert.ok(actual.number === 7 && actual.semitone === 11)
  })

  it('toString(interval: Interval):string', function() {
    assert.equal('P1', $interval.toString({ number: 1, semitone: 0 }))
    assert.equal('A1', $interval.toString({ number: 1, semitone: 1 }))
    assert.equal('d2', $interval.toString({ number: 2, semitone: 0 }))
    assert.equal('m2', $interval.toString({ number: 2, semitone: 1 }))
    assert.equal('M2', $interval.toString({ number: 2, semitone: 2 }))
    assert.equal('M3', $interval.toString({ number: 3, semitone: 4 }))
    assert.equal('P4', $interval.toString({ number: 4, semitone: 5 }))
    assert.equal('P8', $interval.toString({ number: 8, semitone: 12 }))
    assert.equal('P15', $interval.toString({ number: 15, semitone: 24 }))
  })

  it('toNiceString(interval: Interval):string', function() {
    assert.equal('perfect unison', $interval.toNiceString({ number: 1, semitone: 0 }))
    assert.equal('augmented unison', $interval.toNiceString({ number: 1, semitone: 1 }))
    assert.equal('diminished second', $interval.toNiceString({ number: 2, semitone: 0 }))
    assert.equal('minor second', $interval.toNiceString({ number: 2, semitone: 1 }))
    assert.equal('major second', $interval.toNiceString({ number: 2, semitone: 2 }))
    assert.equal('major third', $interval.toNiceString({ number: 3, semitone: 4 }))
    assert.equal('perfect fourth', $interval.toNiceString({ number: 4, semitone: 5 }))
    assert.equal('perfect octave', $interval.toNiceString({ number: 8, semitone: 12 }))
    assert.equal('perfect fifteenth', $interval.toNiceString({ number: 15, semitone: 24 }))
  })

  it('simplify(interval: Interval): Interval', function() {
    var P1 = { number: 1, semitone: 0 }
    var d2 = { number: 2, semitone: 0 }
    var m2 = { number: 2, semitone: 1 }
    var M2 = { number: 2, semitone: 2 }
    var A2 = { number: 2, semitone: 3 }
    var d8 = { number: 8, semitone: 11 }
    var P8 = { number: 8, semitone: 12 }
    var dd9 = { number: 9, semitone: 11 }
    var d9 = { number: 9, semitone: 12 }
    var m9 = { number: 9, semitone: 13 }
    var M9 = { number: 9, semitone: 14 }
    var A9 = { number: 9, semitone: 15 }
    var d15 = { number: 15, semitone: 23 }
    var P15 = { number: 15, semitone: 24 }

    var expected = [P1, d8, P1, d2, m2, M2, A2, d8, P1, dd9]
    var actual = [P1, d8, P8, d9, m9, M9, A9, d15, P15, dd9].map(function(interval) {
      return $interval.simplify(interval)
    })

    assert.deepEqual(expected, actual)
  })

  it('invert(interval: Interval): Interval', function() {
    var P1 = { number: 1, semitone: 0 }
    var A1 = { number: 1, semitone: 1 }
    var d2 = { number: 2, semitone: 0 }
    var m2 = { number: 2, semitone: 1 }
    var M2 = { number: 2, semitone: 2 }
    var d8 = { number: 8, semitone: 11 }
    var d15 = { number: 15, semitone: 23 }

    var actual = [P1, A1, d2, m2, M2, d8, d15]
      .map(interval => {
        interval = $interval.invert(interval)
        return interval.number + ':' + interval.semitone
      })
      .join()

    var expected = '8:12,8:11,7:12,7:11,7:10,1:1,1:1'
    assert.equal(actual, expected)
  })

  it('function join(interval1: Interval, interval2: Interval): SemitoneInterval', function() {
    var actual1 = $interval.join({ number: 1, semitone: 0 }, { number: 1, semitone: 0 })
    var actual2 = $interval.join({ number: 1, semitone: 0 }, { number: 8, semitone: 11 })
    var actual3 = $interval.join({ number: 3, semitone: 4 }, { number: 3, semitone: 3 })
    var actual4 = $interval.join({ number: 3, semitone: 4 }, { number: 3, semitone: 4 })

    assert.ok(actual1.number === 1 && actual1.semitone === 0)
    assert.ok(actual2.number === 8 && actual2.semitone === 11)
    assert.ok(actual3.number === 5 && actual3.semitone === 7)
    assert.ok(actual4.number === 5 && actual4.semitone === 8)
  })

  it('merge(...intervals: Interval[]): Interval', function() {
    var actual1 = $interval.merge({ number: 1, semitone: 0 }, { number: 1, semitone: 0 })
    var actual2 = $interval.merge(
      { number: 1, semitone: 0 },
      { number: 1, semitone: 0 },
      { number: 1, semitone: 0 }
    )
    var actual3 = $interval.merge({ number: 3, semitone: 4 }, { number: 3, semitone: 3 })
    var actual4 = $interval.merge(
      { number: 3, semitone: 4 },
      { number: 3, semitone: 3 },
      { number: 3, semitone: 3 }
    )

    assert.ok(actual1.number === 1 && actual1.semitone === 0)
    assert.ok(actual2.number === 1 && actual2.semitone === 0)
    assert.ok(actual3.number === 5 && actual3.semitone === 7)
    assert.ok(actual4.number === 7 && actual4.semitone === 10)
  })

  it('split(interval: Interval, part: Interval): SemitoneInterval', function() {
    var i1 = []
    var i2 = []
    var i3 = []
    var i4 = []

    var actual1 = $interval.split({ number: 8, semitone: 12 }, { number: 1, semitone: 0 })
    var actual3 = $interval.split({ number: 8, semitone: 12 }, { number: 3, semitone: 3 })

    assert.ok(actual1.number === 8 && actual1.semitone === 12)
    assert.ok(actual3.number === 6 && actual3.semitone === 9)
  })

  it('separate(...intervals: Interval[]): Interval', function() {
    var actual1 = $interval.separate({ number: 8, semitone: 12 }, { number: 1, semitone: 0 })
    var actual2 = $interval.separate(
      { number: 8, semitone: 12 },
      { number: 1, semitone: 0 },
      { number: 1, semitone: 0 }
    )
    var actual3 = $interval.separate({ number: 8, semitone: 12 }, { number: 3, semitone: 3 })
    var actual4 = $interval.separate(
      { number: 8, semitone: 12 },
      { number: 4, semitone: 5 },
      { number: 3, semitone: 3 }
    )

    assert.ok(actual1.number === 8 && actual1.semitone === 12)
    assert.ok(actual2.number === 8 && actual2.semitone === 12)
    assert.ok(actual3.number === 6 && actual3.semitone === 9)
    assert.ok(actual4.number === 3 && actual4.semitone === 4)
  })

  it('cents(interval: Interval): number', function() {
    assert.equal(0, $interval.cents({ number: 1, quality: 'P' }))
    assert.equal(0, $interval.cents({ number: 1, semitone: 0 }))
    assert.equal(100, $interval.cents({ number: 1, quality: 'A' }))
    assert.equal(100, $interval.cents({ number: 1, semitone: 1 }))
    assert.equal(100, $interval.cents({ number: 2, quality: 'm' }))
    assert.equal(100, $interval.cents({ number: 2, semitone: 1 }))
    assert.equal(600, $interval.cents({ number: 4, quality: 'A' }))
    assert.equal(1200, $interval.cents({ number: 8, quality: 'P' }))
  })

  it('frequencyRatio(interval: Interval)', function() {
    assert.equal(1, $interval.frequencyRatio({ number: 1, quality: 'P' }))
    assert.equal(1.4983070768766815, $interval.frequencyRatio({ number: 5, quality: 'P' }))
    assert.equal(2, $interval.frequencyRatio({ number: 8, quality: 'P' }))
  })

  it('fromString(input: string): Interval|undefined', function() {
    assert.ok($interval.equal({ number: 1, quality: 'P' }, $interval.fromString('P1')))
    assert.ok($interval.equal({ number: 1, quality: 'perfect' }, $interval.fromString('perfect unison')))
    assert.ok($interval.equal({ number: 1, quality: 'perfect' }, $interval.fromString('perfect first')))
    assert.ok($interval.equal({ number: 1, quality: 'perfect' }, $interval.fromString('perfect 1st')))
    assert.ok(
      $interval.equal(
        { number: 1, quality: 'doubly augmented' },
        $interval.fromString('doubly augmented 1st')
      )
    )
    assert.ok(
      $interval.equal(
        { number: 1, quality: 'doubly augmented' },
        $interval.fromString('doubly-augmented 1st')
      )
    )
    assert.ok(
      $interval.equal(
        { number: 22, quality: 'doubly augmented' },
        $interval.fromString('doubly-augmented twenty-second')
      )
    )
  })

  it('makeInterval(input: any): Interval|undefined', function() {
    assert.ok($interval.equal({ number: 1, quality: 'P' }, $interval.makeInterval('P1')))

    assert.ok(
      $interval.equal({ number: 1, quality: 'P' }, $interval.makeInterval({ number: 1, quality: 'P' }))
    )

    assert.ok(
      $interval.equal({ number: 1, quality: 'P' }, $interval.makeInterval({ number: 1, semitone: 0 }))
    )
  })
})
