/**
 * # 自然音阶
 */
/**
 * @export
 * @interface CompoundNumber
 */
export interface CompoundNumber {
    octave: number;
    number: number;
}
/** 音级序号（以 C 大调为准）*/
export declare type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
/** 每个音级距离主音的音程（以半音数量衡量）*/
export declare type StepSemitone = 0 | 2 | 4 | 5 | 7 | 9 | 11;
/** 音级名称 */
export declare type StepName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
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
export declare function isStepName(stepName: any): stepName is StepName;
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
export declare function isDiatonicSemitone(semitone: any): boolean;
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
export declare function numberToStepName(diatonicNumber: number): StepName;
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
export declare function stepNameToNumber(stepName: StepName): StepNumber;
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
export declare function numberToSemitone(number: number): number;
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
export declare function semitoneToNumber(semitone: number): number | undefined;
/**
 * 获取 number 横跨的 octaves
 *
 * @export
 * @param {number} number
 * @returns {number}
 */
export declare function numberOctaves(number: number): number;
/**
 * 将音级数 number 折叠为 {octave, number} 的复合形式
 *
 * @export
 * @param {number} number
 * @returns {CompoundNumber}
 */
export declare function numberCompound(number: number): CompoundNumber;
/**
 * 将音级数 number 的 {octave, number} 复合形式展开成 number
 *
 * @export
 * @param {CompoundNumber} compound
 * @returns {number}
 */
export declare function numberSimplify(compound: CompoundNumber): number;
