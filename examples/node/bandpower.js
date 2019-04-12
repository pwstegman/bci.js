const bci = require('../../index.js'); // bcijs

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
