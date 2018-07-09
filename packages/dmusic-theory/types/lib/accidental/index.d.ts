/**
 * # Accidental (变音记号)
 *
 * 我们约定变音记号有以下三种等价的形式：
 *
 * - nicename，单词形式，如 `sharp`
 * - sign，符号形式，如 `♯`
 * - offset，对半音的修饰偏移值，如 `1`
 */
/** 变音记号名称形式 */
export declare type AccidentalNiceName = 'double flat' | 'flat' | 'natural' | 'sharp' | 'double sharp';
/** 变音记号符号形式 */
export declare type AccidentalSign = '\u266D\u266D' | '\u266D' | '\u266E' | '\u266F' | '\u00D7';
/** 变音记号半音 offset 形式 */
export declare type AccidentalOffset = -2 | -1 | 0 | 1 | 2;
/** 变音记号 */
export declare type Accidental = AccidentalNiceName | AccidentalSign | AccidentalOffset;
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
export declare function isAccidental(input: any): input is Accidental;
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
export declare function offset(accidental?: Accidental): AccidentalOffset;
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
export declare function niceName(accidental?: Accidental): AccidentalNiceName;
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
export declare function sign(accidental?: Accidental): AccidentalSign;
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
export declare function fromString(input: string): AccidentalSign;
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
export declare function toString(accidental: Accidental): string;
