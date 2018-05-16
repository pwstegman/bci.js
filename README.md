# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

WebBCI is being developed out of the Human Technology Interaction Lab at the University of Alabama Department of Computer Science

## Installation

For the latest stable release

```bash
npm install webbci
```

For the latest unstable development release

```bash
npm install webbci@dev
```

Documentation for the development release can be found at https://github.com/pwstegman/WebBCI/tree/dev

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
