# d-music

## dmusic-theory

一个乐理基础库。

核心提供了以下模块：

* Pitch (音)
* Interval (音程)
* Scale (音阶)
* Chord (和弦)

各个模块包含了对各种基础数据结构的接口定义，以及对应的各种运算方法。

## 使用

```js
import theory from 'dmusic-theory'

const A4 = theory.pitch.fromString('A4')
theory.pitch.frequency(A4) // 440

const P8 = theory.interval.fromString('P8')
const A5 = theory.pitch.higherPitch(A4, P8)
theory.pitch.toString(A4) // 'A5'

const Am = theory.chord.create(A4, 'min')
theory.pitch.name(Am.root) // 'A4'
theory.pitch.name(Am.third) // 'C5'
theory.pitch.name(Am.fifth) // 'E5'
```
