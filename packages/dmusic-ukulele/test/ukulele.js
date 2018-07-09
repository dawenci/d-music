'use strict'
var assert = require('assert')
var $uku = require('../dist/cjs')
var $theory = require('dmusic-theory')

describe('ukulele 模块 #######################', function() {
  const ukulele = new $uku.Ukulele()

  it('chordCharts', function() {
    var CMajor = $theory.chord.fromString('C')
    var charts = ukulele.chordCharts(CMajor)
    charts.forEach(chart => {
      const chord = chart.chord
      const pitches = Array.from(chart).map(data => data.pitch)
      const C = pitches.find(pitch => pitch.stepName === 'C')
      const E = pitches.find(pitch => pitch.stepName === 'E')
      const G = pitches.find(pitch => pitch.stepName === 'G')
      assert.deepEqual(chord, CMajor)
      pitches.forEach(pitch => assert.ok(pitch.stepName === 'C'
        || pitch.stepName === 'E'
        || pitch.stepName === 'G'
      ))
    })
  })
})
