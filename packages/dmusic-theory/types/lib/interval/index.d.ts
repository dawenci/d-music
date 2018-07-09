import { Quality } from './quality';
export { Quality } from './quality';
export { CompoundSemitone } from './semitone';
/** 符合乐理习惯的音程定义 */
export interface QualityInterval {
    /** 度数，从 1 开始编号（一度）*/
    number: number;
    /** 性质，如 perfect, major, minor 等等，用以修饰音程的半音区别 */
    quality: Quality;
    [key: string]: any;
}
/** 便于量化的音程定义 */
export interface SemitoneInterval {
    /** 度数，从 1 开始编号（一度）*/
    number: number;
    /** 半音数量，音程内部包含了多少个半音，可以理解为量化的 quality */
    semitone: number;
    [key: string]: any;
}
/** 音程类型 */
export declare type Interval = SemitoneInterval | QualityInterval;
/**
 * 判断外部输入的任意音程数据是否合法
 *
 * @export
 * @param {*} interval
 * @returns {interval is Interval}
 */
export declare function isInterval(interval: any): interval is Interval;
/**
 * 获取音程的 quality
 *
 * @export
 * @param {Interval} interval
 * @returns {Quality}
 */
export declare function quality(interval: Interval): Quality;
/**
 * 获取音程的 semitone
 *
 * @export
 * @param {Interval} interval
 * @returns {number}
 */
export declare function semitones(interval: Interval): number;
/**
 * 通过 semitone、quality 反推算 number，
 * 可能返回 undefined，即输入的是不可能存在的组合
 *
 * @export
 * @param {number} semitone
 * @param {string} quality
 * @returns {(number|undefined)}
 */
export declare function numbers(semitone: number, quality: string): number | undefined;
/**
 * 判断两个音程是否完全等价
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export declare function equal(interval1: Interval, interval2: Interval): boolean;
/**
 * 判断两个音程是否是若干个（含零个）八度距离
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export declare function simpleEqual(interval1: Interval, interval2: Interval): boolean;
/**
 * 判断两个音程的半音距离是否相同（如“增一度” 与 “小二度”）
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {boolean}
 */
export declare function semitoneEqual(interval1: Interval, interval2: Interval): boolean;
/**
 * 音程叠加上一个或多个 octave。
 *
 * @export
 * @param {Interval} interval
 * @param {number} [times=1]
 * @returns {Interval}
 */
export declare function increaseOctave(interval: Interval, times?: number): Interval;
/**
 * 音程减去一个或多个 octave，注意，不会出现小于一度、半音小于 0 的结果。
 *
 * @export
 * @param {Interval} interval
 * @param {number} [times=1]
 * @returns {Interval}
 */
export declare function decreaseOctave(interval: Interval, times?: number): Interval;
/**
 * 合理化一个音程，避免 number 小于 1 或 semitone 小于 0 的情况
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export declare function rationalize(interval: Interval): Interval;
/**
 * 简化一个复合音程为简单音程。注意，为了运算一致性，特别排除了纯八度、增八度（它们会被处理成纯一度、增一度）
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export declare function simplify(interval: Interval): Interval;
/**
 * 转位一个音程
 *
 * @export
 * @param {Interval} interval
 * @returns {Interval}
 */
export declare function invert(interval: Interval): Interval;
/**
 * 合并两个音程为一个大的音程，如 M3 与 m3 可以合并成一个 P5
 *
 * @export
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @returns {SemitoneInterval}
 */
export declare function join(interval1: Interval, interval2: Interval): SemitoneInterval;
/**
 * 将多个音程 merge 成一个大的音程
 *
 * @export
 * @param {...Interval[]} intervals
 * @returns {Interval}
 */
export declare function merge(...intervals: Interval[]): Interval;
/** 拆分出去一个子音程，返回剩余音程（可能出现负数的情况，逻辑中自行排除）*/
export declare function split(interval: Interval, part: Interval): SemitoneInterval;
/**
 * 拆分出去若干个子音程，返回剩余的音程
 *
 * @export
 * @param {...Interval[]} intervals
 * @returns {Interval}
 */
export declare function separate(...intervals: Interval[]): Interval;
/**
 * 获取音程的音分表示方式
 *
 * @export
 * @param {Interval} interval
 * @returns {number}
 */
export declare function cents(interval: Interval): number;
/**
 * 获取音程的频率比表示方式
 *
 * @export
 * @param {Interval} interval
 * @returns
 */
export declare function frequencyRatio(interval: Interval): number;
/**
 * 输出音程的字符串表示
 *
 * @export
 * @param {Interval} interval
 * @returns {string}
 */
export declare function toString(interval: Interval): string;
/**
 * 以更可读的形式输出音程的字符串表示
 *
 * @export
 * @param {Interval} interval
 * @returns {string}
 */
export declare function toNiceString(interval: Interval): string;
/**
 * 从输入的字符串中，提取可能的 Interval
 *
 * @export
 * @param {string} input
 * @returns {(Interval|undefined)}
 */
export declare function fromString(input: string): Interval | undefined;
/**
 * 从任意输入中提取数据构造音程
 *
 * @export
 * @param {*} input
 * @returns {(Interval|undefined)}
 */
export declare function makeInterval(input: any): Interval | undefined;
