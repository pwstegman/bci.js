var bci = require('../index.js');
var math = require('mathjs');

// Generate random data matrices
// Equivalent to 60 seconds of data on a 250 Hz 8 channel device 
// TODO: Save data and use same data across devices
var A = math.random([250 * 60, 8]);
var B = math.random([250 * 60, 8]);

// Time common spatial pattern
console.time('CSP');
var cspParams = bci.math.cspLearn(A, B);
var Ap = bci.math.cspProject(cspParams, A);
var Bp = bci.math.cspProject(cspParams, B);
console.timeEnd('CSP');

// Generate random data to be used with LDA
// Equivalent to 60 seconds of data on a 250 Hz 8 channel device, with window sizes of half a second
// Note: Initialization of function requires time as well
var C = math.random([60 * 2, 8]);
var D = math.random([60 * 2, 8]);

console.time('LDA');
var ldaParams = bci.math.ldaLearn(C, D);
var Cp = bci.math.ldaProject(ldaParams, C);
var Dp = bci.math.ldaProject(ldaParams, D);
console.timeEnd('LDA');