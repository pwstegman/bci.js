var fft = require('fft.js');

var fftCache = {};

/**
 * Compute the power spectral density of a given signal.
 * @memberof module:webbci
 * @param {number[]} signal - The signal.
 * @param {number} size - Size of the fourier transform to be used. Should be a power of 2.
 * @returns {number[]} The PSD.
 */
function psd(signal, size) {
	var f;
	if (fftCache.hasOwnProperty(size)) {
		f = fftCache[size];
	} else {
		f = new fft(size);
		fftCache[size] = f;
	}

	// Zero pad signal to length if needed
	if (signal.length < size) {
		signal = signal.concat(Array(size - signal.length).fill(0));
	}

	var freqs = f.createComplexArray();
	f.realTransform(freqs, signal);
	var powers = getPowers(size, freqs);

	return powers;
}

function getPowers(size, complexArray) {
	var magnitudes = [];
	for (var i = 0; i < size; i += 2) {
		magnitudes.push(Math.sqrt(complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]));
	}
	return magnitudes;
}

module.exports = psd;