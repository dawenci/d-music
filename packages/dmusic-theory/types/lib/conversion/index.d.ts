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
export declare function frequencyRatioToSemitones(ratio: number, toFixed?: number): number;
/**
 * convert semitones into frequency ratio，
 *
 * @export
 * @param {number} semitones 半音数量
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 频率比
 */
export declare function semitonesToFrequencyRatio(semitones: number, toFixed?: number): number;
/**
 * convert cents into semitones，
 *
 * @export
 * @param {number} cents 音分
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 半音数量
 */
export declare function centsToSemitones(cents: number, toFixed?: number): number;
/**
 * convert semitones into cents
 *
 * @export
 * @param {number} semitones 半音数量
 * @param {number} [toFixed] 保留小数位数（四舍五入）
 * @returns {number} 音分
 */
export declare function semitonesToCents(semitones: number, toFixed?: number): number;
