const bci = require('../../index.js');

// Single signal examples
let signal = bci.generateSignal([2,16], [10,20], 512, 1);
let sampleRate = 512;

// Get a single power in one band
console.log(bci.bandpower(signal, sampleRate, 'alpha')); // returns 1.999986433981371

// Specify a custom band as an array (Ex: 8 Hz - 12 Hz)
console.log(bci.bandpower(signal, sampleRate, [8, 12])); // returns 1.999986433981371

// Obtain multiple band powers
console.log(bci.bandpower(signal, sampleRate, ['alpha', 'beta'])); // returns [ 1.999986433981371, 127.99998755590426 ]

// Multiple band powers works with custom bands too
console.log(bci.bandpower(signal, sampleRate, [[8, 12], [13, 30]])); // returns [ 1.999986433981371, 127.99998755590426 ]

// Works with multiple signals too (example with 2 signals)
let signal2 = bci.generateSignal([16, 2], [8, 16], 512, 1);
let samples = bci.transpose([signal, signal2]);
/*
samples is:
[
  [ 0, 0 ],
  [ 4.132504228850654, 1.958454889305226 ],  
  [ 8.02830814902249, 3.8868120169882316 ],  
  [ 11.46473335062227, 5.755695302110602 ],  
  [ 14.24630727049272, 7.537148480214531 ],
  etc.
*/

// Returns an array containing the alpha value for each signal
console.log(bci.bandpower(samples, sampleRate, 'alpha')); // returns [ 1.999986433981371, 106.58279550478075 ]

// Returns a matrix with number_of_bands rows and number_of_signals columns
console.log(bci.bandpower(samples, sampleRate, ['alpha', 'beta', 'gamma']));
/*
[
  [ 1.999986433981371, 106.58279550478075 ],    
  [ 127.99998755590426, 1.9999679045047338 ],   
  [ 8.446268353020626e-8, 5.465749214709865e-9 ]
]
*/
