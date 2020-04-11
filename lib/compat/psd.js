var fft = require('fft.js');
var nextpow2 = require('../math/nextpow2.js');

var fftCache = {};

/**
 * The functionality of this method has been replaced with the 'periodogram' method.
 * See the docs for 'periodogram' for more information.
 * 
 * Computes the magnitude of each frequency bin of the FFT. Units are that of the input signal.
 * For example, if the input signal is measured in μV, then this method returns values in μV.
 * 
 * As a PSD (particularly for EEG data) would be expected to return units of μV^2/Hz, this method has
 * been deprecated to avoid confusion. It has been replaced with the periodogram method, which returns units
 * of μV^2/Hz.
 * 
 * @deprecated
 * Deprecated since version 1.7.0, will be removed in version 2.0.0
 * 
 * @memberof module:bcijs
 * @param {number[]} signal - The signal.
 * @param {Object} [options]
 * @param {number} [options.fftSize=Math.pow(2, bci.nextpow2(signal.length))] - Size of the fft to be used. Should be a power of 2.
 * @param {boolean} [options.truncate=false] - If true, only the first half of the PSD array is returned
 * @returns {number[]} magnitude of each frequency bin of the FFT
 */
function psd(signal, options) {
	var {fftSize, truncate} = Object.assign({
		fftSize: Math.pow(2, nextpow2(signal.length)),
		truncate: false
	}, options);

	var f;
	if (fftCache.hasOwnProperty(fftSize)) {
		f = fftCache[fftSize];
	} else {
		f = new fft(fftSize);
		fftCache[fftSize] = f;
	}

	// Zero pad signal to length if needed
	if (signal.length < fftSize) {
		signal = signal.concat(Array(fftSize - signal.length).fill(0));
	}

	var freqs = f.createComplexArray();
	f.realTransform(freqs, signal);
	f.completeSpectrum(freqs);
	if(truncate){
		var powers = getPowers(freqs, freqs.length / 2);
	}else{
		var powers = getPowers(freqs, freqs.length);
	}

	return powers;
}

function getPowers(complexArray, length) {
	var magnitudes = [];
	for (var i = 0; i < length - 1; i += 2) {
		magnitudes.push(Math.sqrt(complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]));
	}
	return magnitudes;
}

module.exports = psd;