# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

Deploying BCI applications in a more portable language such as JavaScript can be difficult as many BCI specific methods have yet to be implemented. WebBCI aims to help bridge this gap by implementing BCI specific methods, building on existing libraries such as Math.js and Numeric Javascript. It also implements MATLAB specific methods, such as colon notation for array subscripting, to make data manipulation in JavaScript easier.

WebBCI is being developed out of the Human Technology Interaction Lab at the University of Alabama Department of Computer Science

## Installation

```bash
npm install webbci
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
console.log(bci.signalBandPower(signal, sampleRate, 'delta', fftSize)); // 85
console.log(bci.signalBandPower(signal, sampleRate, 'theta', fftSize)); // 128
console.log(bci.signalBandPower(signal, sampleRate, 'alpha', fftSize)); // 205
console.log(bci.signalBandPower(signal, sampleRate, 'beta', fftSize));  // 114
```

### Machine Learning

```javascript
var bci = require('webbci');

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

// Learn an LDA classifier
var ldaParams = bci.ldaLearn(class1, class2);

// Test classifier
var predictions = unknownPoints.map(point => {
	return Math.sign(bci.ldaProject(ldaParams, point))
});

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]
```

### Data Manipulation and Feature Extraction

```javascript
var bci = require('webbci');

// Some random numbers
var data = [3, 2, 3, 0, 4, 0, 0, 5, 4, 0];

// Partition into training and testing sets
var [training, testing] = bci.partition(data, 0.6, 0.4);

console.log(training); // [3, 2, 3, 0, 4, 0]
console.log(testing); // [0, 5, 4, 0]

// Traverse the data array with windows of size 3 and a step of 2 (overlap of 1 item per window)
bci.windowApply(data, window => console.log(window), 3, 2);
/*
[ 3, 2, 3 ]
[ 3, 0, 4 ]
[ 4, 0, 0 ]
[ 0, 5, 4 ]
*/

// Find the log of the variance of these windows (feature extraction)
var features = bci.windowApply(data, bci.features.logvar, 3, 2);
console.log(features); // [-1.099, 1.466, 1.674, 1.946]

// Colon notation for array subscripting
var arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
var subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3
console.log(subarr);
/*
[[2, 3],
 [8, 9]]
*/
```

## Usage in the web

```bash
npm run dist
```

This will generate `dist/bci.js` and `dist/bci.min.js`. WebBCI methods can be accessed via the global object *bci*.

OSC methods will not work in the web.

## Documentation

Documentation can be found at [webbci.pwstegman.me](http://webbci.pwstegman.me/) or by viewing [docs/api.md](https://github.com/pwstegman/WebBCI/blob/master/docs/api.md)

## Examples

More examples can be found in the [examples](https://github.com/pwstegman/WebBCI/tree/master/examples) directory
