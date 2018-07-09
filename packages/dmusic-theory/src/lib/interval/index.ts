/**
 * # Interval 音程
 */

//  Interval (音程)
//
//  interval 使用 { number(度数), quality(性质) } 来定义。
//
//  `number` (diatonic number)，按照 diatonic numbering 编码惯例，跟 diatonic-scale degrees 一一对应。
//  `quality` 作为一个前缀，如 纯、大、小、增、减等等，用来区分同样 number 但 size 不同的 interval。
//
//  十二平均律中，一个 `octave` 等分成 12 份，每份是一个 `semitone` (半音，half-step，此外有whole-step全音)。
//  quality 就是用来区分不同的 semitone 数量的。
//
//  因此，一个 interval，也能定义成 { number(度数), semitone(包含的半音数) }
//
//  为了简化量化计算，这里主要使用 { number(度数), semitone(半音) } 的定义来处理 interval 的运算。
//  如：
//  { number: 1, semitone: 0 }(1 度, 0 半音) --> { number: 1, quality: 'perfect' }('纯'一度)
//  { number: 1, semitone: 1 }(1 度, 1 半音) --> { number: 1, quality: 'augmented' }('增'一度)
//
//  音程的物理意义的 size，可以使用 frequency ratio (频率比) 来表示，即两个 pitch 的频率比。
//  或者用对数单位 cents(音分) 来表示，一个 semitone 就是 100cents（十二平均律）。
//  一个 octave(八度) 可以用 2:1 的 ratio 或者 1200cents 来表示。

import {numberToSemitone, semitoneToNumber, numberOctaves} from '../diatonic'

import {
  Quality,
  isQuality,
  offset as qualityOffset,
  prefix as qualityPrefix,
  niceName as qualityNiceName,
  invert as invertQuality,
  fromString as qualityFromString,
} from './quality'

import {
  isNumber,
  is1458,
  isSimple as isSimpleNumber,
  fromString as numberFromString,
  toOrdinalWord as numberToOrdinalWord,
} from './number'

import {isSemitone} from './semitone'

import {semitonesToCents, semitonesToFrequencyRatio} from '../conversion'

export {Quality} from './quality'
export {CompoundSemitone} from './semitone'

// 符合乐理习惯的音程数据结构，用以接收外部输出的数据
/** 符合乐理习惯的音程定义 */
export interface QualityInterval {
  /** 度数，从 1 开始编号（一度）*/
  number: number

  /** 性质，如 perfect, major, minor 等等，用以修饰音程的半音区别 */
  quality: Quality

  [key: string]: any
}

// 量化表示的音程数据结构，某些运算需要转换外部输出的数据结构为这个形式，方便计算。
/** 便于量化的音程定义 */
export interface SemitoneInterval {
  /** 度数，从 1 开始编号（一度）*/
  number: number

  /** 半音数量，音程内部包含了多少个半音，可以理解为量化的 quality */
  semitone: number

  [key: string]: any
}

/** 音程类型 */
export type Interval = SemitoneInterval | QualityInterval

// 类型断言，判断是否为 SemitoneInterval
const _isSemitoneInterval = (interval: Interval): interval is SemitoneInterval => {
  return (interval as SemitoneInterval).semitone !== undefined
}

// 类型断言，判断是否为 QualityInterval
const _isQualityInterval = (interval: Interval): interval is QualityInterval => {
  return (interval as QualityInterval).quality !== undefined
}

/**
 * 判断外部输入的任意音程数据是否合法
 *
 * @export
 * @param {*} interval
 * @returns {interval is Interval}
 */
export function isInterval(interval: any): interval is Interval {
  // 度数 number 是正整数（一个音距离自身的距离是一度），大于九十九度获取不到 niceName，实际也不会用到；
  // 半音数量 semitone 不会是负数（不存在减一度这样的音程）；
  // 最后考虑音程性质的有效性，例如一四五八度不存在 minor、major 性质，二三六七不存在 perfect 性质。
  if (!interval || !isNumber(interval.number)) return false
  const number = interval.number
  const _is1458 = is1458(number)

  if (isSemitone(interval.semitone)) {
    let offset = interval.semitone - numberToSemitone(number)
    if (isQuality(offset, _is1458)) return true
  }
  if (isQuality(interval.quality, _is1458)) {
    let offset = qualityOffset(interval.quality, _is1458)
    let semitone = numberToSemitone(number) + offset
    if (semitone >= 0) return true
  }
  return false
}

/**
 * 获取音程的 quality
 *
 * @export
 * @param {Interval} interval
 * @returns {Quality}
 */
export function quality(interval: Interval): Quality {
  let number = interval.number
  let _is1458 = is1458(number)
  if (_isSemitoneInterval(interval)) {
    // offset
    return interval.semitone - numberToSemitone(number)
  }
  return interval.quality
}

/**
 * 获取音程的 semitone
 *
 * @export
 * @param {Interval} interval
 * @returns {number}
 */
export function semitones(interval: Interval): number {
  if (_isQualityInterval(interval)) {
    let offset = qualityOffset(interval.quality, is1458(interval.number))
    return numberToSemitone(interval.number) + offset
  }
  return interval.semitone
}

// SemitoneInterval => QualityInterval
const convertToQualityInterval = (interval: SemitoneInterval): QualityInterval => ({
  number: interval.number,
  quality: quality(interval),
})

// QualityInterval => SemitoneInterval
const convertToSemitoneInterval = (interval: QualityInterval): SemitoneInterval => ({
  number: interval.number,
  semitone: semitones(interval),
})

/**
 * 通过 semitone、quality 反推算 number，
 * 可能返回 undefined，即输入的是不可能存在的组合
 *
 * @export
 * @param {number} semitone
 * @param {string} quality
 * @returns {(number|undefined)}
 */
export function numbers(semitone: number, quality: string): number | undefined {
  // 假设是 1458 度
  if (isQuality(quality, true)) {
    let offset = qualityOffset(quality as Quality, true)
    let _number = semitoneToNumber(semitone - offset)
    if (_number !== undefined && is1458(_number)) return _number
  }

  // 假定是 2367 度
  if (isQuality(quality, false)) {
    let offset = qualityOffset(quality as Quality, false)
    let _number = semitoneToNumber(semitone - offset)
    if (_number !== undefined && !is1458(_number)) return _number
  }
}

/**
 * 判断两个音程是否完全等价
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export function equal(interval1: Interval, interval2: Interval): boolean {
  if (interval1 === interval2) return true
  if (interval1.number !== interval2.number) return false
  let i1 = _isSemitoneInterval(interval1) ? interval1 : convertToSemitoneInterval(interval1)
  let i2 = _isSemitoneInterval(interval2) ? interval2 : convertToSemitoneInterval(interval2)
  return i1.semitone === i2.semitone
}

/**
 * 判断两个音程是否是若干个（含零个）八度距离
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export function simpleEqual(interval1: Interval, interval2: Interval): boolean {
  if (interval1 === interval2) return true
  let i1 = isSimpleNumber(interval1.number) ? interval1 : simplify(interval1)
  let i2 = isSimpleNumber(interval2.number) ? interval2 : simplify(interval2)
  return equal(i1, i2)
}

/**
 * 判断两个音程的半音距离是否相同（如“增一度” 与 “小二度”）
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export function semitoneEqual(interval1: Interval, interval2: Interval): boolean {
  if (interval1 === interval2) return true
  let i1 = _isSemitoneInterval(interval1) ? interval1 : convertToSemitoneInterval(interval1)
  let i2 = _isSemitoneInterval(interval2) ? interval2 : convertToSemitoneInterval(interval2)
  return i1.semitone === i2.semitone
}

/**
 * 音程叠加上一个或多个 octave。
 *
 * @export
 * @param {Interval} interval
 * @param {number} [times=1]
 * @returns {Interval}
 */
export function increaseOctave(interval: Interval, times: number = 1): Interval {
  if (_isSemitoneInterval(interval)) {
    let increased = {number: interval.number, semitone: interval.semitone}
    while (times) {
      increased.number += 7
      increased.semitone += 12
      times -= 1
    }
    return increased
  } else {
    let increased = increaseOctave(convertToSemitoneInterval(interval), times)
    return {
      number: increased.number,
      quality: interval.quality,
    }
  }
}

/**
 * 音程减去一个或多个 octave，注意，不会出现小于一度、半音小于 0 的结果。
 *
 * @export
 * @param {Interval} interval
 * @param {number} [times=1]
 * @returns {Interval}
 */
export function decreaseOctave(interval: Interval, times: number = 1): Interval {
  if (_isSemitoneInterval(interval)) {
    let decreased = {
      number: interval.number,
      semitone: interval.semitone,
    }
    while (times && decreased.number - 7 >= 1 && decreased.semitone - 12 >= 0) {
      decreased.number -= 7
      decreased.semitone -= 12
      times -= 1
    }
    return decreased
  } else {
    let decreased = decreaseOctave(convertToSemitoneInterval(interval), times)
    return {
      number: decreased.number,
      quality: interval.quality,
    }
  }
}

/**
 * 合理化一个音程，避免 number 小于 1 或 semitone 小于 0 的情况
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export function rationalize(interval: Interval): Interval {
  if (_isSemitoneInterval(interval)) {
    let rationalized: SemitoneInterval = {
      number: interval.number,
      semitone: interval.semitone,
    }
    while (rationalized.number < 1 || rationalized.semitone < 0) {
      rationalized = increaseOctave(rationalized) as SemitoneInterval
      if (rationalized.number > 99) throw new Error('Invalid Interval')
    }
    return rationalized
  } else {
    let tempInterval = rationalize(convertToSemitoneInterval(interval)) as SemitoneInterval
    return {number: tempInterval.number, quality: interval.quality}
  }
}

/**
 * 简化一个复合音程为简单音程。注意，为了运算一致性，特别排除了纯八度、增八度（它们会被处理成纯一度、增一度）
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export function simplify(interval: Interval): Interval {
  let number = interval.number
  let _octaves = numberOctaves(number)
  if (_isQualityInterval(interval)) {
    let quality = interval.quality
    let simple: QualityInterval = {number, quality}
    return isSimpleNumber(simple.number) && simple.number !== 8 ? simple : decreaseOctave(simple, _octaves)
  } else {
    let semitone = interval.semitone
    let simple: SemitoneInterval = {number, semitone}
    return isSimpleNumber(simple.number) && simple.number !== 8 ? simple : decreaseOctave(simple, _octaves)
  }
}

/**
 * 转位一个音程
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export function invert(interval: Interval): Interval {
  let number = interval.number
  if (_isSemitoneInterval(interval)) {
    let semitone = interval.semitone
    let inverted = {number: 9 - number, semitone: 12 - semitone}
    return rationalize(inverted)
  } else {
    let quality = interval.quality
    let invertedQuality = invertQuality(quality, is1458(number)) as Quality
    let inverted: QualityInterval = {
      number: 9 - number,
      quality: invertedQuality,
    }
    return rationalize(inverted)
  }
}

/**
 * 合并两个音程为一个大的音程，如 M3 与 m3 可以合并成一个 P5
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {SemitoneInterval}
 */
export function join(interval1: Interval, interval2: Interval): SemitoneInterval {
  let i1 = _isSemitoneInterval(interval1) ? interval1 : convertToSemitoneInterval(interval1)
  let i2 = _isSemitoneInterval(interval2) ? interval2 : convertToSemitoneInterval(interval2)
  let number = i1.number + i2.number - 1
  let semitone = i1.semitone + i2.semitone

  return {number: number, semitone: semitone}
}

/**
 * 将多个音程 merge 成一个大的音程
 *
 * @export
 * @param {...Interval[]} intervals
 * @returns {Interval}
 */
export function merge(...intervals: Interval[]): Interval {
  if (intervals.length === 1) return intervals[0]
  if (intervals.length === 2) return join(intervals[0], intervals[1])
  return intervals.reduce((merged, interval) => {
    return merged ? join(merged, interval) : interval
  })
}

/** 拆分出去一个子音程，返回剩余音程（可能出现负数的情况，逻辑中自行排除）*/
export function split(interval: Interval, part: Interval): SemitoneInterval {
  let i1 = _isSemitoneInterval(interval) ? interval : convertToSemitoneInterval(interval)
  let i2 = _isSemitoneInterval(part) ? part : convertToSemitoneInterval(part)
  let number = i1.number - i2.number + 1
  let semitone = i1.semitone - i2.semitone
  return {number: number, semitone: semitone}
}

/**
 * 拆分出去若干个子音程，返回剩余的音程
 *
 * @export
 * @param {...Interval[]} intervals
 * @returns {Interval}
 */
export function separate(...intervals: Interval[]): Interval {
  if (intervals.length === 1) return intervals[0]
  if (intervals.length === 1) return split(intervals[0], intervals[1])
  return intervals.reduce((splited, interval) => {
    return splited ? split(splited, interval) : interval
  })
}

/**
 * 获取音程的音分表示方式
 *
 * @export
 * @param {Interval} interval
 * @returns {number}
 */
export function cents(interval: Interval): number {
  if (_isSemitoneInterval(interval)) {
    return semitonesToCents(interval.semitone)
  }
  let _interval = convertToSemitoneInterval(interval)
  return semitonesToCents(_interval!.semitone)
}

/**
 * 获取音程的频率比表示方式
 *
 * @export
 * @param {Interval} interval
 * @returns
 */
export function frequencyRatio(interval: Interval) {
  if (_isSemitoneInterval(interval)) {
    return semitonesToFrequencyRatio(interval.semitone)
  }
  let _interval = convertToSemitoneInterval(interval)
  return semitonesToFrequencyRatio(_interval!.semitone)
}

/**
 * 输出音程的字符串表示
 *
 * @export
 * @param {Interval} interval
 * @returns {string}
 */
export function toString(interval: Interval): string {
  let _quality = _isQualityInterval(interval) ? interval.quality : quality(interval)
  _quality = qualityPrefix(_quality, is1458(interval.number))
  return _quality + interval.number
}

/**
 * 以更可读的形式输出音程的字符串表示
 *
 * @export
 * @param {Interval} interval
 * @returns {string}
 */
export function toNiceString(interval: Interval): string {
  let _number = numberToOrdinalWord(interval.number)
  let _quality = _isQualityInterval(interval) ? interval.quality : quality(interval)
  _quality = qualityNiceName(_quality, is1458(interval.number))
  return _quality + ' ' + _number
}

/**
 * 从输入的字符串中，提取可能的 Interval
 *
 * @export
 * @param {string} input
 * @returns {(Interval|undefined)}
 */
export function fromString(input: string): Interval | undefined {
  if (typeof input === 'string') {
    let number = numberFromString(input)
    if (!isNumber(number)) return

    let quality = qualityFromString(input, is1458(number))
    if (!quality) return

    let interval = {number, quality}
    return isInterval(interval) ? interval : undefined
  }
}

/**
 * 从任意输入中提取数据构造音程
 *
 * @export
 * @param {*} input
 * @returns {(Interval|undefined)}
 */
export function makeInterval(input: any): Interval | undefined {
  if (!input) return
  if (typeof input !== 'object' && typeof input !== 'function' && typeof input !== 'string') return

  let data = {
    number: input.number,
    semitone: input.semitone,
    quality: input.quality,
  }
  if (isInterval(data)) return data
  return fromString(String(input))
}
