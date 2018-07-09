/**
 * # Quality (Interval) 音程性质
 */
/** 1、4、5、8 度性质前缀 */
export declare type PerfectQualityPrefix = 'dddd' | 'ddd' | 'dd' | 'd' | 'P' | 'A' | 'AA' | 'AAA' | 'AAAA';
/** 2、3、6、7 度性质前缀 */
export declare type ImperfectQualityPrefix = 'dddd' | 'ddd' | 'dd' | 'd' | 'm' | 'M' | 'A' | 'AA' | 'AAA' | 'AAAA';
/** 性质前缀 */
export declare type QualityPrefix = PerfectQualityPrefix | ImperfectQualityPrefix;
/** 1、4、5、8 度性质名称 */
export declare type PerfectQualityNiceName = 'quadruply diminished' | 'triply diminished' | 'doubly diminished' | 'diminished' | 'perfect' | 'augmented' | 'doubly augmented' | 'triply augmented' | 'quadruply augmented';
/** 2、3、6、7 度性质名称 */
export declare type ImperfectQuailtyNiceName = 'quadruply diminished' | 'triply diminished' | 'doubly diminished' | 'diminished' | 'minor' | 'major' | 'augmented' | 'doubly augmented' | 'triply augmented' | 'quadruply augmented';
/** 性质名称 */
export declare type QualityNiceName = PerfectQualityNiceName | ImperfectQuailtyNiceName;
/** 1、4、5、8 性质前缀、名称 */
export declare type PerfectQualityName = PerfectQualityPrefix | PerfectQualityNiceName;
/** 2、3、6、7 性质前缀、名称 */
export declare type ImperfectQualityName = ImperfectQualityPrefix | ImperfectQuailtyNiceName;
/** 1458 度的 quality 对 semitone 的修正偏移数 */
export declare const enum PerfectQualityOffset {
    dddd = -4,
    ddd = -3,
    dd = -2,
    d = -1,
    P = 0,
    A = 1,
    AA = 2,
    AAA = 3,
    AAAA = 4,
}
/** 2367 度的 quality 对 semitone 的修正偏移数 */
export declare const enum ImperfectQualityOffset {
    dddd = -5,
    ddd = -4,
    dd = -3,
    d = -2,
    m = -1,
    M = 0,
    A = 1,
    AA = 2,
    AAA = 3,
    AAAA = 4,
}
export declare type Name = QualityPrefix | QualityNiceName;
export declare type Offset = PerfectQualityOffset | ImperfectQualityOffset;
export declare type Quality = Name | Offset;
/**
 * 检查输入是否有效的 quality 前缀 OR 完整名称 OR offset 值
 *
 * @export
 * @param {*} quality
 * @param {boolean} [is1458=false]
 * @returns {quality is Quality}
 */
export declare function isQuality(quality: any, is1458?: boolean): quality is Quality;
/**
 * 获取转位后的 quality，即 M => m, major => minor, ...
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {Quality}
 */
export declare function invert(quality: Quality, is1458?: boolean): Quality;
/**
 * 获取 quality 的 semitone 偏移
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {Offset}
 */
export declare function offset(quality: Quality, is1458?: boolean): Offset;
/**
 * 获取 quality 的缩写前缀
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {QualityPrefix}
 */
export declare function prefix(quality: Quality, is1458?: boolean): QualityPrefix;
/**
 * 获取 quality 的 nice name
 *
 * @export
 * @param {Quality} quality
 * @param {boolean} [is1458=false]
 * @returns {NiceName}
 */
export declare function niceName(quality: Quality, is1458?: boolean): QualityNiceName;
/**
 * 从字符串中提取有效的 quality name
 *
 * @export
 * @param {string} input
 * @param {boolean} is1458
 * @returns {(Quality | undefined)}
 */
export declare function fromString(input: string, is1458: boolean): Quality | undefined;
