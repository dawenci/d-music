/**
 * # Number (Interval) 度数
 */

// Number (度数)
//
// 用来描述一个音程包含的音级的数量，比如
// C 和 G 的音程关系包含了 { C,D,E,F,G } 五个音级，因此，这就是一个 `五度` 音程。
// C 和 C 自身的音程关系，包含了 { C } 一个音级，因此这是一个 `一度` 音程。
// C 和高八度的 C的音程关系，包含了 { C,D,E,F,G,A,B,C } 八个音级，因此是 `八度` 音程。
// 需要注意的是，不论音级是否是带有升降号（变化音级），度数都是一样的计算：
// C-G 五度，C♯-G 也是五度，依次类推，不论什么变音记号都一样。
// 区分这些同样度数，但是 size 不同的方式，可以使用 `quality` 或者 `semitone` 数量来区分。

const TENS = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const ORDINAL_TENS = TENS.map(function(number) {
  return number.replace(/y$/, 'ieth')
})
const ORDINAL_LESS_THAN_TWENTY = [
  undefined,
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
]

/**
 * 是否合法的音程度数（大于等于一度）
 *
 * @export
 * @param {*} input
 * @returns {input is number}
 */
export function isNumber(input: any): input is number {
  let check = input | 0
  return input === check && input > 0
}

/**
 * 判断是否为一、四、五、八度 (这些度数可能为纯音程)
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export function is1458(number: number): boolean {
  let num: number = number % 7
  return num === 1 || num === 4 || num === 5 //|| num === -2 || num === -3 || num === -6
}

/**
 * 判断是否复音程
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export function isCompound(number: number): boolean {
  return number > 8
}

/**
 * 判断是否复简单音程
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export function isSimple(number: number): boolean {
  return number < 9 && number > 0
}

/**
 * 判断音程的度数是否为八度的整数倍
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export function isOctaves(number: number): boolean {
  return number > 7 && (number - 1) % 7 === 0
}

/**
 * 将音级数 number 转换成序数形式，
 * 输入 0～99 的数字，输出对应的序号：1st,2nd,3rd,4th,...8ve,9th...
 *
 * @export
 * @param {number} number
 * @returns {(string|undefined)}
 */
export function toOrdinal(number: number): string | undefined {
  if (number < 1 || number > 99) return undefined

  var suffix
  if (number === 1) suffix = 'st'
  else if (number === 2) suffix = 'nd'
  else if (number === 3) suffix = 'rd'
  else if (number === 8) suffix = 've'
  else suffix = 'th'
  return number + suffix
}

/**
 * 将音程度数 ordinal 序数转换成 number 数字，
 * 输入 0～99 的序号：1st,2nd,3rd,4th,...8ve,9th...，输出对应的数字
 *
 * @export
 * @param {string} ordinal
 * @returns {(number|undefined)}
 */
export function fromOrdinal(ordinal: string): number | undefined {
  let match = ordinal.match(/\d+/)
  let number: number | undefined = match ? parseInt(match[0], 10) : undefined
  if (number === undefined || number < 0 || number > 99) return undefined
  return number
}

/**
 * 将音级数 number 转换成序数单词形式，
 * 输入 1～99 的数字，输出对应的序数词：unison,second,...octave,ninth...
 *
 * @export
 * @param {number} number
 * @returns {(string|undefined)}
 */
export function toOrdinalWord(number: number): string | undefined {
  if (number < 1 || number > 99) return undefined

  // 20 以内数字直出
  if (number === 1) return 'unison'
  if (number === 8) return 'octave'
  if (number < 20) return ORDINAL_LESS_THAN_TWENTY[number]

  let word: string
  // 20,30,40,50,60,70,80,90
  if (number % 10 === 0) {
    word = ORDINAL_TENS[number / 10 - 2]
    return word
  }

  // 21 ～ 99（除了10的倍数之外）
  let tens: number = Math.floor(number / 10)
  let units: number = number % 10

  word = TENS[tens - 2]
  if (units !== 0) word += '-' + ORDINAL_LESS_THAN_TWENTY[units]

  return word
}

/**
 * 将音程度数 ordinalWord 转换成 number 数字，
 * 输入0～99 的序号：unison,second,...octave,ninth...，输出对应的数字
 *
 * @export
 * @param {string} ordinalWord
 * @returns {(number|undefined)}
 */
export function fromOrdinalWord(ordinalWord: string): number | undefined {
  // unison, octave
  if (ordinalWord === 'unison') return 1
  if (ordinalWord === 'octave') return 8

  // less than nineteen (1~19)
  let number: number = ORDINAL_LESS_THAN_TWENTY.indexOf(ordinalWord)
  if (number === 0) return undefined
  if (number !== -1) return number

  // twentieth, thirtieth, ..., ninetieth (20,30,40,...,90)
  let match = ordinalWord.match(/ieth/)
  if (match !== null) {
    number = ORDINAL_TENS.indexOf(ordinalWord)
    if (number !== -1) return (number + 2) * 10
    return undefined
  }

  // twenty-first, ..., ninety-nineth
  let split = ordinalWord.split('-')
  if (split.length === 2) {
    let tensIndex = TENS.indexOf(split[0])
    if (tensIndex === -1) return undefined
    let tens = tensIndex + 2
    let units: number = ORDINAL_LESS_THAN_TWENTY.indexOf(split[1])
    if (units === -1) return undefined
    return tens * 10 + units
  }

  // others
  return undefined
}

/**
 * 从字符串中提取有效的 number
 *
 * @export
 * @param {string} input
 * @returns {(number|undefined)}
 */
export function fromString(input: string): number | undefined {
  input = input.replace(/(^\s*)|(\s*$)/g, '') // trim
  let number
  let match: RegExpMatchArray | null

  if ((match = input.match(/\d+$/))) {
    // 'P5' => '5' = 5
    number = +match[0]
  } else if ((match = input.match(/\d+(st|nd|rd|th){1}$/))) {
    // 'perfect 5th' => '5' => 5
    let sub = match[0].replace(/(st|nd|rd|th)/, '')
    number = +sub
  } else {
    // 'perfect fifth' => 'fifth' => 5
    match = input.match(/[a-zA-Z-]+$/)
    if (match !== null) {
      let ordinalWord = match[0]
      number = fromOrdinalWord(ordinalWord)
    }
  }
  return number && number > 0 && number < 99 ? number : undefined
}
