<p><img src="static/bcijs-logo.png" height="68px"></p>

[![npm](https://img.shields.io/npm/v/bcijs.svg)](https://www.npmjs.com/package/bcijs)
[![npm](https://img.shields.io/npm/dm/bcijs.svg)](https://www.npmjs.com/package/bcijs)
[![NpmLicense](https://img.shields.io/npm/l/bcijs.svg)](https://github.com/pwstegman/bcijs/blob/master/LICENSE)

BCI.js is a library for EEG-based brain computer interface (BCI) design with JavaScript and Node.js. It allows for the creation of BCI enabled web apps or Node.js applications, containing methods for signal processing and machine learning, such as LDA, CSP, ICA, and PSD, methods for data manipulation, such as MATLAB style array subscripting, data windowing, and CSV file support, and methods for networking, including data collection and streaming via OSC.

BCI.js is being developed out of the Human Technology Interaction Lab at the University of Alabama Department of Computer Science.

## Getting Started

Node.js

```bash
npm install bcijs
```

Browser

```html
<script src="https://cdn.jsdelivr.net/npm/bcijs@1.5.1/dist/bci.min.js"></script>
```

## Examples

### Signal Processing

```javascript
const bci = require('bcijs');

// Generate 1 second of sample data
let sampleRate = 512;
let duration = 1;
let amplitudes = [1, 2, 4, 8];
let frequencies = [
	1, // 1 Hz, delta range
	5, // 5 Hz, theta range
	8, // 8 Hz, alpha range
	17 // 17 Hz, beta range
];

let signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);

// Compute average power in each frequency band
let fftSize = sampleRate * duration;
console.log(bci.signalBandPower(signal, sampleRate, 'delta', fftSize)); // 85
console.log(bci.signalBandPower(signal, sampleRate, 'theta', fftSize)); // 128
console.log(bci.signalBandPower(signal, sampleRate, 'alpha', fftSize)); // 205
console.log(bci.signalBandPower(signal, sampleRate, 'beta', fftSize));  // 114
```

### Machine Learning

Check out [https://bci.js.org/examples/lda](https://bci.js.org/examples/lda) for a visual demo of how LDA works

```javascript
const bci = require('bcijs');

// Training set
let class1 = [
	[0, 0],
	[1, 2],
	[2, 2],
	[1.5, 0.5]
];
let class2 = [
	[8, 8],
	[9, 10],
	[7, 8],
	[9, 9]
];

// Testing set
let unknownPoints = [
	[-1, 0],
	[1.5, 2],
	[3, 3],
	[5, 5],
	[7, 9],
	[10, 12]
];

// Learn an LDA classifier
let ldaParams = bci.ldaLearn(class1, class2);

// Test classifier
let predictions = unknownPoints.map(point => {
	return Math.sign(bci.ldaProject(ldaParams, point))
});

console.log(predictions); // [ -1, -1, -1, 1, 1, 1 ]
```

### Data Manipulation and Feature Extraction

```javascript
const bci = require('bcijs');

// Some random numbers
let data = [3, 2, 3, 0, 4, 0, 0, 5, 4, 0];

// Partition into training and testing sets
let [training, testing] = bci.partition(data, 0.6, 0.4);

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
let features = bci.windowApply(data, bci.features.logvar, 3, 2);
console.log(features); // [-1.099, 1.466, 1.674, 1.946]

// Colon notation for array subscripting
let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
let subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3
console.log(subarr);
/*
[[2, 3],
 [8, 9]]
*/
```

## Usage in the web

BCI.js can be loaded from the jsDelivr CDN with

```html
<script src="https://cdn.jsdelivr.net/npm/bcijs@1.5.1/dist/bci.min.js"></script>
```

You can also find `bci.js` and `bci.min.js` in the [/dist](https://github.com/pwstegman/bcijs/tree/master/dist) directory.

BCI.js methods are accessible via the global object `bci`.

If building a web distributable using a tool such as browserify or webpack, require `bcijs/browser.js` to load only methods that are browser compatible. Node.js specific methods such as networking and file system methods will not be included.

```javascript
const bci = require('bcijs/browser.js');
```

## Requiring specific methods

You can require specific methods as well. For example, if you only need fastICA, you can use

```javascript
const fastICA = require('bcijs/lib/math/fastICA.js');
```

BCI.js methods can be found in the [lib/](https://github.com/pwstegman/bcijs/tree/master/lib) directory.

## Documentation

Documentation can be found at [https://bci.js.org](https://bci.js.org) or by viewing [docs/api.md](https://github.com/pwstegman/bcijs/blob/master/docs/api.md)

## Examples

More examples can be found in the [examples](https://github.com/pwstegman/bcijs/tree/master/examples) directory

## Building

See [dev.md](dev.md) for info on how to modify and build bci.js

## Reference

If you use bci.js in a published work, please reference this paper

P. Stegman, C. Crawford, and J. Gray, "WebBCI: An Electroencephalography Toolkit Built on Modern Web Technologies," in Augmented Cognition: Intelligent Technologies, 2018, pp. 212–221.
