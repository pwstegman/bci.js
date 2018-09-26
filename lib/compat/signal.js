/**
 * Signal processing operations
 * @deprecated since version 1.1
 * @namespace signal
 * @memberof module:bcijs
 */

const math = require('mathjs/core').create();
math.import(require('mathjs/lib/type/matrix'));
math.import(require('mathjs/lib/type/bignumber'));
math.import(require('mathjs/lib/function/arithmetic'));
math.import(require('mathjs/lib/function/trigonometry'));
math.import(require('mathjs/lib/function/matrix'));

var fft = require('fft.js');

var fftCache = {};

/**
 * Compute the power spectral density of a given signal.
 * @memberof module:bcijs.signal
 * @param {number} size - Size of the fourier transform to be used. Should be a power of 2.
 * @param {number[]} signal - The signal.
 * @returns {number[]} The PSD.
 */
function getPSD(size, signal) {
	if (fftCache.hasOwnProperty(size)) {
		var f = fftCache[size];
	} else {
		var f = new fft(size);
		fftCache[size] = f;
	}

	var freqs = f.createComplexArray();
	f.realTransform(freqs, signal);
	var powers = getPowers(size, freqs);

	return powers;
}

/*
 * Local helper function
 * Return an array containing the magnitude of the first half of complex numbers
 * in the complex Array
 */
function getPowers(size, complexArray) {
	var magnitudes = [];
	for (var i = 0; i < size; i += 2) {
		magnitudes.push(Math.sqrt(complexArray[i] * complexArray[i] + complexArray[i + 1] * complexArray[i + 1]));
	}
	return magnitudes;
}

/*
 * String representation of common frequency bands
 */
var bands = {
	// From Dan Szafir's "Pay Attention!", 2012
	'delta': [1, 3],
	'theta': [4, 7],
	'alpha': [8, 12],
	'beta': [13, 30],
	'gamma': [31, 50]
};

/**
 * Compute the average power across a given frequency band given the PSD.
 * @memberof module:bcijs.signal
 * @param {number} size - Size of the fourier transform used to compute the PSD.
 * @param {number[]} psd - Power spectral density of the signal.
 * @param {number} sampleRate - The sample rate of the signal.
 * @param {(number[]|string)} - The frequency band provided as an array [frequencyStart, frequencyStop] or a
 * string <code>delta</code> (1-3 Hz), <code>theta</code> (4-7 Hz), <code>alpha</code> (8-12 Hz), <code>beta</code> (13-30 Hz), or <code>gamma</code> (31-50 Hz).
 * While string representations
 * allow for easier prototyping, the use of a specific band passed as an array is recommended, as band string representations may change in
 * future updates.
 * @returns {number} The average power in the frequency band.
 */
function getBandPower(size, psd, sampleRate, band) {
	// Allow selecting of a band by name
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

/*
 * Local helper function for debugging
 * Prints a complex array to the console, where the array elements are alternating real and imaginary components.
 * @param {number[]} complexArray - The array to be displayed. Should be of form [real1, imag1, real2, imag2, ..., realn, imagn].
 * @param {number} [precision] - The number of decimal places to be shown. Defaults to 5. 
 */
function displayComplex(complexArray, precision) {
	if (precision === undefined) {
		precision = 5;
	}
	var p = Math.pow(10, precision);

	for (var i = 0; i < complexArray.length; i += 2) {
		console.log(Math.round(complexArray[i] * p) / p + '+' + Math.round(complexArray[i + 1] * p) / p + 'i');
	}
}

/**
 * Create a new EEGWindow object.
 * @memberof module:bcijs.signal
 * @constructor
 * @param {number} size - The number of samples to be stored before callback is called.
 * @param {number} numChannels - The number of channels in each sample.
 * @param {requestCallback} callback - Called when the EEGWindow has a number of samples equal to size.
 * An array of dimensions channels x samples is passed to the callback function.
 */
function EEGWindow(size, numChannels, callback) {
	this.size = size;
	this.length = 0;
	this.callback = callback;
	this.channels = [];
	for (var i = 0; i < numChannels; i++) {
		this.channels.push([]);
	}
}

/**
 * Adds a data sample to the EEGWindow.
 * @param {number[]} - The data sample to be added. Should be of length 'channels'
 */
EEGWindow.prototype.addData = function (data) {
	for (var i = 0; i < data.length; i++) {
		this.channels[i].push(data[i]);
	}
	this.length += 1;
	if (this.length >= this.size) {
		this.callback(this.channels);
		this.clear();
	}
}

/**
 * Reset the EEGWindow and clear all data from it.
 */
EEGWindow.prototype.clear = function () {
	this.length = 0;
	for (var i = 0; i < this.channels.length; i++) {
		this.channels[i] = [];
	}
}

exports.EEGWindow = EEGWindow;

/**
 * Generate a signal.
 * @alias generate
 * @memberof module:bcijs.signal
 * @param {number[]} amplitudes - The amplitudes of each frequency in the signal.
 * @param {number[]} frequencies - The frequencies to be included in the signal.
 * @param {number} sampleRate - The sample rate of the signal in Hz.
 * @param {number} duration - The duration of the signal in seconds.
 * @returns {number[]} The generated signal. Equals the summation of <code>amplitudes[i] * sin(2 * pi * frequencies[i] * t)</code>.
 */
exports.generate = function (amplitudes, frequencies, sampleRate, duration) {
	var x = math.range(0, duration, 1 / sampleRate);

	var signal = math.zeros(x.size()[0]);
	for (var i = 0; i < amplitudes.length; i++) {
		signal = math.add(signal, math.multiply(amplitudes[i], math.sin(math.multiply(2 * Math.PI * frequencies[i], x))));
	}

	return signal.toArray();
}

exports.getPSD = getPSD;
exports.getBandPower = getBandPower;
exports.CSP = require('./csp.js');