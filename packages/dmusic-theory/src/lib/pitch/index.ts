/**
 * # Pitch (音)
 *
 * 我们约定 Pitch 的定义：
 *
 * - `{ stepName: 'C', accidental: 'sharp', octave: 4 }` 这种直接定义的形式
 */

// `pitch` 是指具有某个特定音高(频率)的乐音，使用字母 [A,B,C,D,E,F,G] 来命名，(即`音名`)，
// 可以加上 `accidental (变音记号)`  来提高、降低音高 (即修饰 `semitone` )。

import {STANDARD_FREQUENCY_OF_A4} from '../constant'

import {semitonesToFrequencyRatio} from '../conversion'

import {StepName, isStepName, numberToSemitone, stepNameToNumber, numberToStepName, numberCompound, numberOctaves} from '../diatonic'

import {
  rationalize,
  decreaseOctave,
  Interval,
  join as joinInterval,
  split as splitInterval,
  equal as intervalEqual,
  simpleEqual as intervalSimpleEqual,
  semitoneEqual as intervalSemitoneEqual,
} from '../interval'

import {isNumber} from '../interval/number'
import {isSemitone, octave as semitoneOctave} from '../interval/semitone'

import {Accidental, isAccidental, offset as accidentalOffset, sign as accidentalSign, fromString as accidentalFromString} from '../accidental'

/** 符合乐理习惯的 Pitch 接口 */
export interface Pitch {
  /** 音级名称，如 C, D, E, F, G, A, B */
  stepName: StepName

  /** 变音记号，如 #, B, x, bb, natural, sharp, flat, ... */
  accidental?: Accidental

  /** 科学音高记音法中的八度分组，如 C0，C1，C2，... */
  octave?: number // default: 0
}

/**
 * 计算音高距离 C0 的音级数量偏移
 *
 * @export
 * @param {Pitch} pitch
 * @returns {number}
 */
export function numbersStartWithC0(pitch: Pitch): number {
  return stepNameToNumber(pitch.stepName) + (pitch.octave || 0) * 7
}

/**
 * 计算音高距离 C0 有多少个 semitone
 *
 * @export
 * @param {Pitch} pitch
 * @returns {number}
 */
export function semitonesStartWithC0(pitch: Pitch): number {
  let num = numbersStartWithC0(pitch)
  var baseSemitone = numberToSemitone(num)
  var offset = accidentalOffset(pitch.accidental)
  return baseSemitone + offset
}

/**
 * 转换为与 C0 之间的音程
 *
 * @export
 * @param {Pitch} pitch
 * @returns {Interval}
 */
export function toIntervalStartWithC0(pitch: Pitch): Interval {
  return {
    number: numbersStartWithC0(pitch),
    semitone: semitonesStartWithC0(pitch),
  }
}

/**
 * 将与 C0 的音程转换成 Pitch
 *
 * @export
 * @param {Interval} interval
 * @returns {Pitch}
 */
export function fromIntervalStartWithC0(interval: Interval): Pitch {
  let compoundNumber = numberCompound(interval.number)
  let number = compoundNumber.number
  let octave = compoundNumber.octave

  let stepName = numberToStepName(number)
  let diatonicSemitones = numberToSemitone(interval.number)
  let offset = interval.semitone - diatonicSemitones
  let accidental = offset as Accidental

  return {
    stepName,
    accidental: accidentalSign(accidental), // 统一使用符号形式
    octave,
  }
}

/**
 * 判断任意输入是否为有效的 Pitch
 *
 * @export
 * @param {*} pitch 任意输入
 * @returns {pitch is Pitch}
 */
export function isPitch(pitch: any): pitch is Pitch {
  if (!pitch) return false
  if (isStepName(pitch.stepName) && isAccidental(pitch.accidental)) {
    if (numbersStartWithC0(pitch) >= 1 && semitonesStartWithC0(pitch) >= 0) return true
  }
  return false
}

/**
 * 判断两个 Pitch 是相同
 * @example
 * ```js
 *
 * const p1 = { number: 1, semitone: 1 }
 * const p2 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p3 = { stepName: 'D', accidental: 'flat', octave: 0 }
 * equal(p1, p2) // true
 * equal(p1, p3) // false
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export function equal(pitch1: Pitch, pitch2: Pitch): boolean {
  if (pitch1 === pitch2) return true
  return pitch1.stepName === pitch2.stepName && accidentalOffset(pitch1.accidental) === accidentalOffset(pitch2.accidental) && (pitch1.octave || 0) === (pitch2.octave || 0)
}

/**
 * 判断两个 Pitch 音高是否相同（如同音异名）
 *
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p2 = { stepName: 'D', accidental: 'flat', octave: 0 }
 * semitoneEqual(p1, p2) // true
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export function semitoneEqual(pitch1: Pitch, pitch2: Pitch): boolean {
  if (pitch1 === pitch2) return true
  return semitonesStartWithC0(pitch1) === semitonesStartWithC0(pitch2)
}

/**
 * 判断两个音是否是若干个（含零个）八度距离
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p2 = { stepName: 'C', accidental: 'sharp', octave: 1 }
 * semitoneEqual(p1, p2) // true
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export function simpleEqual(pitch1: Pitch, pitch2: Pitch): boolean {
  if (pitch1 === pitch2) return true
  return pitch1.stepName === pitch2.stepName && accidentalOffset(pitch1.accidental) === accidentalOffset(pitch2.accidental)
}

/**
 * 返回音名，stepName + accidental + octave 或自定义形式
 * @example
 * ```js
 *
 * const p1 = { stepName: 1, accidental: 0, octave: 0 }
 * name(p1) // C0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {string}
 */
export function name(pitch: Pitch): string {
  let _name = pitch.stepName + accidentalSign(pitch.accidental) + (pitch.octave || '')
  return _name.replace('\u266E', '') // 不显示还原记号
}

/**
 * 将音符对象简化成 octave 为 0 的音符（即 C0-B0），注意不包含 C1
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 4 }
 * name(p1) // C♯4
 * simplify(p1)
 * name(p1) // C♯0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {Pitch} 输出简化结果
 */
export function simplify(pitch: Pitch): Pitch {
  let simple: Pitch = {
    stepName: pitch.stepName,
    accidental: pitch.accidental,
  }
  let semitone = semitonesStartWithC0(simple) + accidentalOffset(pitch.accidental)
  // 避免输出 Cb0 这类 semitone 小于 0 的 Pitch
  simple.octave = semitone >= 0 ? 0 : 1
  return simple
}

/**
 * 获取更高（上方若干音程距离）的另外一个音
 * @example
 * ```js
 *
 * import { makeInterval } from '../interval'
 * const M3 = makeInterval('M3')
 * const p1 = { stepName: 'C', accidental: 0, octave: 0 } // C0
 * const p2 = higherPitch(p1, M3)
 * name(p2) // E0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {Interval} interval 距离目标音的音程
 * @returns {Pitch}
 */
export function higherPitch(pitch: Pitch, interval: Interval): Pitch {
  let C0Interval = {
    number: numbersStartWithC0(pitch),
    semitone: semitonesStartWithC0(pitch),
  }
  return fromIntervalStartWithC0(joinInterval(C0Interval, interval))
}

/**
 * 获取更低（下方若干音程距离）的另外一个音
 * @example
 * ```js
 *
 * import { makeInterval } from '../interval'
 * const m3 = makeInterval('m3')
 * const G = { stepName: 'G', accidental: 0, octave: 0 } // G0
 * const E = lowerPitch(G, m3)
 * name(E) // E0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {Interval} interval 距离目标音的音程
 * @returns {Pitch}
 */
export function lowerPitch(pitch: Pitch, interval: Interval): Pitch {
  let _interval = toIntervalStartWithC0(pitch)
  return fromIntervalStartWithC0(splitInterval(_interval, interval))
}

/**
 * 获取音高的频率数值
 * @example
 * ```js
 *
 * const A4 = makePitch('A4')
 * frequency(A4) // 440
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {number} [toFixed] 可选，保留的小数位，无指定则完整输出
 * @returns {number}
 */
export function frequency(pitch: Pitch, toFixed?: number): number {
  let interval = toIntervalStartWithC0(pitch)
  let _semitones = interval.semitone - 57
  let ratio = semitonesToFrequencyRatio(_semitones)
  let frequency = STANDARD_FREQUENCY_OF_A4 * ratio
  return toFixed === undefined ? frequency : +frequency.toFixed(toFixed)
}

/**
 * 计算出音高对应的 MIDI note number (0-127)。
 * 中央 C (C4) 在 MIDI 编号中为 60 (midi C5)，
 * 编号 0 为 C-1 (midi C0)，
 * 编号 127 为 G9 (midi G10)
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {(number|undefined)} 输出 midi 编号
 */
export function toMidiNumber(pitch: Pitch): number | undefined {
  let semitone = semitonesStartWithC0(pitch)
  let midiNumber = semitone + 12
  if (midiNumber > 127 || midiNumber < 12) return undefined
  return midiNumber
}

/**
 * 根据 MIDI note number 计算出对应的一组音，一对多关系
 *
 * @export
 * @param {number} midiNumber 输入 midi 编号
 * @returns {Pitch[]} 输出一组音高一致的音（同音异名）
 */
export function fromMidiNumber(midiNumber: number): Pitch[] {
  let semitone = midiNumber - 12
  let pitches = enharmonicNotes(semitone)
  return pitches
}

/**
 * 计算出音高对应钢琴上的哪个按键：1(A0) ~ 88(C8)。
 * 多个音可以对应到同一个按键，多对一关系
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {(number | undefined)} 琴键序号
 */
export function toPianoKeyNumber(pitch: Pitch): number | undefined {
  let keyNumber = semitonesStartWithC0(pitch) - 8
  return keyNumber > 88 || keyNumber < 1 ? undefined : keyNumber
}

/**
 * 根据钢琴上的按键序号（1 ~ 88）计算出对应的一组音，一个按键可以对应到多个音，一对多关系
 *
 * @export
 * @param {number} keyNumber 琴键序号
 * @returns {Pitch[]} 琴键对应的一组音（同音异名）
 */
export function fromPianoKeyNumber(keyNumber: number): Pitch[] {
  let semitone = keyNumber + 8
  let pitches = enharmonicNotes(semitone)
  return pitches
}

// 距离 C0 若干个半音距离的音高，可能对应多个音（同音异名）
const semitoneMapNumber = [[1, 7, 2], [1, 2, 7], [2, 1, 3], [2, 3, 4], [3, 4, 2], [4, 3, 5], [4, 5, 3], [5, 4, 6], [5, 6], [6, 5, 7], [6, 7, 1], [7, 1, 6]]
/**
 * 获取距离 C0 音程相等的一组异名音
 *
 * @param {number} semitone 半音数量（相对于 C0）
 * @returns {Pitch[]} 一组等高异名的音
 */
export function enharmonicNotes(semitone: number): Pitch[] {
  let octaves = semitoneOctave(semitone)
  let numbers = semitoneMapNumber[semitone % 12].map(number => number + octaves * 7)
  let pitches = numbers.map(number =>
    fromIntervalStartWithC0({
      number,
      semitone,
    })
  )
  return pitches
}

/**
 * 将 Pitch 输出成字符串
 *
 * @export
 * @param {Pitch} pitch
 * @returns {string}
 */
export function toString(pitch: Pitch): string {
  return pitch.stepName + pitch.accidental + (pitch.octave || '')
}

// 从字符串中提取音名
function pickName(input: string): string | undefined {
  var _name = (input || '')
    .replace(/^\s+/, '')
    .charAt(0)
    .toUpperCase()
  return /[^A-G]/.test(_name) ? undefined : _name
}
// 从字符串中提示八度分组
function pickOctave(input: string): number {
  var match = (input || '').replace(/\s+$/, '').match(/\d+$/)
  return match === null ? 0 : +match[0]
}
/**
 * 从任意字符串输入中，提取有效信息构造 Pitch
 *
 * @export
 * @param {string} input 输入的字符串
 * @returns {(Pitch|undefined)}
 */
export function fromString(input: string): Pitch | undefined {
  if (typeof input === 'string') {
    let stepName = pickName(input)
    let accidental = accidentalFromString(input) || 0
    let octave = pickOctave(input)
    if (!stepName) return
    let pitch = {
      stepName,
      accidental,
      octave,
    }
    if (isPitch(pitch)) return pitch
  }
}

/**
 * 从任意输入中，构造出匹配的音
 * @example
 * ```js
 *
 * makePitch(null) // undefined
 * makePitch('C4') // { stepName: 'C', accidental: 0, octave: 4 }
 * makePitch({ stepName: 'C', accidental: 0, octave: 4 }) // { stepName: 'C', accidental: 0, octave: 4 }
 *
 * ```
 *
 * @export
 * @param {*} input
 * @returns {(Pitch|undefined)}
 */
export function makePitch(input: any): Pitch | undefined {
  if (!input) return
  if (typeof input !== 'object' && typeof input !== 'function' && typeof input !== 'string') return

  let data = {
    stepName: input.stepName,
    accidental: input.accidental,
    octave: input.octave,
  }
  if (isPitch(data)) return data

  return fromString(String(input))
}
