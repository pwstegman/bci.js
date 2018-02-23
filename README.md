# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

## Dev

This is the dev branch of webbci. Documentation may be lacking and the API can change at any time.

## Installation

```bash
npm install webbci@dev
```

## Getting Started

```javascript
var bci = require('webbci');

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

var signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);

// Compute average power in each frequency band
var length = sampleRate * duration;
console.log(bci.signalBandPower(signal, length, sampleRate, 'delta')); // 85
console.log(bci.signalBandPower(signal, length, sampleRate, 'theta')); // 128
console.log(bci.signalBandPower(signal, length, sampleRate, 'alpha')); // 205
console.log(bci.signalBandPower(signal, length, sampleRate, 'beta'));  // 114
```

## Examples

More examples can be found in the [examples](examples/) directory

## Documentation

For documentation check out [api.md](api.md)
