var nextpow2 = require('../math/nextpow2.js');

/**
 * The functionality of this method has been replaced with the 'bandpower' method.
 * See the docs for 'bandpower' for more information.
 * 
 * Computes the average magnitude across each frequency band given the output of the PSD method.
 * Units are that of the input signal. For example, if the input signal is measured
 * in μV, then this method returns values in μV.
 * 
 * Compute the average power across a given frequency band given the PSD.
 * 
 * @deprecated Deprecated since version 1.7.0, will be removed in version 2.0.0
 * 
 * @memberof module:bcijs
 * @param {number[]} psd - Power spectral density of the signal.
 * @param {number} sampleRate - The sample rate of the signal.
 * @param {(number[]|string)} - The frequency band provided as an array [frequencyStart, frequencyStop] or a
 * string <code>delta</code> (1-3 Hz), <code>theta</code> (4-7 Hz), <code>alpha</code> (8-12 Hz), <code>beta</code> (13-30 Hz), or <code>gamma</code> (31-50 Hz).
 * While string representations
 * allow for easier prototyping, the use of a specific band passed as an array is recommended, as band string representations may change in
 * future updates.
 * @param {number} [fftSize=Math.pow(2, bci.nextpow2(psd.length))] - Size of the fourier transform used to compute the PSD.
 * @returns {number} The average power in the frequency band.
 */
function psdBandPower(psd, sampleRate, band, fftSize=null) {
	if(fftSize === null){
		fftSize = Math.pow(2, nextpow2(psd.length));
	}

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

	var startIndex = Math.floor(band[0] / sampleRate * fftSize);
	var endIndex = Math.min(Math.ceil(band[1] / sampleRate * fftSize), psd.length - 1);

	var power = 0;
	for (var i = startIndex; i < endIndex + 1; i++) {
		power += psd[i];
	}
	return power / (endIndex - startIndex + 1);
}

module.exports = psdBandPower;