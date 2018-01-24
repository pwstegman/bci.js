/**
 * Compute the average power across a given frequency band given the PSD.
 * @memberof module:webbci.math
 * @param {number[]} psd - Power spectral density of the signal.
 * @param {number} length - Size of the fourier transform used to compute the PSD.
 * @param {number} sampleRate - The sample rate of the signal.
 * @param {(number[]|string)} - The frequency band provided as an array [frequencyStart, frequencyStop] or a
 * string <code>delta</code> (1-3 Hz), <code>theta</code> (4-7 Hz), <code>alpha</code> (8-12 Hz), <code>beta</code> (13-30 Hz), or <code>gamma</code> (31-50 Hz).
 * While string representations
 * allow for easier prototyping, the use of a specific band passed as an array is recommended, as band string representations may change in
 * future updates.
 * @returns {number} The average power in the frequency band.
 */
function psdBandPower(psd, length, sampleRate, band) {
	var bands = {
		// From Dan Szafir's "Pay Attention!", 2012
		'delta': [1, 3],
		'theta': [4, 7],
		'alpha': [8, 12],
		'beta': [13, 30],
		'gamma': [31, 50]
	};

	if (typeof band === 'string' || band instanceof String) {
		band = bands[band];
	}

	var startIndex = Math.ceil(band[0] / sampleRate * size);
	var endIndex = Math.floor(band[1] / sampleRate * size);
	var power = 0;
	for (var i = startIndex; i < endIndex + 1; i++) {
		power += psd[i];
	}
	return power / (endIndex - startIndex + 1);
}

module.exports = psdBandPower;