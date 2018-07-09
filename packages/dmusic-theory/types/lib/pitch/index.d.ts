import { StepName } from '../diatonic';
import { Interval } from '../interval';
import { Accidental } from '../accidental';
/** 符合乐理习惯的 Pitch 接口 */
export interface Pitch {
    /** 音级名称，如 C, D, E, F, G, A, B */
    stepName: StepName;
    /** 变音记号，如 #, B, x, bb, natural, sharp, flat, ... */
    accidental?: Accidental;
    /** 科学音高记音法中的八度分组，如 C0，C1，C2，... */
    octave?: number;
}
/**
 * 计算音高距离 C0 的音级数量偏移
 *
 * @export
 * @param {Pitch} pitch
 * @returns {number}
 */
export declare function numbersStartWithC0(pitch: Pitch): number;
/**
 * 计算音高距离 C0 有多少个 semitone
 *
 * @export
 * @param {Pitch} pitch
 * @returns {number}
 */
export declare function semitonesStartWithC0(pitch: Pitch): number;
/**
 * 转换为与 C0 之间的音程
 *
 * @export
 * @param {Pitch} pitch
 * @returns {Interval}
 */
export declare function toIntervalStartWithC0(pitch: Pitch): Interval;
/**
 * 将与 C0 的音程转换成 Pitch
 *
 * @export
 * @param {Interval} interval
 * @returns {Pitch}
 */
export declare function fromIntervalStartWithC0(interval: Interval): Pitch;
/**
 * 判断任意输入是否为有效的 Pitch
 *
 * @export
 * @param {*} pitch 任意输入
 * @returns {pitch is Pitch}
 */
export declare function isPitch(pitch: any): pitch is Pitch;
/**
 * 判断两个 Pitch 是相同
 * @example
 * ```js
 *
 * const p1 = { number: 1, semitone: 1 }
 * const p2 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p3 = { stepName: 'D', accidental: 'flat', octave: 0 }
 * equal(p1, p2) // true
 * equal(p1, p3) // false
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export declare function equal(pitch1: Pitch, pitch2: Pitch): boolean;
/**
 * 判断两个 Pitch 音高是否相同（如同音异名）
 *
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p2 = { stepName: 'D', accidental: 'flat', octave: 0 }
 * semitoneEqual(p1, p2) // true
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export declare function semitoneEqual(pitch1: Pitch, pitch2: Pitch): boolean;
/**
 * 判断两个音是否是若干个（含零个）八度距离
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 0 }
 * const p2 = { stepName: 'C', accidental: 'sharp', octave: 1 }
 * semitoneEqual(p1, p2) // true
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch1 输入音1
 * @param {Pitch} pitch2 输入音2
 * @returns
 */
export declare function simpleEqual(pitch1: Pitch, pitch2: Pitch): boolean;
/**
 * 返回音名，stepName + accidental + octave 或自定义形式
 * @example
 * ```js
 *
 * const p1 = { stepName: 1, accidental: 0, octave: 0 }
 * name(p1) // C0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {string}
 */
export declare function name(pitch: Pitch): string;
/**
 * 将音符对象简化成 octave 为 0 的音符（即 C0-B0），注意不包含 C1
 * @example
 * ```js
 *
 * const p1 = { stepName: 'C', accidental: 'sharp', octave: 4 }
 * name(p1) // C♯4
 * simplify(p1)
 * name(p1) // C♯0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {Pitch} 输出简化结果
 */
export declare function simplify(pitch: Pitch): Pitch;
/**
 * 获取更高（上方若干音程距离）的另外一个音
 * @example
 * ```js
 *
 * import { makeInterval } from '../interval'
 * const M3 = makeInterval('M3')
 * const p1 = { stepName: 'C', accidental: 0, octave: 0 } // C0
 * const p2 = higherPitch(p1, M3)
 * name(p2) // E0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {Interval} interval 距离目标音的音程
 * @returns {Pitch}
 */
export declare function higherPitch(pitch: Pitch, interval: Interval): Pitch;
/**
 * 获取更低（下方若干音程距离）的另外一个音
 * @example
 * ```js
 *
 * import { makeInterval } from '../interval'
 * const m3 = makeInterval('m3')
 * const G = { stepName: 'G', accidental: 0, octave: 0 } // G0
 * const E = lowerPitch(G, m3)
 * name(E) // E0
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {Interval} interval 距离目标音的音程
 * @returns {Pitch}
 */
export declare function lowerPitch(pitch: Pitch, interval: Interval): Pitch;
/**
 * 获取音高的频率数值
 * @example
 * ```js
 *
 * const A4 = makePitch('A4')
 * frequency(A4) // 440
 *
 * ```
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @param {number} [toFixed] 可选，保留的小数位，无指定则完整输出
 * @returns {number}
 */
export declare function frequency(pitch: Pitch, toFixed?: number): number;
/**
 * 计算出音高对应的 MIDI note number (0-127)。
 * 中央 C (C4) 在 MIDI 编号中为 60 (midi C5)，
 * 编号 0 为 C-1 (midi C0)，
 * 编号 127 为 G9 (midi G10)
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {(number|undefined)} 输出 midi 编号
 */
export declare function toMidiNumber(pitch: Pitch): number | undefined;
/**
 * 根据 MIDI note number 计算出对应的一组音，一对多关系
 *
 * @export
 * @param {number} midiNumber 输入 midi 编号
 * @returns {Pitch[]} 输出一组音高一致的音（同音异名）
 */
export declare function fromMidiNumber(midiNumber: number): Pitch[];
/**
 * 计算出音高对应钢琴上的哪个按键：1(A0) ~ 88(C8)。
 * 多个音可以对应到同一个按键，多对一关系
 *
 * @export
 * @param {Pitch} pitch 输入音
 * @returns {(number | undefined)} 琴键序号
 */
export declare function toPianoKeyNumber(pitch: Pitch): number | undefined;
/**
 * 根据钢琴上的按键序号（1 ~ 88）计算出对应的一组音，一个按键可以对应到多个音，一对多关系
 *
 * @export
 * @param {number} keyNumber 琴键序号
 * @returns {Pitch[]} 琴键对应的一组音（同音异名）
 */
export declare function fromPianoKeyNumber(keyNumber: number): Pitch[];
/**
 * 获取距离 C0 音程相等的一组异名音
 *
 * @param {number} semitone 半音数量（相对于 C0）
 * @returns {Pitch[]} 一组等高异名的音
 */
export declare function enharmonicNotes(semitone: number): Pitch[];
/**
 * 将 Pitch 输出成字符串
 *
 * @export
 * @param {Pitch} pitch
 * @returns {string}
 */
export declare function toString(pitch: Pitch): string;
/**
 * 从任意字符串输入中，提取有效信息构造 Pitch
 *
 * @export
 * @param {string} input 输入的字符串
 * @returns {(Pitch|undefined)}
 */
export declare function fromString(input: string): Pitch | undefined;
/**
 * 从任意输入中，构造出匹配的音
 * @example
 * ```js
 *
 * makePitch(null) // undefined
 * makePitch('C4') // { stepName: 'C', accidental: 0, octave: 4 }
 * makePitch({ stepName: 'C', accidental: 0, octave: 4 }) // { stepName: 'C', accidental: 0, octave: 4 }
 *
 * ```
 *
 * @export
 * @param {*} input
 * @returns {(Pitch|undefined)}
 */
export declare function makePitch(input: any): Pitch | undefined;
