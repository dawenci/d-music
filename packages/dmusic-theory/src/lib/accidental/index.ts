/**
 * # Accidental (变音记号)
 *
 * 我们约定变音记号有以下三种等价的形式：
 *
 * - nicename，单词形式，如 `sharp`
 * - sign，符号形式，如 `♯`
 * - offset，对半音的修饰偏移值，如 `1`
 */

// accidental 用来改变一个 pitch 的音高
// 主要使用的变音记号有：
// `sharp（升号）`，让 pitch 升高一个 semitone
// `flat (降号)`，让 pitch 降低一个 semitone
// `double sharp（重升号）`，让 pitch 升高一个 semitone
// `double flat (重降号)`，让 pitch 降低两个 semitone

/** 变音记号名称形式 */
export type AccidentalNiceName = 'double flat' | 'flat' | 'natural' | 'sharp' | 'double sharp'

/** 变音记号符号形式 */
export type AccidentalSign = '\u266D\u266D' | '\u266D' | '\u266E' | '\u266F' | '\u00D7'

/** 变音记号半音 offset 形式 */
export type AccidentalOffset = -2 | -1 | 0 | 1 | 2

/** 变音记号 */
export type Accidental = AccidentalNiceName | AccidentalSign | AccidentalOffset

const LENGTH = 5

const NICE_NAMES: AccidentalNiceName[] = ['double flat', 'flat', 'natural', 'sharp', 'double sharp']

const OFFSETS: AccidentalOffset[] = [-2, -1, 0, 1, 2]

const SIGNS: AccidentalSign[] = ['\u266D\u266D', '\u266D', '\u266E', '\u266F', '\u00D7']

const ACCIDENTALS = (<Accidental[]>[])
  .concat(NICE_NAMES)
  .concat(OFFSETS)
  .concat(SIGNS)

const _isOffset = (accidental: Accidental): accidental is AccidentalOffset =>
  typeof accidental === 'number'

const _isSign = (accidental: Accidental): accidental is AccidentalSign =>
  SIGNS.indexOf(<AccidentalSign>accidental) !== -1

/**
 * 判断输入是否合法的 Accidental
 *
 * @example
 * ```js
 *
 * isAccidental('sharp') // true
 *
 * ```
 *
 * @export
 * @param {*} input 任意输入
 * @returns {input is Accidental}
 */
export function isAccidental(input: any): input is Accidental {
  return ACCIDENTALS.indexOf(input) !== -1
}

// 获取变音记号、名称、偏移的位置，便于几种形式的转换
const index = (accidental: Accidental = 0): number => {
  if (_isOffset(accidental)) return OFFSETS.indexOf(accidental)
  if (_isSign(accidental)) return SIGNS.indexOf(accidental)
  return NICE_NAMES.indexOf(accidental)
}

/**
 * 获取变音记号 semitone offset
 * @example
 * ```js
 *
 * offset('sharp') // 1
 * offset('flat') // -1
 *
 * ```
 *
 * @export
 * @param {Accidental} accidental 任意变音记号形式
 * @returns {AccidentalOffset}
 */
export function offset(accidental?: Accidental): AccidentalOffset {
  return OFFSETS[index(accidental)]
}

/**
 * 获取变音记号名称
 * @example
 * ```js
 *
 * niceName('1') // 'sharp'
 *
 * ```
 *
 * @export
 * @param {Accidental} accidental 任意变音记号形式
 * @returns {AccidentalNiceName} 变音记号的更可读形式
 */
export function niceName(accidental?: Accidental): AccidentalNiceName {
  return NICE_NAMES[index(accidental)]
}

/**
 * 获取变音记号
 * @example
 * ```js
 *
 * sign('sharp') // '♯'
 *
 * ```
 *
 * @export
 * @param {Accidental} accidental 任意变音记号形式
 * @returns {AccidentalSign} 变音记号的符号形式
 */
export function sign(accidental?: Accidental): AccidentalSign {
  return SIGNS[index(accidental)]
}

/**
 * 从输出的字符串中提取变音记号
 * @example
 * ```js
 *
 * fromString('#') // '♯'
 *
 * ```
 *
 * @export
 * @param {string} input 任意字符串输入
 * @returns {AccidentalSign} 匹配的变音记号形式或 undefined
 */
export function fromString(input: string): AccidentalSign {
  // 标准化变音记号，将#＃等统一转换成♯，降号、重升号也一样
  let match = (input || '')
    .replace(/[#＃]/, '\u266f')
    .replace(/b/g, '\u266d')
    .replace(/x/, '\u00d7')
    .match(/♭{1,3}|♯×|♯|×/)

  return match ? (match[0] as AccidentalSign) : SIGNS[2]
}

/**
 * 输出变音记号字符串
 * @example
 * ```js
 *
 * toString('sharp') // '♯'
 *
 * ```
 *
 * @export
 * @param {Accidental} accidental 任意变音记号形式
 * @returns {string} 变音记号符号形式字符串
 */
export function toString(accidental: Accidental): string {
  return sign(accidental)
}
