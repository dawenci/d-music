import { StepName, Accidental, pitch as $pitch } from 'dmusic-theory'
import theory from 'dmusic-theory'
import Interval from './interval'

export default class Pitch {
  private _stepName: StepName
  private _accidental: Accidental
  private _octave: number
  [key: string]: any
  [nkey: number]: any

  constructor(stepName: StepName, accidental: Accidental, octave: number = 0) {
    this._stepName = stepName
    this._accidental = accidental
    this._octave = octave
  }

  private get _data() {
    return { 
      stepName: this._stepName,
      accidental: this._accidental,
      octave: this._octave
    }
  }

  get stepName(): StepName {
    return this._stepName
  }

  get accidental(): Accidental {
    return this._accidental
  }

  get octave(): number {
    return this._octave
  }

  equal(pitch: Pitch): boolean {
    return $pitch.equal(this._data, pitch._data)
  }

  simpleEqual(pitch: Pitch): boolean {
    return $pitch.simpleEqual(this._data, pitch._data)
  }

  semitoneEqual(pitch: Pitch): boolean {
    return $pitch.semitoneEqual(this._data, pitch._data)
  }

  name(): string {
    return $pitch.name(this._data)
  }

  simplify(): Pitch {
    let data = $pitch.simplify(this._data)
    return new Pitch(data.stepName, data.accidental, data.octave)
  }

  higherPitch(interval: Interval): Pitch {
    let data = $pitch.higherPitch(this._data, {
      number: interval.numbers(),
      semitone: interval.semitones()
    })
    return new Pitch(data.stepName, data.accidental, data.octave)
  }

  lowerPitch(interval: Interval): Pitch {
    let data = $pitch.lowerPitch(this._data, {
      number: interval.numbers(),
      semitone: interval.semitones()
    })
    return new Pitch(data.stepName, data.accidental, data.octave)
  }

  frequency(): number {
    return $pitch.frequency(this._data)
  }

  toMidiNumber(): number {
    return $pitch.toMidiNumber(this._data)
  }

  toPianoKeyNumber(): number {
    return $pitch.toPianoKeyNumber(this._data)
  }

  enharmonicNotes(): Pitch[] {
    let semitones = $pitch.semitonesStartWithC0(this._data)
    let datas = $pitch.enharmonicNotes(semitones)
    return datas.map(data => new Pitch(data.stepName, data.accidental, data.octave))
  }

  toString(): string {
    return $pitch.toString(this._data)
  }

  static fromPianoKeyNumber(number: number): Pitch[]|undefined {
    let datas = $pitch.fromPianoKeyNumber(number)
    return datas.map(data => new Pitch(data.stepName, data.accidental, data.octave))
  }

  static fromMidiNumber(number: number): Pitch[]|undefined {
    let datas = $pitch.fromMidiNumber(number)
    return datas.map(data => new Pitch(data.stepName, data.accidental, data.octave))
  }

  static fromString(string: string): Pitch|undefined {
    let data = $pitch.fromString(string)
    if (data === undefined) return undefined
    return new Pitch(data.stepName, data.accidental, data.octave) 
  }

  static makePitch(any: any): Pitch|undefined {
    let data = $pitch.makePitch(any)
    if (data === undefined) return undefined
    return new Pitch(data.stepName, data.accidental, data.octave) 
  }

}