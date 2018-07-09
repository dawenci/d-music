/**
 * # Chord 和弦
 */
import { Pitch } from '../pitch';
import { Interval } from '../interval';
/** 转位，0 为原位，1为第一转位， 2为第二转位，以此类推 */
export declare type InvertedCase = number;
/** 和弦数据结构 */
export interface Chord {
    /** 和弦类型 */
    Class: ChordClass;
    /** 和弦类别 */
    type: ChordType;
    /** 和弦包含的音数量 */
    length: number;
    /** 和弦根音 */
    root: Pitch;
    /** 和弦三音 */
    third?: Pitch;
    /** 和弦五音 */
    fifth?: Pitch;
    /** 和弦七音 */
    seventh?: Pitch;
    /** 和弦九音 */
    ninth?: Pitch;
    /** 和弦十一音 */
    eleventh?: Pitch;
    [pitchIndex: number]: Pitch;
    [any: string]: any;
}
/** 和弦数据生成函数 */
export interface ChordCreator {
    /**
     * @param {Pitch} root 根音
     * @param {ChordType} 和弦类别
     * @param {InvertedCase} invertedCase 转位
     */
    (root: Pitch, type: ChordType, invertedCase?: InvertedCase): Chord;
}
/** 和弦所属类型 */
export declare type ChordClass = 'Triad' | 'Seventh' | 'Ninth' | 'Eleventh';
/** 和弦种类 */
export declare type ChordType = 'maj' | 'min' | 'aug' | 'dim' | 'sus2' | 'sus4' | '7' | 'm7' | 'M7' | 'mM7' | 'aug7' | 'dim7' | 'm7-5' | '6' | 'm6' | '9' | 'm9' | '11';
export interface ChordInfo {
    Class: ChordClass;
    intervals: Interval[];
}
/**
 * 转位一个和弦
 *
 * @example
 * ```js
 * const chord = fromString('C')
 * invert(chord, 1) // C/E
 * ```
 *
 * @export
 * @param {Chord} chord 和弦
 * @param {InvertedCase} invertedCase 第几转位
 * @returns {Chord}
 */
export declare function invert(chord: Chord, invertedCase: InvertedCase): Chord;
/**
 * 判断和弦是否转位
 * @example
 * ```js
 * const chord = fromString('C/E')
 * isInverted(chord) // true
 * ```
 *
 * @export
 * @param {Chord} chord 和弦
 * @returns {boolean}
 */
export declare function isInverted(chord: Chord): boolean;
/** 和弦创建器 */
export declare const create: ChordCreator;
/**
 * 输和弦的字符串表示
 *
 * @export
 * @param {Chord} chord
 * @returns {string}
 */
export declare function toString(chord: Chord): string;
/**
 * 从任意字符串中提取构造和弦
 *
 * @example
 *
 * ```js
 * fromString('C') // C major
 * fromString('Cmaj7') // C major seventh
 * ```
 *
 * @export
 * @param {string} input
 * @returns {(Chord|undefined)}
 */
export declare function fromString(input: string): Chord | undefined;
