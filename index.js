var fft = require('fft.js');
var math = require('mathjs');

// Length of sample
var size = 512;

// Use math.js to generate example sample
var x = math.range(0, size);
var y = math.sin(x);

// Convert to arrays for regular JS functions to use
var x = x.toArray();
var y = y.toArray();

// Compute frequencies
var f = new fft(size);
var freqs = f.createComplexArray();
f.realTransform(freqs, y);
replaceWithSquaredPowers(freqs, size / 2);
freqs = freqs.slice(0, size / 2);

console.log(freqs);

// WebBCI Endpoints
function getBandPower(freqs, fftSize, sampleRate, band){
  // The start and end indices are rounded inwards
  // Zero pad time signal before fft for higher resolution
  var startIndex = Math.ceil(band[0] / sampleRate * fftSize);
  var endIndex = Math.floor(band[1] / sampleRate * fftSize);
  var power = 0;
  for(var i = startIndex; i < endIndex + 1; i++){
    power += freqs[i];
  }
  return power / (endIndex - startIndex + 1);
}

function getDelta(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [0.5, 4]);
}

function getTheta(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [4, 7]);
}

function getAlpha(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [7.5, 12.5]);
}

function getMu(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [7.5, 12.5]);
}

function getSMR(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [13, 15]);
}

function getLowBeta(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [12.5, 16]);
}

function getBeta(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [16.5, 20]);
}

function getHighBeta(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [20.5, 28]);
}

function getGamma(freqs, fftSize, sampleRate){
  return getBandPower(freqs, fftSize, sampleRate, [25, 100]);
}

// Helper function
function displayComplex(complexArray, precision){
  if(precision === undefined){
    precision = 5;
  }
  var p = Math.pow(10, precision);

  for(var i = 0; i < complexArray.length; i += 2){
    console.log(Math.round(complexArray[i]*p)/p + '+' + Math.round(complexArray[i+1]*p)/p + 'i');
  }
}

function replaceWithSquaredPowers(complexArray, size){
  for(var i = 0; i < size * 2; i += 2){
    complexArray[i / 2] = Math.sqrt(
      complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]
    );
  }
}
