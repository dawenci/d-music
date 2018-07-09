'use strict'

const assert = require('assert')
const $pitch = require('../dist/cjs/lib/pitch')
const $chord = require('../dist/cjs/lib/chord')

describe('chord 模块 #######################', function() {
  describe('Chord 构造', function() {
    it('大三和弦', function() {
      const chord = $chord.create($pitch.fromString('C'), 'maj', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('E')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('G')))
    })
    it('小三和弦', function() {
      const chord = $chord.create($pitch.fromString('C'), 'min', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('Eb')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('G')))
    })
    it('增三和弦', function() {
      const chord = $chord.create($pitch.fromString('C'), 'aug', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('E')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('G#')))
    })
    it('减三和弦', function() {
      const chord = $chord.create($pitch.fromString('C'), 'dim', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('Eb')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('Gb')))
    })

    it('7和弦', function() {
      const chord = $chord.create($pitch.fromString('G'), '7', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('G')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('B')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('D1')))
      assert.ok($pitch.equal(chord.seventh, $pitch.fromString('F1')))
    })

    it('9和弦', function() {
      const chord = $chord.create($pitch.fromString('G'), '9', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('G')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('B')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('D1')))
      assert.ok($pitch.equal(chord.seventh, $pitch.fromString('F1')))
      assert.ok($pitch.equal(chord.ninth, $pitch.fromString('A1')))
    })

    it('11和弦', function() {
      const chord = $chord.create($pitch.fromString('G'), '11', 0)
      assert.ok($pitch.equal(chord.root, $pitch.fromString('G')))
      assert.ok($pitch.equal(chord.third, $pitch.fromString('B')))
      assert.ok($pitch.equal(chord.fifth, $pitch.fromString('D1')))
      assert.ok($pitch.equal(chord.seventh, $pitch.fromString('F1')))
      assert.ok($pitch.equal(chord.ninth, $pitch.fromString('A1')))
      assert.ok($pitch.equal(chord.eleventh, $pitch.fromString('C2')))
    })
  })

  describe('转位测试', function() {
    it('isInverted()', function() {
      const i0 = $chord.create($pitch.fromString('C'), '11', 0)
      const i1 = $chord.create($pitch.fromString('C'), '11', 1)
      const i2 = $chord.create($pitch.fromString('C'), '11', 2)
      const i3 = $chord.create($pitch.fromString('C'), '11', 3)
      const i4 = $chord.create($pitch.fromString('C'), '11', 4)
      const i5 = $chord.create($pitch.fromString('C'), '11', 5)

      assert.ok(!$chord.isInverted(i0))
      assert.ok($chord.isInverted(i1))
      assert.ok($chord.isInverted(i2))
      assert.ok($chord.isInverted(i3))
      assert.ok($chord.isInverted(i4))
      assert.ok($chord.isInverted(i5))
    })

    it('创建时转位', function() {
      const inversion0 = $chord.create($pitch.fromString('C'), '11', 0)
      assert.ok($pitch.equal(inversion0.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0.base, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0[0], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0[1], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion0[2], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion0[3], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion0[4], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion0[5], $pitch.fromString('F1')))

      const inversion1 = $chord.create($pitch.fromString('C'), '11', 1)
      assert.ok($pitch.equal(inversion1.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion1.base, $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion1[0], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion1[1], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion1[2], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion1[3], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion1[4], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion1[5], $pitch.fromString('C')))

      const inversion2 = $chord.create($pitch.fromString('C'), '11', 2)
      assert.ok($pitch.equal(inversion2.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion2.base, $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion2[0], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion2[1], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion2[2], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion2[3], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion2[4], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion2[5], $pitch.fromString('E')))

      const inversion3 = $chord.create($pitch.fromString('C'), '11', 3)
      assert.ok($pitch.equal(inversion3.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion3.base, $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion3[0], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion3[1], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion3[2], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion3[3], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion3[4], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion3[5], $pitch.fromString('G')))

      const inversion4 = $chord.create($pitch.fromString('C'), '11', 4)
      assert.ok($pitch.equal(inversion4.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion4.base, $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion4[0], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion4[1], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion4[2], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion4[3], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion4[4], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion4[5], $pitch.fromString('Bb')))

      const inversion5 = $chord.create($pitch.fromString('C'), '11', 5)
      assert.ok($pitch.equal(inversion5.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion5.base, $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion5[0], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion5[1], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion5[2], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion5[3], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion5[4], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion5[5], $pitch.fromString('D1')))
    })

    it('invert(chord, invertCase)', function() {
      const chord = $chord.fromString('C11')
      const inversion0 = $chord.invert(chord, 0)
      assert.ok($pitch.equal(inversion0.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0.base, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0[0], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion0[1], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion0[2], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion0[3], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion0[4], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion0[5], $pitch.fromString('F1')))

      const inversion1 = $chord.invert(chord, 1)
      assert.ok($pitch.equal(inversion1.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion1.base, $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion1[0], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion1[1], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion1[2], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion1[3], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion1[4], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion1[5], $pitch.fromString('C')))

      const inversion2 = $chord.invert(chord, 2)
      assert.ok($pitch.equal(inversion2.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion2.base, $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion2[0], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion2[1], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion2[2], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion2[3], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion2[4], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion2[5], $pitch.fromString('E')))

      const inversion3 = $chord.invert(chord, 3)
      assert.ok($pitch.equal(inversion3.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion3.base, $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion3[0], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion3[1], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion3[2], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion3[3], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion3[4], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion3[5], $pitch.fromString('G')))

      const inversion4 = $chord.invert(chord, 4)
      assert.ok($pitch.equal(inversion4.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion4.base, $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion4[0], $pitch.fromString('D1')))
      assert.ok($pitch.equal(inversion4[1], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion4[2], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion4[3], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion4[4], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion4[5], $pitch.fromString('Bb')))

      const inversion5 = $chord.invert(chord, 5)
      assert.ok($pitch.equal(inversion5.root, $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion5.base, $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion5[0], $pitch.fromString('F1')))
      assert.ok($pitch.equal(inversion5[1], $pitch.fromString('C')))
      assert.ok($pitch.equal(inversion5[2], $pitch.fromString('E')))
      assert.ok($pitch.equal(inversion5[3], $pitch.fromString('G')))
      assert.ok($pitch.equal(inversion5[4], $pitch.fromString('Bb')))
      assert.ok($pitch.equal(inversion5[5], $pitch.fromString('D1')))
    })
  })

  describe('toString & fromString', function() {
    it('toString()', function() {
      const C = $pitch.fromString('C')

      const Cmaj = $chord.create(C, 'maj', 0)
      const Cmin = $chord.create(C, 'min', 0)
      const Caug = $chord.create(C, 'aug', 0)
      const Cdim = $chord.create(C, 'dim', 0)
      const ConE = $chord.create(C, 'maj', 1)
      const ConG = $chord.create(C, 'maj', 2)

      assert.equal($chord.toString(Cmaj), 'C')
      assert.equal($chord.toString(Cmin), 'Cm')
      assert.equal($chord.toString(Caug), 'Caug')
      assert.equal($chord.toString(Cdim), 'Cdim')
      assert.equal($chord.toString(ConE), 'C/E')
      assert.equal($chord.toString(ConG), 'C/G')

      const Csus2 = $chord.create(C, 'sus2', 0)
      assert.equal($chord.toString(Csus2), 'Csus2')

      const Csus4 = $chord.create(C, 'sus4', 0)
      assert.equal($chord.toString(Csus4), 'Csus4')

      const Cmaj7 = $chord.create(C, 'M7', 0)
      assert.equal($chord.toString(Cmaj7), 'CM7')

      const Cm7 = $chord.create(C, 'm7', 0)
      assert.equal($chord.toString(Cm7), 'Cm7')

      const C7 = $chord.create(C, '7', 0)
      assert.equal($chord.toString(C7), 'C7')

      const CmM7 = $chord.create(C, 'mM7', 0)
      assert.equal($chord.toString(CmM7), 'CmM7')

      const Caug7 = $chord.create(C, 'aug7', 0)
      assert.equal($chord.toString(Caug7), 'Caug7')

      const Cdim7 = $chord.create(C, 'dim7', 0)
      assert.equal($chord.toString(Cdim7), 'Cdim7')

      const Cdim7b5 = $chord.create(C, 'dim7-5', 0)
      assert.equal($chord.toString(Cdim7b5), 'Cdim7-5')

      const C6 = $chord.create(C, '6', 0)
      assert.equal($chord.toString(C6), 'C6')

      const Cm6 = $chord.create(C, 'm6', 0)
      assert.equal($chord.toString(Cm6), 'Cm6')

      const Cm9 = $chord.create(C, 'm9', 0)
      assert.equal($chord.toString(Cm9), 'Cm9')

      const C9 = $chord.create(C, '9', 0)
      assert.equal($chord.toString(C9), 'C9')

      const C11 = $chord.create(C, '11', 0)
      assert.equal($chord.toString(C11), 'C11')
    })

    it('fromString()', function() {
      const C = $chord.fromString('C')
      const Cmaj = $chord.fromString('Cmaj')
      assert.equal($chord.toString(C), 'C')
      assert.equal($chord.toString(Cmaj), 'C')

      const Cm = $chord.fromString('Cm')
      const Cmin = $chord.fromString('Cmin')
      assert.equal($chord.toString(Cm), 'Cm')
      assert.equal($chord.toString(Cmin), 'Cm')

      const Caug = $chord.fromString('Caug')
      assert.equal($chord.toString(Caug), 'Caug')

      const Cdim = $chord.fromString('Cdim')
      assert.equal($chord.toString(Cdim), 'Cdim')

      const Csus2 = $chord.fromString('Csus2')
      assert.equal($chord.toString(Csus2), 'Csus2')

      const Csus4 = $chord.fromString('Csus4')
      assert.equal($chord.toString(Csus4), 'Csus4')

      const Cmaj7 = $chord.fromString('CM7')
      assert.equal($chord.toString(Cmaj7), 'CM7')

      const Cm7 = $chord.fromString('Cm7')
      assert.equal($chord.toString(Cm7), 'Cm7')

      const C7 = $chord.fromString('C7')
      assert.equal($chord.toString(C7), 'C7')

      const CmM7 = $chord.fromString('CmM7')
      assert.equal($chord.toString(CmM7), 'CmM7')

      const Caug7 = $chord.fromString('Caug7')
      assert.equal($chord.toString(Caug7), 'Caug7')

      const Cdim7 = $chord.fromString('Cdim7')
      assert.equal($chord.toString(Cdim7), 'Cdim7')

      const Cm7_5 = $chord.fromString('Cm7-5')
      assert.equal($chord.toString(Cm7_5), 'Cm7-5')

      const C6 = $chord.fromString('C6')
      assert.equal($chord.toString(C6), 'C6')

      const Cm6 = $chord.fromString('Cm6')
      assert.equal($chord.toString(Cm6), 'Cm6')

      const C9 = $chord.fromString('C9')
      assert.equal($chord.toString(C9), 'C9')

      const Cm9 = $chord.fromString('Cm9')
      assert.equal($chord.toString(Cm9), 'Cm9')

      const C11 = $chord.fromString('C11')
      assert.equal($chord.toString(C11), 'C11')
    })
  })
})
