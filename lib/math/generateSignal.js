const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/type/bignumber'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/matrix'));
math.import(require('mathjs/lib/function/trigonometry'));

/**
 * Generate a signal with the given frequencies and their amplitudes.
 * @memberof module:bcijs
 * @param {number[]} amplitudes - The amplitudes of each frequency.
 * @param {number[]} frequencies - The frequencies.
 * @param {number} sampleRate - Sample rate of the signal in Hz.
 * @param {number} duration - Duration of the signal in seconds.
 * @returns {number[]} The generated signal.
 */
function generateSignal(amplitudes, frequencies, sampleRate, duration) {
	var x = math.range(0, duration, 1 / sampleRate);

	var signal = math.zeros(x.size()[0]);
	for (var i = 0; i < amplitudes.length; i++) {
		signal = math.add(signal, math.multiply(amplitudes[i], math.sin(math.multiply(2 * Math.PI * frequencies[i], x))));
	}

	return signal.toArray();
}

module.exports = generateSignal;