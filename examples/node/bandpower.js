const bci = require('../index.js'); // bcijs

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
