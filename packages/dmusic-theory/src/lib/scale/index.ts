/**
 * # Scale 音阶
 */

import { Pitch, name as pitchName, lowerPitch, higherPitch } from '../pitch'
import { Interval, fromString as intervalFromString } from '../interval'

const _arrProto = Array.prototype
const _arrMap = _arrProto.map

/** 音阶接口 */
export interface Scale {
  /** 音阶名字 */
  readonly name: string

  /** 音阶内部音程间隔 */
  readonly ascendingIntervals: Interval[]

  readonly descendingIntervals: Interval[]

  /** 音级数量 */
  readonly length: number

  /** 上下行方向 */
  direction: Direction

  /** 获得音阶生成函数的引用 */
  creator(): ScaleCreator

  /** 获取音阶中某个音级 */
  step(stepNumber: number): Pitch | undefined

  /** 获取音阶的主音 */
  tonic(): Pitch

  /** 获取音阶的上行版本 */
  ascending(): Scale

  /** 获取音阶的下行版本 */
  descending(): Scale

  /** 获取音阶中的所有音级 */
  pitches(): Pitch[]

  /** 音阶的字符串表示 */
  toString(): string

  [index: number]: Pitch
  [key: string]: any
}

/** 音阶创建函数接口 */
export interface ScaleCreator {
  /**
   * @param {Pitch} tonic 主音
   * @param {Direction} direction 上行 OR 下行
   * @returns {Scale} 返回音阶
   */
  (tonic: Pitch, direction?: Direction): Scale

  /**
   * 获得音阶的上行版本
   * @param {Scale} scale 输入的音阶
   * @returns {Scale} 输出上行音阶
   */
  ascending(scale: Scale): Scale

  /**
   * 获得音阶的下行版本
   * @param {Scale} scale 输入的音阶
   * @returns {Scale} 输出下行音阶
   */
  descending(scale: Scale): Scale
}

/** 音阶上行、下行方向 */
export const enum Direction {
  /** 上行 */
  ASCENDING = 1,

  /** 下行 */
  DESCENDING = 0
}

export interface SchemaOptions {
  intervals?: Interval[]
  ascendingIntervals?: Interval[]
  descendingIntervals?: Interval[]
}

// 音阶的共享方法
const proto = Object.create(null)

/** 获取 scale 内部的音级 */
proto.step = function(index: number): Pitch {
  return this.direction === Direction.ASCENDING
    ? this[index - 1] // 上行，index 从小到大获取
    : this[this.length - index] // 下行，index 从大到小获取
}

/** 获取 scale 的主音 */
proto.tonic = function(): Pitch {
  return this.step(1)
}

/** 获取音级数组，按照上下行不同顺序 */
proto.pitches = function(): Pitch[] {
  let pitches = _arrMap.call(this, (pitch: Pitch) => pitch)
  return this.direction ? pitches : pitches.reverse()
}

/** 返回 scale 的上行版本 */
proto.ascending = function() {
  const creator = this.creator()
  return creator.ascending(this)
}

/** 返回 scale 的下行版本 */
proto.descending = function() {
  const creator = this.creator()
  return creator.descending(this)
}

proto.toString = function() {
  return this.pitches()
    .map((pitch: Pitch) => pitchName(pitch))
    .join()
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
export function ScaleSchema(scaleName: string, options: SchemaOptions = {}): ScaleCreator {
  const ascendingIntervals = options.ascendingIntervals || options.intervals
  const descendingIntervals = options.descendingIntervals || options.intervals
  if (!ascendingIntervals || !descendingIntervals || ascendingIntervals.length !== descendingIntervals.length) {
    throw '(SchemaOptions) intervals invalid.'
  }

  const scaleCreator: any = (tonic: Pitch, direction: Direction = Direction.ASCENDING): Scale => {
    let scale = Object.create(proto)
    scale.creator = () => scaleCreator
    scale.name = scaleName
    scale.ascendingIntervals = ascendingIntervals
    scale.descendingIntervals = descendingIntervals
    scale.length = ascendingIntervals.length + 1
    scale.direction = direction

    // 不论上下行，存储下标都是按照上行的方式，
    // 下行的反序读取在各个读取方法中实现
    let step = (scale[0] = tonic)
    let intervals = direction === Direction.ASCENDING ? ascendingIntervals : descendingIntervals
    for (let degree = 1; degree < scale.length; degree += 1) {
      let interval = intervals[degree - 1]
      step = scale[degree] = higherPitch(step, interval)
    }

    return scale as Scale
  }

  // 上行音阶创建器默认实现
  function ascending(scale: Scale): Scale {
    const tonic = scale.tonic()
    return scaleCreator(tonic, Direction.ASCENDING)
  }

  // 下行音阶创建器默认实现
  function descending(scale: Scale): Scale {
    const tonic = scale.tonic()
    return scaleCreator(tonic, Direction.DESCENDING)
  }

  scaleCreator.ascending = ascending
  scaleCreator.descending = descending
  return scaleCreator as ScaleCreator
}

const T = intervalFromString('M2') as Interval
const s = intervalFromString('m2') as Interval
const Ts = intervalFromString('A2') as Interval

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
export const Ionian = ScaleSchema('Ionian', { intervals: [T, T, s, T, T, T, s] })

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
export const Dorian = ScaleSchema('Dorian', { intervals: [T, s, T, T, T, s, T] })

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
export const Phrygian = ScaleSchema('Phrygian', { intervals: [s, T, T, T, s, T, T] })

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
export const Lydian = ScaleSchema('Lydian', { intervals: [T, T, T, s, T, T, s] })

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
export const Mixolydian = ScaleSchema('Mixolydian', { intervals: [T, T, s, T, T, s, T] })

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
export const Aeolian = ScaleSchema('Aeolian', { intervals: [T, s, T, T, s, T, T] })

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
export const Locrian = ScaleSchema('Locrian', { intervals: [s, T, T, s, T, T, T] })

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
export const Major = ScaleSchema('Major', { intervals: [T, T, s, T, T, T, s] }) // 大调

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
export const NaturalMinor = ScaleSchema('NaturalMinor', { intervals: [T, s, T, T, s, T, T] }) // 自然小调

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
export const HarmonicMinor = ScaleSchema('HarmonicMinor', { intervals: [T, s, T, T, s, Ts, s] }) // 和声小调

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
export const MelodicMinor = ScaleSchema('MelodicMinor', {
  ascendingIntervals: [T, s, T, T, T, T, s],
  descendingIntervals: [T, s, T, T, s, T, T] // VI 级、VII 级还原
})
