/**
 * # 自然音阶
 */

// 一个自然音阶，不包含不同的变音记号
//
// C D E F G A B C
// C# D# E# F# G# A# B# C#
//
// 两个字母之间的 `semitone` 数量都是确定、固定的，比如 C & D 之间，C# & D# 之间，等等
//
// 因此可以作为计算的基准

/**
 * @export
 * @interface CompoundNumber
 */
export interface CompoundNumber {
  octave: number
  number: number
}

/** 音级序号（以 C 大调为准）*/
export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

/** 每个音级距离主音的音程（以半音数量衡量）*/
export type StepSemitone = 0 | 2 | 4 | 5 | 7 | 9 | 11

/** 音级名称 */
export type StepName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

/** 音级数量 */
const LENGTH = 7

/** 音名排列 */
const NAMES: StepName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

/** 级数排列 */
const NUMBERS: StepNumber[] = [1, 2, 3, 4, 5, 6, 7]

/** 半音排列 */
const SEMITONES: StepSemitone[] = [0, 2, 4, 5, 7, 9, 11]

/**
 * 判断输入是否一个音名
 * @example
 * ```js
 *
 * isStepName('C') // true
 * isStepName('X') // false
 *
 * ```
 *
 * @export
 * @param {*} stepName
 * @returns {stepName is StepName}
 */
export function isStepName(stepName: any): stepName is StepName {
  if (typeof stepName !== 'string' || stepName.length !== 1) return false
  let code = stepName.charCodeAt(0)
  return code >= 65 && code <= 71
}

/**
 * 判断输入的半音数量是否对应 CDEFGAB 中某个音
 * @example
 * ```js
 *
 * isDiatonicSemitone(0) // true
 * isDiatonicSemitone(1) // fase
 * isDiatonicSemitone(2) // true
 *
 * ```
 *
 * @export
 * @param {*} semitone 距离 C 的半音数量
 * @returns {boolean}
 */
export function isDiatonicSemitone(semitone: any): boolean {
  if ((semitone | 0) !== semitone) return false
  let simpleSemitone = (semitone % 12) as StepSemitone
  return SEMITONES.indexOf(simpleSemitone) !== -1
}

/**
 * 获取音名
 * @example
 * ```js
 *
 * numberToName(1) // 'C'
 * numberToName(2) // 'D'
 *
 * ```
 *
 * @export
 * @param {number} diatonicNumber 音级序号
 * @returns {StepName}
 */
export function numberToStepName(diatonicNumber: number): StepName {
  let number = ((diatonicNumber | 0) % 7 || 7) as StepNumber
  let index = NUMBERS.indexOf(number)
  return NAMES[index]
}

/**
 * 获取 diatonic number
 * @example
 * ```js
 *
 * nameToNumber('C') // 1
 * nameToNumber('D') // 2
 *
 * ```
 *
 * @export
 * @param {StepName} stepName 音名
 * @returns {StepNumber}
 */
export function stepNameToNumber(stepName: StepName): StepNumber {
  let index = NAMES.indexOf(stepName)
  return NUMBERS[index]
}

/**
 * 获取符合 diatonic 音程间隔规律的 number 对应的 semitone。
 * 1(C)=>0, 2(D)=>2,...,8(C)=>12, 9(D)=>14,...
 * @example
 * ```js
 *
 * numberToSemitone(1) // 0
 * numberToSemitone(2) // 2
 * numberToSemitone(3) // 4
 *
 * ```
 *
 * @export
 * @param {number} number
 * @returns {number}
 */
export function numberToSemitone(number: number): number {
  let stepNumber = ((number | 0) % 7 || 7) as StepNumber
  let index = NUMBERS.indexOf(stepNumber)
  let semitone = SEMITONES[index]
  let _octave = numberOctaves(number)
  return semitone + _octave * 12
}

/**
 * 获取符合 diatonic 音程间隔规律的 semitone 对应的 number，无对应则返回 undefined
 * @example
 * ```js
 *
 * semitoneToNumber(4) // 3
 * semitoneToNumber(5) // undefined
 *
 * ```
 *
 * @export
 * @param {number} semitone 半音数量
 * @returns {(number|undefined)}
 */
export function semitoneToNumber(semitone: number): number | undefined {
  if ((semitone | 0) !== semitone) return
  let stepSemitone = (semitone % 12) as StepSemitone
  let index = SEMITONES.indexOf(stepSemitone)
  if (index === -1) return undefined
  let number = NUMBERS[index]
  let octave = Math.floor(semitone / 12)
  return number + octave * 7
}

/**
 * 获取 number 横跨的 octaves
 *
 * @export
 * @param {number} number
 * @returns {number}
 */
export function numberOctaves(number: number): number {
  return Math.floor((number - 1) / 7)
}

/**
 * 将音级数 number 折叠为 {octave, number} 的复合形式
 *
 * @export
 * @param {number} number
 * @returns {CompoundNumber}
 */
export function numberCompound(number: number): CompoundNumber {
  let compound = {
    octave: numberOctaves(number),
    number: number % 7 || 7,
  }
  return compound
}

/**
 * 将音级数 number 的 {octave, number} 复合形式展开成 number
 *
 * @export
 * @param {CompoundNumber} compound
 * @returns {number}
 */
export function numberSimplify(compound: CompoundNumber): number {
  return compound.octave * 7 + compound.number
}
