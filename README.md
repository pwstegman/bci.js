# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

## Installation

```bash
npm install webbci
```

## Getting Started

```javascript
var wbci = require('webbci');

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

var ws = wbci.signal;

var signal = ws.generate(amplitudes, frequencies, sampleRate, duration);

// Get frequency powers in signal
var length = sampleRate * duration;
var psd = ws.getPSD(length, signal);

// Compute average power in each frequency band
console.log(ws.getBandPower(length, psd, sampleRate, 'delta')); // 64
console.log(ws.getBandPower(length, psd, sampleRate, 'theta')); // 128
console.log(ws.getBandPower(length, psd, sampleRate, 'alpha')); // 204
console.log(ws.getBandPower(length, psd, sampleRate, 'beta')); // 512
```

##Current Methods

webbci.signal

- getPSD(fftSize, signal)
   - Given a time series signal, return the power in each frequency band computed using an FFT
 - getBandPower(fftSize, psd, sampleRate, band)
   - band can be an array [frequencyStart, frequencyStop] or a string 'delta', 'theta', 'alpha', 'mu', 'smr', 'lowbeta', 'beta', 'highbeta', 'gamma'
   - Computes the average power across the frequency band in the given power spectral density (psd) array
   - Examples: getBandPower(1024, psd, 512, 'alpha')(); getBandPower(1024, psd, 512, [7.5, 12.5]);
 - eegw = new EEGWindow(size, numChannels, callback)
   - add data to an eeg data window using eegw.addData(dataSample). When number of dataSamples = size, callback is called with array of dataSamples and the window is reset
   - can reset / clear data in window early by calling eegw.clear()
 - generateSignal(amplitudes, frequencies, sampleRate, duration)
   - return summation of `amplitude*sin(2*pi*frequency*t)` for the given amplitudes and frequencies over a duration (in seconds) given a sample rate (in Hz)

webbci.network

- addEEGListener(oscAddress, oscPort, eegAddress, callback)
   - listens for EEG data at oscAddress:oscPort with OSC Address Pattern eegAddress
   - callback is called with the eeg data each time a sample is received


- webbci.lda = new LDA(class1, class2)
   - Computes LDA given data from class 1 and data from class 2
   - lda.project(sample)
     - Value less than 0 if predicted to be in class 1, 0 if exactly in between, and greater than 0 if class 2

 - webbci.csp = new CSP(class1, class2)
   - Computes common spatial pattern. Projects data so one class has high variance in one axis and the other class has high variance in the other axis.
   - csp.project(data, [dimensions])
     - Accepts data points to be projected. Rows should be samples, columns should be signals.
	 - Dimensions can range from 1 to number of signals. Defaults to number of signals.
     - Returns projected data. Rows are samples, columns are dimensions sorted by descending importance.

## Future method ideas
 - Store computed features (such as power in alpha or beta bands)
 - Average results over time
 - Visualize results
   - Bar graph of band powers (alpha, beta, etc.)
   - Time series EEG data display
   - Frequency domain plot
