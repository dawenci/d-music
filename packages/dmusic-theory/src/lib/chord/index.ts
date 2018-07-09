/**
 * # Chord 和弦
 */

// 三和弦：三和弦可以重复根音、五音，不重复3音，三音不可省略，五音可以省略
// 七和弦：可以重复根音、五音，不重复3音7音，若要省略音，优先省略五音，3音也可省略，根音七音不省略

import {
  Pitch,
  fromString as pitchFromString,
  name as pitchName,
  higherPitch,
  equal as equalPitch,
} from '../pitch'

import {fromString as accidentalFromString} from '../accidental'
import {Interval, fromString as intervalFromString} from '../interval'

/** 转位，0 为原位，1为第一转位， 2为第二转位，以此类推 */
export type InvertedCase = number

/** 和弦数据结构 */
export interface Chord {
  /** 和弦类型 */
  Class: ChordClass

  /** 和弦类别 */
  type: ChordType

  /** 和弦包含的音数量 */
  length: number

  /** 和弦根音 */
  root: Pitch

  /** 和弦三音 */
  third?: Pitch

  /** 和弦五音 */
  fifth?: Pitch

  /** 和弦七音 */
  seventh?: Pitch

  /** 和弦九音 */
  ninth?: Pitch

  /** 和弦十一音 */
  eleventh?: Pitch

  [pitchIndex: number]: Pitch

  [any: string]: any
}

/** 和弦数据生成函数 */
export interface ChordCreator {
  /**
   * @param {Pitch} root 根音
   * @param {ChordType} 和弦类别
   * @param {InvertedCase} invertedCase 转位
   */
  (root: Pitch, type: ChordType, invertedCase?: InvertedCase): Chord
}

/** 和弦所属类型 */
export type ChordClass = 'Triad' | 'Seventh' | 'Ninth' | 'Eleventh'

/** 和弦种类 */
export type ChordType =
  | 'maj'
  | 'min'
  | 'aug'
  | 'dim'
  | 'sus2'
  | 'sus4'
  | '7'
  | 'm7'
  | 'M7'
  | 'mM7'
  | 'aug7'
  | 'dim7'
  | 'm7-5'
  | '6'
  | 'm6'
  | '9'
  | 'm9'
  | '11'

const TYPES: ChordType[] = [
  'maj',
  'min',
  'aug',
  'dim',
  'sus2',
  'sus4',
  '7',
  'm7',
  'M7',
  'mM7',
  'aug7',
  'dim7',
  'm7-5',
  '6',
  'm6',
  '9',
  'm9',
  '11',
]

const M2 = {number: 2, semitone: 2} // 大二度
const m3 = {number: 3, semitone: 3} // 小三度
const M3 = {number: 3, semitone: 4} // 大三度
const P4 = {number: 4, semitone: 5} // 纯四度
const d5 = {number: 5, semitone: 6} // 减五度
const P5 = {number: 5, semitone: 7} // 纯五度
const A5 = {number: 5, semitone: 8} // 增五度
const M6 = {number: 6, semitone: 9} // 大六度
const d7 = {number: 7, semitone: 9} // 减七度
const m7 = {number: 7, semitone: 10} // 小七度
const M7 = {number: 7, semitone: 11} // 大七度
const M9 = {number: 9, semitone: 14} // 大九度
const P11 = {number: 11, semitone: 17} // 纯十一度

export interface ChordInfo {
  Class: ChordClass
  intervals: Interval[]
}

const DEF_MAP: {[key: string]: ChordInfo} = {
  // major
  // 〔大三和弦〕 记法（流行）：C、CM、Cmaj、CΔ
  // M3 + m3 => M3,P5
  maj: {Class: 'Triad', intervals: [M3, P5]},

  // minor
  // 〔小三和弦〕 记法（流行）：Cm、Cmin、C-、C-Δ
  // m3 + M3 => m3,P5
  min: {Class: 'Triad', intervals: [m3, P5]},

  // augment
  // 〔增三和弦〕 记法（流行）：Cdim、Co、CoΔ、Cm-5、Cm(♭5)
  // M3 + M3 => M3,A5
  aug: {Class: 'Triad', intervals: [M3, A5]},

  // diminish
  // 〔减三和弦〕 记法（流行）：Caug、C+、C+5、C(♯5)、C+Δ、CΔ+5、CΔ(♯5)
  // m3 + m3 => m3,d5
  dim: {Class: 'Triad', intervals: [m3, d5]},

  // 〔挂二和弦〕
  // M2 + P4 => M2,P5
  sus2: {Class: 'Triad', intervals: [M2, P5]},

  // 〔挂四和弦〕
  // P4 + M2 => P4,P5
  sus4: {Class: 'Triad', intervals: [P4, P5]},

  //【大小七和弦(属七和弦)】 记法（流行）：CMm7 C7 --相当于 大三和弦(M) + 小七度
  '7': {Class: 'Seventh', intervals: [M3, P5, m7]},

  // 【小小七和弦(小七和弦）】 记法（流行）：Cm7 Cmm7 C-7 --相当于 小三和弦(m) + 小七度
  m7: {Class: 'Seventh', intervals: [m3, P5, m7]},

  // 【大大七和弦(大七和弦)】 记法（流行）：CMajor7 CM7 CMM7  --相当于 大三和弦(M) + 大七度
  M7: {Class: 'Seventh', intervals: [M3, P5, M7]},

  // 【减七和弦(减减七和弦)】记法（流行）：Cdim7 C°7  --相当于 减三和弦(dim) + 减七度
  dim7: {Class: 'Seventh', intervals: [m3, d5, d7]},

  // 【增大七和弦】 记法（流行）：Caug7、C+M7  --相当于 增三和弦(aug) + 大七度
  aug7: {Class: 'Seventh', intervals: [M3, A5, M7]},

  // 【小大七和弦】 记法（流行）：CmM7  --相当于 小三和弦(m) + 大七度
  mM7: {Class: 'Seventh', intervals: [m3, P5, M7]},

  // 【半减七和弦】 记法（流行）：Chalf-dim7 Cm7-5 Cm7（♭5） --相当于减三和弦（dim) + 小七度
  'm7-5': {Class: 'Seventh', intervals: [m3, d5, m7]},

  // 大三和弦 + 大六度
  '6': {Class: 'Seventh', intervals: [M3, P5, M6]},

  // 小三和弦 + 大六度
  m6: {Class: 'Seventh', intervals: [m3, P5, M6]},

  // 【大小九和弦(属九和弦)】大小七和弦（属七）+ 大九度
  '9': {Class: 'Ninth', intervals: [M3, P5, m7, M9]},

  // 【小九和弦】小七和弦 + 大九度
  m9: {Class: 'Ninth', intervals: [m3, P5, m7, M9]},

  // 属十一
  '11': {Class: 'Eleventh', intervals: [M3, P5, m7, M9, P11]},
}

// 确保输入的是个合法的和弦类型
function ensureType(type: string): ChordType {
  if (TYPES.indexOf(<ChordType>type) === -1) {
    if (type === '') type = 'maj'
    else if (type === 'M') type = 'maj'
    else if (type === 'm') type = 'min'
    else if (type === 'maj7') type = 'M7'
    else type = 'maj'
  }
  return type as ChordType
}

// 获取和弦定义数据
function getDef(type: string) {
  type = ensureType(type)
  return DEF_MAP[type]
}

/**
 * 转位一个和弦
 *
 * @example
 * ```js
 * const chord = fromString('C')
 * invert(chord, 1) // C/E
 * ```
 *
 * @export
 * @param {Chord} chord 和弦
 * @param {InvertedCase} invertedCase 第几转位
 * @returns {Chord}
 */
export function invert(chord: Chord, invertedCase: InvertedCase): Chord {
  // 本身原位，且参数也为0（转成原位），无需处理直接返回
  if (!isInverted(chord) && invertedCase === 0) return chord

  // 三和弦lenth为3，七和弦为4，九和弦为5，十一和弦为6...
  if (invertedCase >= chord.length) throw 'invertedCase > length'

  let order = ['root', 'third', 'fifth', 'seventh', 'ninth', 'eleventh']
  order.length = chord.length // 根据和弦类型裁断

  // 转位的情况（即不等于0）
  // 取出转位部分，放到数组后面，完成排序
  if (invertedCase) {
    let moveBackward = order.splice(invertedCase)
    order = moveBackward.concat(order)
  }

  // 根据顺序，重新放置音符，重新设定低音
  for (let index = 0; index < chord.length; index += 1) {
    chord[index] = chord[order[index]]
  }
  chord.base = chord[order[0]]

  return chord
}

/**
 * 判断和弦是否转位
 * @example
 * ```js
 * const chord = fromString('C/E')
 * isInverted(chord) // true
 * ```
 *
 * @export
 * @param {Chord} chord 和弦
 * @returns {boolean}
 */
export function isInverted(chord: Chord): boolean {
  return chord.base !== chord.root
}

/** 和弦创建器 */
export const create: ChordCreator = (
  root: Pitch,
  type: ChordType,
  invertedCase: InvertedCase = 0
): Chord => {
  const chord: any = {}
  const def = getDef(type)
  const intervals = def.intervals

  chord.Class = def.Class
  chord.type = type
  chord.length = intervals.length + 1

  chord.root = chord.base = chord[0] = root
  chord.third = chord[1] = higherPitch(root, intervals[0])
  chord.fifth = chord[2] = higherPitch(root, intervals[1])
  if (intervals[2]) chord.seventh = chord[3] = higherPitch(root, intervals[2])
  if (intervals[3]) chord.ninth = chord[4] = higherPitch(root, intervals[3])
  if (intervals[4]) chord.eleventh = chord[5] = higherPitch(root, intervals[4])

  if (invertedCase) invert(chord, invertedCase)

  return chord as Chord
}

/**
 * 输和弦的字符串表示
 *
 * @export
 * @param {Chord} chord
 * @returns {string}
 */
export function toString(chord: Chord): string {
  let typeText: string = chord.type
  if (typeText === 'maj') typeText = ''
  else if (typeText === 'min') typeText = 'm'

  let rootText = pitchName(chord.root).replace(/\d+$/, '') || ''
  let baseText = pitchName(chord.base).replace(/\d+$/, '') || ''

  let suffix = rootText === baseText ? '' : '/' + baseText

  return rootText + typeText + suffix
}

/**
 * 从任意字符串中提取构造和弦
 *
 * @example
 *
 * ```js
 * fromString('C') // C major
 * fromString('Cmaj7') // C major seventh
 * ```
 *
 * @export
 * @param {string} input
 * @returns {(Chord|undefined)}
 */
export function fromString(input: string): Chord | undefined {
  let str = input
  str.replace(/\s/g, '') // 去空格

  let baseNote: any

  // 提取转位音符
  if (str.indexOf('/') !== -1) {
    let parts = str.split('/')
    baseNote = pitchFromString(parts[1])
    str = parts[0]
  }

  // 提取音名
  let rootName = str.charAt(0).toUpperCase()
  str = str.slice(1)

  // 提取变音记号
  let accidental = accidentalFromString(str)
  // accidental 有默认值，需要确认是从原始输入中提取的，才能裁短
  let accidentalIndex = str.indexOf(accidental)
  if (accidentalIndex !== -1) str = str.slice(accidentalIndex)

  // 创建根音
  let rootNote = pitchFromString(rootName + accidental)
  if (!rootNote) return

  let chordType = ensureType(str)

  // 开始创建
  let chord = create(rootNote, chordType)

  // 处理转位
  if (baseNote) {
    for (let index = 0; index < chord.length; index += 1) {
      if (equalPitch(chord[index], baseNote)) {
        invert(chord, index)
        break
      }
    }
  }
  return chord
}
