/**
 * # 换算
 */

/**
 * convert frequency ratio into semitones，
 *
 * @export
 * @param {number} ratio 频率比
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 半音数量
 */
export function frequencyRatioToSemitones(ratio: number, toFixed?: number): number {
  let semitones = 12 * Math.log(ratio) / Math.log(2)
  return toFixed === undefined ? semitones : +semitones.toFixed(toFixed)
}

/**
 * convert semitones into frequency ratio，
 *
 * @export
 * @param {number} semitones 半音数量
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 频率比
 */
export function semitonesToFrequencyRatio(semitones: number, toFixed?: number): number {
  let ratio = Math.pow(2, semitones / 12)
  return toFixed === undefined ? ratio : +ratio.toFixed(toFixed)
}

/**
 * convert cents into semitones，
 *
 * @export
 * @param {number} cents 音分
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 半音数量
 */
export function centsToSemitones(cents: number, toFixed?: number): number {
  let semitones = cents / 100
  return toFixed === undefined ? semitones : +semitones.toFixed(toFixed)
}

/**
 * convert semitones into cents
 *
 * @export
 * @param {number} semitones 半音数量
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 音分
 */
export function semitonesToCents(semitones: number, toFixed?: number): number {
  let cents = semitones * 100
  return toFixed === undefined ? cents : +cents.toFixed(toFixed)
}
