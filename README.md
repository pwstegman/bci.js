<p align="center"><img src="static/bcijs-logo.png" height="68px"></p>

<p align="center">
	<a href="https://www.npmjs.com/package/bcijs"><img src="https://img.shields.io/npm/v/bcijs.svg" alt="Version"></a>
	<a href="https://www.npmjs.com/package/bcijs"><img src="https://img.shields.io/npm/dm/bcijs.svg" alt="Downloads"></a>
	<a href="https://www.jsdelivr.com/package/npm/bcijs"><img src="https://data.jsdelivr.com/v1/package/npm/bcijs/badge?style=rounded" alt="CDN"></a>
	<a href="https://github.com/pwstegman/bci.js/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/bcijs.svg" alt="License"></a>
</p>

<br>

BCI.js is a library for EEG-based brain computer interface (BCI) design with JavaScript and Node.js. It allows for the creation of BCI enabled web apps or Node.js applications, with features such as:
 - Signal processing and machine learning (LDA, CSP, ICA, PSD, etc.)
 - Data manipulation (MATLAB style array subscripting, data windowing, CSV file support, etc.)
 - Networking (data collection, streaming via OSC, etc.)
 
You can view all available methods in the [docs](https://bci.js.org/docs/)

## Getting Started

Node.js

```bash
npm install bcijs
```

Browser

```html
<script src="https://cdn.jsdelivr.net/npm/bcijs@1.6.5/dist/bci.min.js"></script>
```

## Tutorials
- [EEG Motor Imagery Classification in Node.js with BCI.js](https://medium.com/@pwstegman/eeg-motor-imagery-classification-in-node-js-with-bci-js-d21f29cf165)

## Examples

More examples can be found in the [examples](https://github.com/pwstegman/bci.js/tree/master/examples) directory

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
let bandpowers = bci.signalBandPower(
	signal,
	sampleRate,
	['delta', 'theta', 'alpha', 'beta'],
	{fftSize: fftSize} // optional, defaults to next power of 2 larger than or equal to signal length
);

console.log(bandpowers);
/*
[ 85.33333333333366,
  128.00000000000122,
  204.80000000000047,
  113.77777777777825 ]
*/
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
let predictions = bci.ldaClassify(ldaParams, unknownPoints);

console.log(predictions); // [ 0, 0, 0, 1, 1, 1 ]
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
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];
let subarr = bci.subscript(arr, '1 3', '2:4'); // rows 1 and 3, columns 2 through 4
console.log(subarr);
/*
[[2, 3, 4],
 [10, 11, 12]]
*/
```

## Usage in the web

BCI.js can be loaded from the jsDelivr CDN with

```html
<script src="https://cdn.jsdelivr.net/npm/bcijs@1.6.5/dist/bci.min.js"></script>
```

You can also find `bci.js` and `bci.min.js` in the [/dist](https://github.com/pwstegman/bci.js/tree/master/dist) directory.

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

BCI.js methods can be found in the [lib/](https://github.com/pwstegman/bci.js/tree/master/lib) directory.

## Documentation

Documentation can be found at [https://bci.js.org/docs](https://bci.js.org/docs) or by viewing [api.md](https://github.com/pwstegman/bci.js/blob/master/docs/docs/api.md)

Deprecated methods can be found at [deprecated.md](https://github.com/pwstegman/bci.js/blob/master/docs/docs/deprecated.md)

## Building

See [dev.md](dev.md) for info on how to modify and build BCI.js

## Reference

BCI.js began as WebBCI, a library developed to aid in my research at the Human Technology Interaction Lab at the University of Alabama Department of Computer Science. If you use BCI.js in a published work, please reference this paper

P. Stegman, C. Crawford, and J. Gray, "WebBCI: An Electroencephalography Toolkit Built on Modern Web Technologies," in Augmented Cognition: Intelligent Technologies, 2018, pp. 212–221.

Logo uses icon from [Font Awesome](https://fontawesome.com/license/free).

## Contact

If you have a commercial use case for BCI.js and would like to discuss working together, contact me at [pwstegman@gmail.com](mailto:pwstegman@gmail.com)
