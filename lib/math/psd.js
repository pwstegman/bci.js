var fft = require('fft.js');

var fftCache = {};

/**
 * Compute the power spectral density of a given signal.
 * @memberof module:webbci
 * @param {number[]} signal - The signal.
 * @param {number} fftSize - Size of the fourier transform to be used. Should be a power of 2.
 * @returns {number[]} The PSD.
 */
function psd(signal, fftSize) {
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
	var powers = getPowers(freqs, fftSize);

	return powers;
}

function getPowers(complexArray, fftSize) {
	var magnitudes = [];
	for (var i = 0; i < fftSize; i += 2) {
		magnitudes.push(Math.sqrt(complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]));
	}
	return magnitudes;
}

module.exports = psd;