var fft = require('fft.js');

var fftCache = {};

exports.getPSD = function(size, signal){
  /* Cache fft object. In quick tests, the time to create a new FFT object
  was 0.451ms and the time to check and then load from cache was 0.008ms. */
  if(fftCache.hasOwnProperty(size)){
    f = fftCache[size];
  }else{
    f = new fft(size);
    fftCache[size] = f;
  }

  var freqs = f.createComplexArray();
  f.realTransform(freqs, signal);
  var powers = getPowers(size, freqs);

  return powers;
}

function getPowers(size, complexArray){
  /* Return an array containing the magnitude of the first half of complex numbers
  in the complex Array */
  var magnitudes = [];
  for(var i = 0; i < size; i += 2){
    magnitudes.push(Math.sqrt(complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]));
  }
  return magnitudes;
}

var bands = {
  'delta': [0.5, 4],
  'theta': [4, 7],
  'alpha': [7.5, 12.5],
  'mu': [7.5, 12.5],
  'smr': [13, 15],
  'lowbeta': [12.5, 16],
  'beta': [16.5, 20],
  'highbeta': [20.5, 28],
  'gamma': [25, 100]
};

exports.getBandPower = function(size, psd, sampleRate, band){
  /* Given the PSD of a signal, return the average power in a given band */

  // Allow selecting of a band by name
  if(typeof band === 'string' || band instanceof String){
    band = bands[band];
  }

  var startIndex = Math.ceil(band[0] / sampleRate * size);
  var endIndex = Math.floor(band[1] / sampleRate * size);
  var power = 0;
  for(var i = startIndex; i < endIndex + 1; i++){
    power += psd[i];
  }
  return power / (endIndex - startIndex + 1);
}

exports.displayComplex = function(complexArray, precision){
  if(precision === undefined){
    precision = 5;
  }
  var p = Math.pow(10, precision);

  for(var i = 0; i < complexArray.length; i += 2){
    console.log(Math.round(complexArray[i]*p)/p + '+' + Math.round(complexArray[i+1]*p)/p + 'i');
  }
}
