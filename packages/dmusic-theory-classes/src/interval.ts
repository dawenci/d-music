import { Quality, interval as $interval } from 'dmusic-theory'
import theory from 'dmusic-theory'

export default class Interval {
  private _number: number
  private _semitone: number
  private _quality: Quality
  [key: string]: any
  [nkey: number]: any

  constructor(number: number, quality: Quality | number) {
    this._number = number
    if (typeof quality === 'number') this._semitone = quality
    else this._quality = this.quality
  }

  private get _data() {
    return { number: this._number, quality: this._quality, semitone: this._semitone }
  }

  get number(): number {
    return this._number
  }
  numbers() { return this.number }

  get semitone(): number {
    return $interval.semitones(this._data)
  }
  semitones() { return this.semitone}

  get quality(): Quality {
    return $interval.quality(this._data)
  }

  equal(interval: Interval): boolean {
    return $interval.equal(this._data, interval._data)
  }

  simpleEqual(interval: Interval): boolean {
    return $interval.simpleEqual(this._data, interval._data)
  }

  semitoneEqual(interval: Interval): boolean {
    return $interval.semitoneEqual(this._data, interval._data)
  }

  increaseOctave(): Interval {
    let data = $interval.increaseOctave(this._data)
    return new Interval(data.number, data.semitone || data.quality)
  }
  
  decreaseOctave(): Interval {
    let data = $interval.decreaseOctave(this._data)
    return new Interval(data.number, data.semitone || data.quality)
  }

  simplify(): Interval {
    let data = $interval.simplify(this._data)
    return new Interval(data.number, data.semitone || data.quality)
  }

  invert(): Interval {
    let data = $interval.invert(this._data)
    return new Interval(data.number, data.semitone || data.quality)
  }

  join(interval: Interval): Interval {
    let data = $interval.join(this._data, interval._data)
    return new Interval(data.number, data.semitone || data.quality)
  }

  merge(...interval: Interval[]): Interval {
    let intervals = interval.map(i => i._data)
    intervals.unshift(this._data)
    let data = $interval.merge(...intervals)
    return new Interval(data.number, data.semitone || data.quality)
  }

  split(interval: Interval): Interval {
    let data = $interval.split(this._data, interval._data)
    return new Interval(data.number, data.semitone || data.quality)
  }

  separate(...interval: Interval[]): Interval {
    let intervals = interval.map(i => i._data)
    intervals.unshift(this._data)
    let data = $interval.separate(...intervals)
    return new Interval(data.number, data.semitone || data.quality)
  }

  cents(): number {
    return $interval.cents(this._data)
  }

  frequencyRatio(): number {
    return $interval.frequencyRatio(this._data)
  }

  toString(): string {
    return $interval.toString(this._data)
  }

  toNiceString(): string {
    return $interval.toNiceString(this._data)
  }

  static fromString(string: string): Interval|undefined {
    let data = $interval.fromString(string)
    if (data === undefined) return undefined
    return new Interval(data.number, data.semitone || data.quality)
  }

  static makeInterval(any: any): Interval|undefined {
    let data = $interval.makeInterval(any)
    if (data === undefined) return undefined
    return new Interval(data.number, data.semitone || data.quality)
  }
}
