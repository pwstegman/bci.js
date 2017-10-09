var math = require('mathjs');
var sp = require('./signalProcessing.js');

// Length of sample
var size = 1024;

// Use math.js to generate example sample
var x = math.range(0, size);
var y = math.sin(x);

// Convert to arrays for regular JS functions to use
var x = x.toArray();
var y = y.toArray();

// Compute PSD
var powers = sp.getPSD(size, y);

console.log('First 10 powers')
console.log(powers.slice(0, 10));

console.log('Alpha, beta, and gamma band powers')
console.log(sp.getBandPower(size, powers, 500, 'alpha'));
console.log(sp.getBandPower(size, powers, 500, 'beta'));
console.log(sp.getBandPower(size, powers, 500, 'gamma'));
