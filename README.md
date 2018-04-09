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

### Signal Processing

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
var fftSize = sampleRate * duration;
console.log(bci.signalBandPower(signal, fftSize, sampleRate, 'delta')); // 85
console.log(bci.signalBandPower(signal, fftSize, sampleRate, 'theta')); // 128
console.log(bci.signalBandPower(signal, fftSize, sampleRate, 'alpha')); // 205
console.log(bci.signalBandPower(signal, fftSize, sampleRate, 'beta'));  // 114
```

### Machine Learning

```javascript
var bci = require('webbci');

// Learn an LDA classifier for a 2D vector

// Training set
var class1 = [
	[0, 0],
	[1, 2],
	[2, 2],
	[1.5, 0.5]
];
var class2 = [
	[8, 8],
	[9, 10],
	[7, 8],
	[9, 9]
];

// Testing set
var unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

// Learn classifier
var ldaParams = bci.ldaLearn(class1, class2);

// Test classifier
var predictions = unknownPoints.map(point => {
	return Math.sign(bci.ldaProject(ldaParams, point))
});

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]
```

## Documentation

For a complete list of methods and documentation check out [docs/api.md](docs/api.md)

## Examples

More examples can be found in the [examples](examples/) directory
