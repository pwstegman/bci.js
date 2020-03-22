var fft = require('fft.js');
var nextpow2 = require('./nextpow2.js');

var fftCache = {};

/** 
 * Estimates the power spectral density of a real-valued input signal using the periodogram method and a rectangular window.
 * Output units are based on that of the input signal, of the form X^2/Hz, where X is the units of the input signal.
 * For example, if the input is an EEG signal measured in μV, then this method returns values of μV^2/Hz.
 * 
 * @memberof module:bcijs
 * @param {number[]} signal - The signal.
 * @param {number} sample_rate - sample rate in Hz
 * @param {Object} [options]
 * @param {number} [options.fftSize=Math.pow(2, bci.nextpow2(signal.length))] - Size of the fft to be used. Should be a power of 2.
 * @returns {Object} Object with keys 'estimate' (the psd estimate) and 'frequencies' (the corresponding frequencies)
 */
function periodogram(signal, sample_rate, options) {
	let {fftSize} = Object.assign({
		fftSize: Math.pow(2, nextpow2(signal.length))
	}, options);

	let f;
	if (fftCache.hasOwnProperty(fftSize)) {
		f = fftCache[fftSize];
	} else {
		f = new fft(fftSize);
		fftCache[fftSize] = f;
	}

    // Zero pad signal to fftSize if needed
    let num_samples = signal.length;
	if (num_samples < fftSize) {
		signal = signal.concat(Array(fftSize - signal.length).fill(0));
	}

    // Complex array [real, imag, real, imag, etc.]
    let freqs = f.createComplexArray();
    
    // Fill in complex array with the FFT values
	f.realTransform(freqs, signal);
    f.completeSpectrum(freqs);
    
    // Get the power of each FFT bin value
    let powers = [];
    let scaling_factor = 2 / (sample_rate * num_samples);
	for (var i = 0; i < freqs.length - 1; i += 2) {
        // magnitude is sqrt(real^2 + imag^2)
        let magnitude = Math.sqrt(freqs[i] ** 2 + freqs[i + 1] ** 2);

        // apply scaling
        let power = scaling_factor * magnitude ** 2;

		powers.push(power);
    }

    // Toss values past Nyquist
    powers = powers.slice(0, powers.length / 2 + 1);

    // Don't scale DC or Nyquist by 2
    powers[0] /= 2;
    powers[powers.length - 1] /= 2;
    
    // Compute frequencies
    let frequencies = new Array(powers.length);
    for(let i = 0; i < frequencies.length; i++) {
        frequencies[i] = i * (sample_rate / fftSize);
    }

	return {
        estimate: powers,
        frequencies: frequencies
    };
}

module.exports = periodogram;