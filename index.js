var math = require('mathjs');
var sp = require('./signalProcessing.js');

// Length of sample
var size = 8;

// Use math.js to generate example sample
var x = math.range(0, size);
var y = math.sin(x);

// Convert to arrays for regular JS functions to use
var x = x.toArray();
var y = y.toArray();

// Compute PSD
var powers = sp.getPSD(size, y);

console.log(powers);
