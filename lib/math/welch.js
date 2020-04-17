"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welch = welch;

var _periodogram = require("./periodogram");

var _windowApply = require("../data/windowApply");

var _nextpow = require("./nextpow2");

/**
 * Welch's method
 * Computes overlapping modified periodograms and averages them together
 * @param {number[]} signal - The input signal
 * @param {number} sample_rate - The sample rate
 * @param {object} options 
 * @param {number} [options.segmentLength=256] - How long each segment should be in samples
 * @param {number} [options.overlapLength=null] - Amount of overlap between segments in samples. Defaults to floor(segmentLength / 2).
 * @param {string|number[]} [options.window='hann'] - Window function to apply, either 'hann', 'rectangular', or an array for a custom window. Default is 'hann'.
 * @param {number} [options.fftSize=Math.pow(2, bci.nextpow2(signal.length))] - Size of the fft to be used. Should be a power of 2.
 * @returns {object} PSD object with keys {estimates: PSD estimates in units of X^2/Hz, frequencies: corresponding frequencies in Hz}
 */
function welch(signal, sample_rate, options) {
  var _Object$assign = Object.assign({
    segmentLength: 256,
    overlapLength: null,
    window: 'hann',
    fftSize: null
  }, options),
      segmentLength = _Object$assign.segmentLength,
      overlapLength = _Object$assign.overlapLength,
      fftSize = _Object$assign.fftSize,
      window = _Object$assign.window;

  if (overlapLength === null) overlapLength = Math.floor(segmentLength / 2);
  if (fftSize === null) fftSize = Math.pow(2, (0, _nextpow.nextpow2)(segmentLength));
  var step = segmentLength - overlapLength;
  if (step <= 0) throw new Error('Invalid overlap, must be less than segmentLength');
  var PSDs = (0, _windowApply.windowApply)(signal, function (epoch) {
    return (0, _periodogram.periodogram)(epoch, sample_rate, {
      fftSize: fftSize,
      window: window
    });
  }, segmentLength, step, false);
  if (PSDs.length == 0) throw new Error('Unable to calculate any PSD estimates');

  if (PSDs.length == 1) {
    console.warn('Not enough data to compute more than one segment, returning single modified periodogram.');
    return PSDs[0];
  } // Compute average PSD


  var num_estimates = PSDs[0].estimates.length;
  var avg = new Array(num_estimates).fill(0);

  for (var p = 0; p < PSDs.length; p++) {
    for (var i = 0; i < num_estimates; i++) {
      avg[i] += PSDs[p].estimates[i];
    }
  }

  for (var _i = 0; _i < num_estimates; _i++) {
    avg[_i] = avg[_i] / PSDs.length;
  }

  return {
    estimates: avg,
    frequencies: PSDs[0].frequencies
  };
}