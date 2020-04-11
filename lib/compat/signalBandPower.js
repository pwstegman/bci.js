const psd = require('./psd.js');
const psdBandPower = require('./psdBandPower.js');
const nextpow2 = require('../math/nextpow2.js');
const transpose = require('../math/transpose.js');

/**
 * Deprecated, please use bci.bandpower() for output in proper units.
 * 
 * The functionality of this method has been replaced with the 'bandpower' method.
 * See the docs for 'bandpower' for more information.
 * 
 * Computes the average magnitude across each frequency band.
 * 
 * @deprecated Deprecated since version 1.7.0, will be removed in version 2.0.0
 * 
 * @memberof module:bcijs
 * @param {number[]|number[][]} samples - The signal (array of numbers) or a matrix of signals, where rows are samples and columns are signals.
 * @param {number} sampleRate - The sample rate of the signal.
 * @param {(Array|string)} bands - The frequency band or array of bands, where a single band is provided as an array [frequencyStart, frequencyStop] or a string <code>delta</code> (1-3 Hz), <code>theta</code> (4-7 Hz), <code>alpha</code> (8-12 Hz), <code>beta</code> (13-30 Hz), or <code>gamma</code> (31-50 Hz).<br>
 * While string representations allow for easier prototyping, the use of a specific band passed as an array is
 * recommended, as band string representations may change in future updates.
 * @param {Object} [options]
 * @param {number} [options.fftSize=Math.pow(2, bci.nextpow2(signal.length))] - Size of the fft to be used. Should be a power of 2.
 * @returns {number} The average power in the frequency band.
 * @example
 * // Example outputs are rounded
 * 
 * // Single signal examples
 * let sampleRate = 512;
 * let signal = bci.generateSignal([2,16], [10,20], sampleRate, 1);
 * // Get a single power in one band
 * console.log(bci.signalBandPower(signal, sampleRate, 'alpha')); // returns 102.4
 * // Specify a custom band as an array (Ex: 8 Hz - 12 Hz)
 * console.log(bci.signalBandPower(signal, sampleRate, [8, 12])); // returns 102.4
 * // Obtain multiple band powers
 * console.log(bci.signalBandPower(signal, sampleRate, ['alpha', 'beta'])); // returns [ 102.4, 227.6 ]
 * // Multiple band powers works with custom bands too
 * console.log(bci.signalBandPower(signal, sampleRate, [[8, 12], [13, 30]])); // returns [ 102.4, 227.6 ]
 * 
 * // Works with multiple signals too (example with 2 signals)
 * let signal2 = bci.generateSignal([16, 2], [10, 20], 512, 1);
 * let samples = bci.transpose([signal, signal2]);
 * console.log(bci.signalBandPower(samples, sampleRate, 'alpha'));
 * // Returns an array containing the alpha value for each signal
 * console.log(bci.signalBandPower(samples, sampleRate, ['alpha', 'beta', 'gamma']));
 * // Returns a 2d array with number_of_bands rows and number_of_signals columns
 */
function signalBandPower(samples, sampleRate, bands, options) {
	// Backwards compat for previous option to directly pass fftSize
	if(typeof options === 'number') {
		options = {fftSize: options};
	}

	// Defaults
	// TODO: Average channels option
	let {fftSize, averageChannels} = Object.assign({
		fftSize: Math.pow(2, nextpow2(samples.length)),
		averageChannels: false
	}, options);

	function getSignalPower(signal, band){
		let p = psd(signal, {fftSize: fftSize});
		return psdBandPower(p, sampleRate, band, fftSize);
	}

	// Store if bands was passed as just a string or frequency range (not an array of bands)
	let notBandArray = typeof bands === 'string' || (!Array.isArray(bands[0]) && typeof(bands[0]) !== 'string');

	// Now convert it to an array of bands so the matrix operations will work
	if(notBandArray) bands = [bands];

	// Store the resulting matrix or array of powers
	let result;

	// If samples is a matrix (multiple signals)
	if(Array.isArray(samples[0])){
		let num_signals = samples[0].length;
		let channels = transpose(samples);

		result = new Array(bands.length);

		for(let r = 0; r < bands.length; r++) {
			result[r] = new Array(num_signals);
			for(let c = 0; c < num_signals; c++) {
				result[r][c] = getSignalPower(channels[c], bands[r]);
			}
		}
	} else {
		// Else, must be single signal as row vector (1d array)
		result = new Array(bands.length);
		for(let i = 0; i < bands.length; i++) {
			result[i] = getSignalPower(samples, bands[i]);
		}
	}
	
	// If bands wasn't an array of bands, return the 1d array of results for that band
	if(notBandArray) return result[0];

	// If bands was multiple bands, return the result as a matrix
	return result;
}

module.exports = signalBandPower;
