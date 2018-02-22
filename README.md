# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

## Installation

```bash
npm install webbci
```

If you want to use the latest development release

```bash
npm install webbci@dev
```

There isn't much documentation available for the development release right now, but there is in-code documentation on the dev branch: https://github.com/pwstegman/WebBCI/tree/dev

## Getting Started

```javascript
var wbci = require('webbci');
var ws = wbci.signal;

// Generate 1 second of sample data
var sampleRate = 512;
var duration = 1;
var amplitudes = [1, 2, 4, 8];
var frequencies = [
	1, // 1 Hz, delta range
	5, // 5 Hz, theta range
	8, // 8 Hz, alpha range
	17 // 17 Hz, beta range
];

var signal = ws.generate(amplitudes, frequencies, sampleRate, duration);

// Get frequency powers in signal
var length = sampleRate * duration;
var psd = ws.getPSD(length, signal);

// Compute average power in each frequency band
console.log(ws.getBandPower(length, psd, sampleRate, 'delta')); // 85
console.log(ws.getBandPower(length, psd, sampleRate, 'theta')); // 128
console.log(ws.getBandPower(length, psd, sampleRate, 'alpha')); // 205
console.log(ws.getBandPower(length, psd, sampleRate, 'beta')); // 114
```

## Examples

More examples can be found in the [examples](examples/) directory

## Documentation

Documentation can be found at [http://pwstegman.me/WebBCI/](http://pwstegman.me/WebBCI/)
