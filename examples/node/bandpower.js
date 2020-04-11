const bci = require('../../index.js'); // bcijs

// Generate 1 second of sample data
let sampleRate = 512;
let duration = 1;
let amplitudes = [8, 4, 2, 1];
let frequencies = [
	1, // 1 Hz, delta range
	5, // 5 Hz, theta range
	8, // 8 Hz, alpha range
	17 // 17 Hz, beta range
];

let signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);

// Compute relative power in each frequency band
let bandpowers = bci.bandpower(
	signal,
	sampleRate,
	['delta', 'theta', 'alpha', 'beta'],
	{relative: true}
);

console.log(bandpowers);
/*
[
  0.7171876695851037, 
  0.22444067394892755,
  0.04489131763080717,
  0.013469490282877555
]
*/