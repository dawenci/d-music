/**
 * # Quality (Interval) 音程性质
 */

// Quality (音程性质)
//
// quality 用来修饰 interval 的性质，用以区别同样度数的音程的 size。
// 主要使用的 quality 有：
//
// `perfect (纯 OR 完全)`
// `major (大)`
// `minor (小)`
// `augmented (增)`
// `diminished (减)`
// `doubly diminished`，`triply diminished`，`quadruply diminished`
// `doubly augmented`, `triply augmented'`, `quadruply augmented`
// 也可以用单字母 + 度数的方式来速记，如：
// major second --> M2, perfect fifth --> P5

/** 1、4、5、8 度性质前缀 */
export type PerfectQualityPrefix = 'dddd' | 'ddd' | 'dd' | 'd' | 'P' | 'A' | 'AA' | 'AAA' | 'AAAA'
/** 2、3、6、7 度性质前缀 */
export type ImperfectQualityPrefix =
  | 'dddd'
  | 'ddd'
  | 'dd'
  | 'd'
  | 'm'
  | 'M'
  | 'A'
  | 'AA'
  | 'AAA'
  | 'AAAA'
/** 性质前缀 */
export type QualityPrefix = PerfectQualityPrefix | ImperfectQualityPrefix

/** 1、4、5、8 度性质名称 */
export type PerfectQualityNiceName =
  | 'quadruply diminished'
  | 'triply diminished'
  | 'doubly diminished'
  | 'diminished'
  | 'perfect'
  | 'augmented'
  | 'doubly augmented'
  | 'triply augmented'
  | 'quadruply augmented'

/** 2、3、6、7 度性质名称 */
export type ImperfectQuailtyNiceName =
  | 'quadruply diminished'
  | 'triply diminished'
  | 'doubly diminished'
  | 'diminished'
  | 'minor'
  | 'major'
  | 'augmented'
  | 'doubly augmented'
  | 'triply augmented'
  | 'quadruply augmented'
/** 性质名称 */
export type QualityNiceName = PerfectQualityNiceName | ImperfectQuailtyNiceName
/** 1、4、5、8 性质前缀、名称 */
export type PerfectQualityName = PerfectQualityPrefix | PerfectQualityNiceName
/** 2、3、6、7 性质前缀、名称 */
export type ImperfectQualityName = ImperfectQualityPrefix | ImperfectQuailtyNiceName

/** 1458 度的 quality 对 semitone 的修正偏移数 */
export const enum PerfectQualityOffset {
  dddd = -4,
  ddd = -3,
  dd = -2,
  d = -1,
  P = 0,
  A = 1,
  AA = 2,
  AAA = 3,
  AAAA = 4,
}
/** 2367 度的 quality 对 semitone 的修正偏移数 */
export const enum ImperfectQualityOffset {
  dddd = -5,
  ddd = -4,
  dd = -3,
  d = -2,
  m = -1,
  M = 0,
  A = 1,
  AA = 2,
  AAA = 3,
  AAAA = 4,
}

export type Name = QualityPrefix | QualityNiceName
export type Offset = PerfectQualityOffset | ImperfectQualityOffset

export type Quality = Name | Offset

const PERFECT_LENGTH = 9
const IMPERFECT_LENGTH = 10

const PERFECT_PREFIX_NAMES: PerfectQualityPrefix[] = [
  'dddd',
  'ddd',
  'dd',
  'd',
  'P',
  'A',
  'AA',
  'AAA',
  'AAAA',
]
const IMPERFECT_PREFIX_NAMES: ImperfectQualityPrefix[] = [
  'dddd',
  'ddd',
  'dd',
  'd',
  'm',
  'M',
  'A',
  'AA',
  'AAA',
  'AAAA',
]

const PERFECT_NICE_NAMES: PerfectQualityNiceName[] = [
  'quadruply diminished',
  'triply diminished',
  'doubly diminished',
  'diminished',
  'perfect',
  'augmented',
  'doubly augmented',
  'triply augmented',
  'quadruply augmented',
]
const IMPERFECT_NICE_NAMES: ImperfectQuailtyNiceName[] = [
  'quadruply diminished',
  'triply diminished',
  'doubly diminished',
  'diminished',
  'minor',
  'major',
  'augmented',
  'doubly augmented',
  'triply augmented',
  'quadruply augmented',
]

const PERFECT_OFFSETS: PerfectQualityOffset[] = [
  PerfectQualityOffset.dddd,
  PerfectQualityOffset.ddd,
  PerfectQualityOffset.dd,
  PerfectQualityOffset.d,
  PerfectQualityOffset.P,
  PerfectQualityOffset.A,
  PerfectQualityOffset.AA,
  PerfectQualityOffset.AAA,
  PerfectQualityOffset.AAAA,
]
const IMPERFECT_OFFSETS: ImperfectQualityOffset[] = [
  ImperfectQualityOffset.dddd,
  ImperfectQualityOffset.ddd,
  ImperfectQualityOffset.dd,
  ImperfectQualityOffset.d,
  ImperfectQualityOffset.m,
  ImperfectQualityOffset.M,
  ImperfectQualityOffset.A,
  ImperfectQualityOffset.AA,
  ImperfectQualityOffset.AAA,
  ImperfectQualityOffset.AAAA,
]

/**
 * 检查输入是否有效的 quality 前缀 OR 完整名称 OR offset 值
 *
 * @export
 * @param {*} quality
 * @param {boolean} [is1458=false]
 * @returns {quality is Quality}
 */
export function isQuality(quality: any, is1458: boolean = false): quality is Quality {
  if (typeof quality === 'number') {
    return quality <= 4 && (is1458 ? quality >= -4 : quality >= -5)
  }

  if (typeof quality !== 'string') return false

  let length
  let prefixNames
  let niceNames
  if (is1458) {
    length = PERFECT_LENGTH
    prefixNames = PERFECT_PREFIX_NAMES
    niceNames = PERFECT_NICE_NAMES
  } else {
    length = IMPERFECT_LENGTH
    prefixNames = IMPERFECT_PREFIX_NAMES
    niceNames = IMPERFECT_NICE_NAMES
  }

  while (length--) if (prefixNames[length] === quality || niceNames[length] === quality) return true

  return false
}

// 类型断言
function _isName(quality: Name | Offset): quality is Name {
  return typeof quality === 'string'
}
function _isOffset(quality: Name | Offset): quality is Offset {
  return typeof quality === 'number'
}
function _isPrefix(quality: Name): quality is QualityPrefix {
  return quality.length < 5
}
function _isPerfect(
  quality: Name | Offset,
  is1458: boolean = false
): quality is PerfectQualityName | PerfectQualityOffset {
  return is1458
}

function index1458(quality: PerfectQualityName | PerfectQualityOffset): number {
  if (_isOffset(quality)) return PERFECT_OFFSETS.indexOf(quality)
  return _isPrefix(quality)
    ? PERFECT_PREFIX_NAMES.indexOf(quality)
    : PERFECT_NICE_NAMES.indexOf(quality)
}

// 获取转位后的 index
function reverseIndex1458(index: number): number {
  return PERFECT_LENGTH - 1 - index
}

function index2367(quality: ImperfectQualityName | ImperfectQualityOffset): number {
  if (_isOffset(quality)) return IMPERFECT_OFFSETS.indexOf(quality)
  return _isPrefix(quality)
    ? IMPERFECT_PREFIX_NAMES.indexOf(quality)
    : IMPERFECT_NICE_NAMES.indexOf(quality)
}
// 获取转位后的 index
function reverseIndex2367(index: number): number {
  return IMPERFECT_LENGTH - 1 - index
}

/**
 * 获取转位后的 quality，即 M => m, major => minor, ...
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {Quality}
 */
export function invert(quality: Quality, is1458: boolean = false): Quality {
  if (_isPerfect(quality, is1458)) {
    let index = index1458(quality as PerfectQualityName | PerfectQualityOffset)
    let reverseIndex = reverseIndex1458(index)
    if (_isOffset(quality)) return PERFECT_OFFSETS[reverseIndex]
    return _isPrefix(quality)
      ? PERFECT_PREFIX_NAMES[reverseIndex]
      : PERFECT_NICE_NAMES[reverseIndex]
  } else {
    let index = index2367(quality as ImperfectQualityName | ImperfectQualityOffset)
    let reverseIndex = reverseIndex2367(index)
    if (_isOffset(quality)) return IMPERFECT_OFFSETS[reverseIndex]
    return _isPrefix(quality)
      ? IMPERFECT_PREFIX_NAMES[reverseIndex]
      : IMPERFECT_NICE_NAMES[reverseIndex]
  }
}

/**
 * 获取 quality 的 semitone 偏移
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {Offset}
 */
export function offset(quality: Quality, is1458: boolean = false): Offset {
  if (_isOffset(quality)) return quality
  if (_isPerfect(quality, is1458)) {
    let index = index1458(quality)
    return PERFECT_OFFSETS[index]
  } else {
    let index = index2367(quality)
    return IMPERFECT_OFFSETS[index]
  }
}

/**
 * 获取 quality 的缩写前缀
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {QualityPrefix}
 */
export function prefix(quality: Quality, is1458: boolean = false): QualityPrefix {
  if (_isName(quality) && _isPrefix(quality)) return quality
  if (_isPerfect(quality, is1458)) {
    let index = index1458(quality)
    return PERFECT_PREFIX_NAMES[index]
  } else {
    let index = index2367(quality)
    return IMPERFECT_PREFIX_NAMES[index]
  }
}

/**
 * 获取 quality 的 nice name
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {NiceName}
 */
export function niceName(quality: Quality, is1458: boolean = false): QualityNiceName {
  if (_isName(quality) && !_isPrefix(quality)) return quality
  if (_isPerfect(quality, is1458)) {
    let index = index1458(quality)
    return PERFECT_NICE_NAMES[index]
  } else {
    let index = index2367(quality)
    return IMPERFECT_NICE_NAMES[index]
  }
}

/**
 * 从字符串中提取有效的 quality name
 *
 * @export
 * @param {string} input
 * @param {boolean} is1458
 * @returns {(Quality | undefined)}
 */
export function fromString(input: string, is1458: boolean): Quality | undefined {
  let quality = input.trim()
  let niceNameReg = /((doubly|triply|quadruply)(-|\s)?)?(augmented|diminished|perfect|major|minor)/
  let prefixReg = /(P{1}|M{1}|m{1}|A{1,4}|d{1,4})\d+/
  let match: RegExpMatchArray | null
  if ((match = quality.match(niceNameReg))) {
    let sub = match[0]
    if (sub.indexOf('-') !== -1) sub = sub.replace('-', ' ') // doubly-augmented, ...
    if (isQuality(sub, is1458)) return sub
  } else if ((match = quality.match(prefixReg))) {
    let sub = match[1] // without number
    if (isQuality(sub, is1458)) return sub
  }

  return undefined
}
