"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.periodogram = periodogram;

var _nextpow = require("./nextpow2");

var _fft = _interopRequireDefault(require("fft.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fftCache = {};
/**
 * Apply a Hann window to a signal
 * @private
 */

function hann(signal) {
  var windowed = [];
  var L = signal.length - 1;
  var C = Math.PI / L;
  var scale = 0;

  for (var i = 0; i < signal.length; i++) {
    var w = Math.pow(Math.sin(C * i), 2);
    windowed.push(signal[i] * w);
    scale += Math.pow(w, 2);
  }

  return {
    signal: windowed,
    scale: scale
  };
}
/**
 * Apply a taper to a signal
 * @param {number[]} signal - The signal
 * @param {number[]} taper - The taper
 * @returns {number[]} The tapered signal
 */


function taper(signal, taper) {
  if (signal.length != taper.length) throw new Error('Signal length must match taper length');
  var windowed = [];
  var scale = 0;

  for (var i = 0; i < signal.length; i++) {
    windowed.push(signal[i] * taper[i]);
    scale += Math.pow(taper[i], 2);
  }

  return {
    signal: windowed,
    scale: scale
  };
}
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
 * @param {string|number[]} [options.window='rectangular'] - Window function to apply, either 'hann', 'rectangular', or an array for a custom window. Default is 'rectangular'.
 * @returns {Object} Object with keys 'estimates' (the psd estimates) and 'frequencies' (the corresponding frequencies in Hz)
 */


function periodogram(signal, sample_rate, options) {
  var _Object$assign = Object.assign({
    fftSize: Math.pow(2, (0, _nextpow.nextpow2)(signal.length)),
    window: 'rectangular',
    _scaling: 'psd'
  }, options),
      fftSize = _Object$assign.fftSize,
      window = _Object$assign.window,
      _scaling = _Object$assign._scaling;

  var f;

  if (fftCache.hasOwnProperty(fftSize)) {
    f = fftCache[fftSize];
  } else {
    f = new _fft.default(fftSize);
    fftCache[fftSize] = f;
  } // Validate _scaling


  if (_scaling != 'psd' && _scaling != 'none') {
    throw new Error('Unknown scaling');
  } // Apply window


  var num_samples = signal.length;
  var S = num_samples;

  if (Array.isArray(window)) {
    var t = taper(signal, window);
    signal = t.signal;
    S = t.scale;
  } else if (window == 'hann') {
    var h = hann(signal);
    signal = h.signal;
    S = h.scale;
  } else if (window != 'rectangular') {
    throw new Error('Unknown window type');
  } // Zero pad signal to fftSize if needed


  if (num_samples < fftSize) {
    signal = signal.concat(Array(fftSize - signal.length).fill(0));
  } // Complex array [real, imag, real, imag, etc.]


  var freqs = f.createComplexArray(); // Fill in complex array with the FFT values

  f.realTransform(freqs, signal);
  f.completeSpectrum(freqs); // Get the power of each FFT bin value

  var powers = [];
  var scaling_factor = 2 / (sample_rate * S);
  if (_scaling == 'none') scaling_factor = 1;

  for (var i = 0; i < freqs.length - 1; i += 2) {
    // magnitude is sqrt(real^2 + imag^2)
    var magnitude = Math.sqrt(Math.pow(freqs[i], 2) + Math.pow(freqs[i + 1], 2)); // apply scaling

    var power = scaling_factor * Math.pow(magnitude, 2);
    powers.push(power);
  } // Toss values past Nyquist


  powers = powers.slice(0, powers.length / 2 + 1); // Don't scale DC or Nyquist by 2

  if (_scaling == 'psd') {
    powers[0] /= 2;
    powers[powers.length - 1] /= 2;
  } // Compute frequencies


  var frequencies = new Array(powers.length);

  for (var _i = 0; _i < frequencies.length; _i++) {
    frequencies[_i] = _i * (sample_rate / fftSize);
  }

  return {
    estimates: powers,
    frequencies: frequencies
  };
}