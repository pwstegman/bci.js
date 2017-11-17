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