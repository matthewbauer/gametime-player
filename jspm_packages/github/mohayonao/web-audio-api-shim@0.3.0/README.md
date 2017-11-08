# web-audio-api-shim
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-api-shim)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/web-audio-api-shim.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/web-audio-api-shim)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-api-shim.svg?style=flat-square)](https://david-dm.org/mohayonao/web-audio-api-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> shim for legacy Web Audio API

## Specification
- [Web Audio API - W3C Editor's Draft 22 June 2015](http://webaudio.github.io/web-audio-api/)

## Installation
npm:

```
npm install @mohayonao/web-audio-api-shim
```

You can two versions `full` or `light`.
The `light` version installs easy polyfills only.

```js
require("@mohayonao/web-audio-api-shim");

// or

require("@mohayonao/web-audio-api-shim/light");
```

downloads:

- [web-audio-api-shim.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.js)
- [web-audio-api-shim.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim.min.js)
- [web-audio-api-shim-light.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim-light.js)
- [web-audio-api-shim-light.min.js](https://raw.githubusercontent.com/mohayonao/web-audio-api-shim/master/build/web-audio-api-shim-light.min.js)

## Implemented
- `AnalyserNode#getFloatTimeDomainData`
- `AudioBuffer#copyFromChannel`
- `AudioBuffer#copyToChannel`
- `AudioContext#createStereoPanner`
- `AudioContext#decodeAudioData`
- `OfflineAudioContext#startRendering`

- The below api exclude in light version
  - `AudioContext#close`
  - `AudioContext#resume`
  - `AudioContext#suspend`
  - `AudioNode#disconnect`

## Not Implemented
- `AudioContext#createAudioWorker`

## Native API Supports
|                        | Shim | Chrome  | Opera   | Firefox | Safari |
| -----------------------|:----:|:-------:|:-------:|:-------:|:------:|
| getFloatTimeDomainData | :ok: | :ok: 37 | :ok: 22 | :ok: 30 | :x: 8  |
| copyFromChannel        | :ok: | :ok: 43 | :ok: 30 | :ok: 27 | :x: 8  |
| copyToChannel          | :ok: | :ok: 43 | :ok: 30 | :ok: 27 | :x: 8  |
| createAudioWorker      | :x:  | :x:  43 | :x:  30 | :x:  38 | :x: 8  |
| createStereoPanner     | :ok: | :ok: 41 | :ok: 28 | :ok: 37 | :x: 8  |
| decodeAudioData        | :ok: | :x:  43 | :x:  30 | :ok: 36 | :x: 8  |
| close                  | :ok: | :ok: 42 | :ok: 29 | :x:  38 | :x: 8  |
| suspend                | :ok: | :ok: 41 | :ok: 28 | :x:  38 | :x: 8  |
| resume                 | :ok: | :ok: 41 | :ok: 28 | :x:  38 | :x: 8  |
| startRendering         | :ok: | :ok: 42 | :ok: 29 | :ok: 37 | :x: 8  |
| disconnect             | :ok: | :ok: 43 | :ok: 30 | :x:  38 | :x: 8  |

## Online test suites
- [test - web-audio-api-shim](http://mohayonao.github.io/web-audio-api-shim/test/)
- [check implementations for this browser](http://mohayonao.github.io/web-audio-api-shim/test/impl.html)

## License
- MIT
