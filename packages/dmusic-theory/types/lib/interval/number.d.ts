/**
 * 是否合法的音程度数（大于等于一度）
 *
 * @export
 * @param {*} input
 * @returns {input is number}
 */
export declare function isNumber(input: any): input is number;
/**
 * 判断是否为一、四、五、八度 (这些度数可能为纯音程)
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export declare function is1458(number: number): boolean;
/**
 * 判断是否复音程
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export declare function isCompound(number: number): boolean;
/**
 * 判断是否复简单音程
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export declare function isSimple(number: number): boolean;
/**
 * 判断音程的度数是否为八度的整数倍
 *
 * @export
 * @param {number} number
 * @returns {boolean}
 */
export declare function isOctaves(number: number): boolean;
/**
 * 将音级数 number 转换成序数形式，
 * 输入 0～99 的数字，输出对应的序号：1st,2nd,3rd,4th,...8ve,9th...
 *
 * @export
 * @param {number} number
 * @returns {(string|undefined)}
 */
export declare function toOrdinal(number: number): string | undefined;
/**
 * 将音程度数 ordinal 序数转换成 number 数字，
 * 输入 0～99 的序号：1st,2nd,3rd,4th,...8ve,9th...，输出对应的数字
 *
 * @export
 * @param {string} ordinal
 * @returns {(number|undefined)}
 */
export declare function fromOrdinal(ordinal: string): number | undefined;
/**
 * 将音级数 number 转换成序数单词形式，
 * 输入 1～99 的数字，输出对应的序数词：unison,second,...octave,ninth...
 *
 * @export
 * @param {number} number
 * @returns {(string|undefined)}
 */
export declare function toOrdinalWord(number: number): string | undefined;
/**
 * 将音程度数 ordinalWord 转换成 number 数字，
 * 输入0～99 的序号：unison,second,...octave,ninth...，输出对应的数字
 *
 * @export
 * @param {string} ordinalWord
 * @returns {(number|undefined)}
 */
export declare function fromOrdinalWord(ordinalWord: string): number | undefined;
/**
 * 从字符串中提取有效的 number
 *
 * @export
 * @param {string} input
 * @returns {(number|undefined)}
 */
export declare function fromString(input: string): number | undefined;
