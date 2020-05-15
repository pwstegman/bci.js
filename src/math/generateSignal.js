import { range, zeros, add, multiply, sin } from 'mathjs';

/**
 * Generate a signal with the given frequencies and their amplitudes.
 * @memberof module:bcijs
 * @function
 * @name generateSignal
 * @param {number[]} amplitudes - The amplitudes of each frequency.
 * @param {number[]} frequencies - The frequencies.
 * @param {number} sampleRate - Sample rate of the signal in Hz.
 * @param {number} duration - Duration of the signal in seconds.
 * @returns {number[]} The generated signal.
 * @example
 * let amplitudes = [4, 8];
 * let frequencies = [10, 20]; // 10 Hz (alpha), 20 Hz (beta)
 * let sampleRate = 512; // Hz
 * let duration = 1; // Seconds
 * 
 * let signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);
 */
export function generateSignal(amplitudes, frequencies, sampleRate, duration) {
	var x = range(0, duration, 1 / sampleRate);

	var signal = zeros(x.size()[0]);
	for (var i = 0; i < amplitudes.length; i++) {
		signal = add(signal, multiply(amplitudes[i], sin(multiply(2 * Math.PI * frequencies[i], x))));
	}

	return signal.toArray();
}
