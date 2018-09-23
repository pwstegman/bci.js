var psd = require('./psd.js');
var psdBandPower = require('./psdBandPower.js');
var nextpow2 = require('./nextpow2.js');

/**
 * Compute the average power across a given frequency band in a signal.
 * @memberof module:bcijs
 * @param {number[]} signal - The signal.
 * @param {number} sampleRate - The sample rate of the signal.
 * @param {(number[]|string)} - The frequency band provided as an array [frequencyStart, frequencyStop] or a
 * string <code>delta</code> (1-3 Hz), <code>theta</code> (4-7 Hz), <code>alpha</code> (8-12 Hz), <code>beta</code> (13-30 Hz), or <code>gamma</code> (31-50 Hz).
 * While string representations
 * allow for easier prototyping, the use of a specific band passed as an array is recommended, as band string representations may change in
 * future updates.
 * @param {number} [fftSize=Math.pow(2, bci.nextpow2(signal.length))] - Size of the fourier transform used to compute the PSD.
 * @returns {number} The average power in the frequency band.
 */
function signalBandPower(signal, sampleRate, band, fftSize = null) {
	if(fftSize === null){
		fftSize = Math.pow(2, nextpow2(signal.length));
	}

	var p = psd(signal, {fftSize: fftSize});
	return psdBandPower(p, sampleRate, band, fftSize);
}

module.exports = signalBandPower;