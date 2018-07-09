import * as theory from 'dmusic-theory'
import {Chord, Pitch, pitch} from 'dmusic-theory'
const semitones = theory.pitch.semitonesStartWithC0

export type StepType = 'root' | 'third' | 'fifth' | 'seventh' | 'ninth' | 'eleventh' | ''
export interface ChordChartItem {
  string: number
  fret: number
  pitch: Pitch
  step: StepType
}
export interface ChordChart {
  chord: Chord
  length: number
  [index: number]: ChordChartItem
}

/** 默认调音 */
const defaultTune = (): Pitch[] => [
  {stepName: 'A', accidental: 'natural', octave: 4},
  {stepName: 'E', accidental: 'natural', octave: 4},
  {stepName: 'C', accidental: 'natural', octave: 4},
  {stepName: 'G', accidental: 'natural', octave: 4},
]

// 和弦匹配结果(或阶段结果)检测，避免执行没意义的循环分支，加入分支合理性检测
const check = (result: Pitch[] = [], ukulele: Ukulele) => {
  if (result.length < 2) return true
  let frets = result
    .map((pitch: Pitch, string: number) => ukulele.pitchPositionOnString(pitch, string))
    .filter(fret => fret > 0)
  if (frets.length < 2) return true
  return Math.max(...frets) - Math.min(...frets) <= 3
}

// 和弦匹配结果重复检测
const duplicateCheck = (result: Pitch[], output: Pitch[][]): boolean => {
  let len = output.length
  let resultString = result.map((pitch: Pitch) => semitones(pitch)).join('')
  while (len--) {
    let current = output[len]
    let currentString = current.map((pitch: Pitch) => semitones(pitch)).join('')
    if (resultString === currentString) {
      return true
    }
  }
  return false
}

/** ukulele 类 */
export class Ukulele {
  capo: number
  frets: number
  tune: Pitch[]

  /**
   * Creates an instance of Ukulele.
   * fret: 品数,
   * capo: 变调夹位置,
   * tune: 调音
   */
  constructor(frets: number = 12, capo: number = 0, tune: Pitch[] = defaultTune()) {
    this.tune = tune
    this.capo = capo
    this.frets = frets
  }

  get stringLength() {
    return this.tune.length
  }

  /** 当前调音的四个音距离 C0 的 semitones 距离 */
  tuneSemitones(): number[] {
    return this.tune.map(semitones)
  }

  /** 获取某个音在 4 根弦上的品位 */
  pitchCoordinate(pitch: Pitch) {
    const result: number[] = []
    const semitone = semitones(pitch) % 12
    this.tune.forEach((tunePitch, string) => {
      let tuneSemitone = semitones(tunePitch)
      for (let fret = 0; fret < this.frets; fret += 1) {
        if (semitone === (tuneSemitone + fret) % 12) {
          result[string] = fret
        }
      }
    })
    return result
  }

  /** 获取某音在某根弦上的品位 */
  pitchPositionOnString(pitch: Pitch, string: number): number {
    const semitone = semitones(pitch) % 12
    const tuneSemitone = semitones(this.tune[string])

    let fret = 0
    while (semitone !== (tuneSemitone + fret) % 12) fret++
    return fret
  }

  /**
   * 和弦位置全排列算法
   * source 为输入源，放一组音(pitch)
   * result 为一种匹配的组合
   * output 为所有匹配的组合的数组
   */
  protected permutation(
    source: Pitch[] = [],
    result: Pitch[] = [],
    size = 4,
    output: Pitch[][] = []
  ): any {
    const ukulele = this

    // 匹配完成，检查结果
    if (result.length === size) {
      if (!check(result, ukulele)) return

      // 消重，如 source 为 [C,E,G,C] 这种有重复音的情况，必然会有重复，重复的直接跳过
      if (duplicateCheck(result, output)) return

      return output.push(result)
    }

    // 逐个元素作为分支起点取出
    let index = source.length
    while (index--) {
      // 判断组合是否合理，看是否有必要继续执行分支循环
      if (!check(result, ukulele)) continue

      // 拷贝一份源数据，作为本分支的输入
      let sourceCopy = source.slice()
      let element = sourceCopy.splice(index, 1)[0]

      // 拷贝一份结果数据，作为本分支的输出
      let resultCopy = result.slice()
      resultCopy.push(element)

      // 递归操作，直到源数组空
      ukulele.permutation(sourceCopy, resultCopy, size, output)
    }
  }

  /**
   * 在Ukulele指板上匹配一个和弦
   * 输出所有匹配的结果数组
   */
  chordCharts(chord: Chord): ChordChart[] {
    const allResult: any = []

    // 三和弦只有三个音，需要补一个重复音在后面才能进行 permutation
    if (chord.length === 3) {
      Array.prototype.forEach.call(chord, (pitch: Pitch) => {
        let source = Array.prototype.slice.call(chord)
        source.push(pitch)
        this.permutation(source, [], 4, allResult)
      })
    } else {
      // 七和弦以上直接执行
      let source = Array.prototype.slice.call(chord)
      this.permutation(source, [], 4, allResult)
    }

    const stringLength = this.stringLength
    let charts: ChordChart[] = allResult.map((result: Pitch[]) => {
      let chart: any = result.map((pitch: Pitch, string: number) => {
        let fret = this.pitchPositionOnString(pitch, string)
        let step: StepType =
          pitch === chord.root
            ? 'root'
            : pitch === chord.third
              ? 'third'
              : pitch === chord.fifth
                ? 'fifth'
                : pitch === chord.seventh
                  ? 'seventh'
                  : pitch === chord.ninth ? 'ninth' : pitch === chord.eleventh ? 'eleventh' : ''

        let chartItem: ChordChartItem = {
          string,
          fret,
          pitch,
          step,
        }
        return chartItem
      })
      chart.length = stringLength
      chart.chord = chord
      return chart as ChordChart
    })

    return charts
  }
}
