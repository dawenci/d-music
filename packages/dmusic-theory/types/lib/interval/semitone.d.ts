/**
 * # Semitone 半音数
 */
/** 半音数量复合形式 */
export interface CompoundSemitone {
    octave: number;
    semitone: number;
}
/**
 * 是否合法的 semitone 数量（大于等于 0 的整数）
 *
 * @export
 * @param {*} input
 * @returns {boolean}
 */
export declare function isSemitone(input: any): input is number;
/**
 * 获取 semitone 横跨的 octaves
 *
 * @export
 * @param {number} semitone
 * @returns {number}
 */
export declare function octave(semitone: number): number;
/**
 * 将半音数 semitone 折叠为 {octave, semitone} 的复合形式
 *
 * @export
 * @param {number} semitone
 * @returns {CompoundSemitone}
 */
export declare function compound(semitone: number): CompoundSemitone;
/**
 * 将半音数 semitone 的 {octave, semitone} 复合形式压平展开成 semitone
 *
 * @export
 * @param {CompoundSemitone} compound
 * @returns {number}
 */
export declare function simplify(compound: CompoundSemitone): number;
