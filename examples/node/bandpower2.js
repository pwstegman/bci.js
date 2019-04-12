const bci = require('../../index.js');

// Example outputs are rounded

// Single signal examples
let signal = bci.generateSignal([2,16], [10,20], 512, 1);
let sampleRate = 512;
// Get a single power in one band
console.log(bci.signalBandPower(signal, sampleRate, 'alpha')); // returns 102.4
// Specify a custom band as an array (Ex: 8 Hz - 12 Hz)
console.log(bci.signalBandPower(signal, sampleRate, [8, 12])); // returns 102.4
// Obtain multiple band powers
console.log(bci.signalBandPower(signal, sampleRate, ['alpha', 'beta'])); // returns [ 102.4, 227.6 ]
// Multiple band powers works with custom bands too
console.log(bci.signalBandPower(signal, sampleRate, [[8, 12], [13, 30]])); // returns [ 102.4, 227.6 ]

// Works with multiple signals too (example with 2 signals)
let signal2 = bci.generateSignal([16, 2], [10, 20], 512, 1);
let samples = bci.transpose([signal, signal2]);
// Returns an array containing the alpha value for each signal
console.log(bci.signalBandPower(samples, sampleRate, 'alpha'));
// Returns a matrix with number_of_bands rows and number_of_signals columns
console.log(bci.signalBandPower(samples, sampleRate, ['alpha', 'beta', 'gamma']));
