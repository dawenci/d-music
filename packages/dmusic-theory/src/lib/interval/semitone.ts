/**
 * # Semitone 半音数
 */

/** 半音数量复合形式 */
export interface CompoundSemitone {
  octave: number
  semitone: number
}

/**
 * 是否合法的 semitone 数量（大于等于 0 的整数）
 *
 * @export
 * @param {*} input
 * @returns {boolean}
 */
export function isSemitone(input: any): input is number {
  let check = input | 0
  return input === check && input >= 0
}

/**
 * 获取 semitone 横跨的 octaves
 *
 * @export
 * @param {number} semitone
 * @returns {number}
 */
export function octave(semitone: number): number {
  return Math.floor(semitone / 12)
}

/**
 * 将半音数 semitone 折叠为 {octave, semitone} 的复合形式
 *
 * @export
 * @param {number} semitone
 * @returns {CompoundSemitone}
 */
export function compound(semitone: number): CompoundSemitone {
  let compound = {
    octave: octave(semitone),
    semitone: semitone % 12,
  }
  return compound
}

/**
 * 将半音数 semitone 的 {octave, semitone} 复合形式压平展开成 semitone
 *
 * @export
 * @param {CompoundSemitone} compound
 * @returns {number}
 */
export function simplify(compound: CompoundSemitone): number {
  return compound.octave * 12 + compound.semitone
}
