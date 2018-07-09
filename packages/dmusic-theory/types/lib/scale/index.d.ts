/**
 * # Scale 音阶
 */
import { Pitch } from '../pitch';
import { Interval } from '../interval';
/** 音阶接口 */
export interface Scale {
    /** 音阶名字 */
    readonly name: string;
    /** 音阶内部音程间隔 */
    readonly ascendingIntervals: Interval[];
    readonly descendingIntervals: Interval[];
    /** 音级数量 */
    readonly length: number;
    /** 上下行方向 */
    direction: Direction;
    /** 获得音阶生成函数的引用 */
    creator(): ScaleCreator;
    /** 获取音阶中某个音级 */
    step(stepNumber: number): Pitch | undefined;
    /** 获取音阶的主音 */
    tonic(): Pitch;
    /** 获取音阶的上行版本 */
    ascending(): Scale;
    /** 获取音阶的下行版本 */
    descending(): Scale;
    /** 获取音阶中的所有音级 */
    pitches(): Pitch[];
    /** 音阶的字符串表示 */
    toString(): string;
    [index: number]: Pitch;
    [key: string]: any;
}
/** 音阶创建函数接口 */
export interface ScaleCreator {
    /**
     * @param {Pitch} tonic 主音
     * @param {Direction} direction 上行 OR 下行
     * @returns {Scale} 返回音阶
     */
    (tonic: Pitch, direction?: Direction): Scale;
    /**
     * 获得音阶的上行版本
     * @param {Scale} scale 输入的音阶
     * @returns {Scale} 输出上行音阶
     */
    ascending(scale: Scale): Scale;
    /**
     * 获得音阶的下行版本
     * @param {Scale} scale 输入的音阶
     * @returns {Scale} 输出下行音阶
     */
    descending(scale: Scale): Scale;
}
/** 音阶上行、下行方向 */
export declare const enum Direction {
    /** 上行 */
    ASCENDING = 1,
    /** 下行 */
    DESCENDING = 0,
}
export interface SchemaOptions {
    intervals?: Interval[];
    ascendingIntervals?: Interval[];
    descendingIntervals?: Interval[];
}
/**
 * 定义一个音阶的规格，返回一个音阶对象的创建函数
 *
 * @export
 * @example
 * ```js
 *
 * import { fromString as pitchFromString } from '../pitch'
 * import { fromString as intervalFromString } from '../interval'
 *
 * const C = pitchFromString('C') as Pitch
 * const A = pitchFromString('A') as Pitch
 *
 * const T = intervalFromString('M2') as Interval; // tone
 * const s = intervalFromString('m2') as Interval; // semitone
 * const Ts = intervalFromString('A2') as Interval; // tone + semitone
 *
 * const MajorScale = ScaleSchema('Major', {intervals: [T, T, s, T, T, T, s]}) // => MajorScale的构造函数
 * const HarmonicMinor = ScaleSchema('HarmonicMinor', {intervals: [T, s, T, T, s, Ts, s]}) //=> 和声小调的构造函数
 *
 * const C_MajorScale = MajorScale(C) // C 大调音阶
 * C_MajorScale.toString() // 'C,D,E,F,G,A,B,C1'
 * const a_HarmonicMinor = HarmonicMinor(A) // a 和声小调音阶
 * a_HarmonicMinor.toString() // 'A,B,C,D,E,F,G,A1'
 *
 * ```
 *
 * @param {string} scaleName 音阶名称
 * @param {SchemaOptions} [options={}] 选项，配置音程间距等
 * @returns {ScaleCreator} 返回音阶创建函数
 */
export declare function ScaleSchema(scaleName: string, options?: SchemaOptions): ScaleCreator;
/**
 * Ionian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Ionian(C, Direction.ASCENDING) // C Ionian 音阶
 *
 * ```
 */
export declare const Ionian: ScaleCreator;
/**
 * Dorian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Dorian(C, Direction.ASCENDING) // C Dorian 音阶
 *
 * ```
 */
export declare const Dorian: ScaleCreator;
/**
 * Phrygian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Phrygian(C, Direction.ASCENDING) // C Phrygian 音阶
 *
 * ```
 */
export declare const Phrygian: ScaleCreator;
/**
 * Lydian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Lydian(C, Direction.ASCENDING) // C Lydian 音阶
 *
 * ```
 */
export declare const Lydian: ScaleCreator;
/**
 * Mixolydian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Mixolydian(C, Direction.ASCENDING) // C Mixolydian 音阶
 *
 * ```
 */
export declare const Mixolydian: ScaleCreator;
/**
 * Aeolian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Aeolian(C, Direction.ASCENDING) // C Aeolian 音阶
 *
 * ```
 */
export declare const Aeolian: ScaleCreator;
/**
 * Locrian 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Locrian(C, Direction.ASCENDING) // C Locrian 音阶
 *
 * ```
 */
export declare const Locrian: ScaleCreator;
/**
 * Major 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * Major(C, Direction.ASCENDING) // C Major 音阶
 *
 * ```
 */
export declare const Major: ScaleCreator;
/**
 * NaturalMinor 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * NaturalMinor(C, Direction.ASCENDING) // C NaturalMinor 音阶
 *
 * ```
 */
export declare const NaturalMinor: ScaleCreator;
/**
 * HarmonicMinor 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * HarmonicMinor(C, Direction.ASCENDING) // C HarmonicMinor 音阶
 *
 * ```
 */
export declare const HarmonicMinor: ScaleCreator;
/**
 * MelodicMinor (旋律小调) 音阶生成函数
 *
 * @example
 * ```js
 *
 * import { fromString } from '../pitch'
 * const C = fromString('C')
 * MelodicMinor(C, Direction.ASCENDING) // C MelodicMinor 音阶
 *
 * ```
 */
export declare const MelodicMinor: ScaleCreator;
