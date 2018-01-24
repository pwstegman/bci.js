var fft = require('fft.js');

var fftCache = {};

/**
 * Compute the power spectral density of a given signal.
 * @memberof module:webbci.math
 * @param {number[]} signal - The signal.
 * @param {number} size - Size of the fourier transform to be used. Should be a power of 2.
 * @returns {number[]} The PSD.
 */
function psd(signal, size) {
	if (fftCache.hasOwnProperty(size)) {
		f = fftCache[size];
	} else {
		f = new fft(size);
		fftCache[size] = f;
	}

	var freqs = f.createComplexArray();
	f.realTransform(freqs, signal);
	var powers = getPowers(size, freqs);

	return powers;
}

module.exports = psd;