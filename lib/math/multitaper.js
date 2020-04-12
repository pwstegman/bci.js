"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multitaper = multitaper;

var _dpss = require("./dpss");

var _periodogram = require("./periodogram");

/**
 * Apply a taper to a signal
 * @private
 * @param {number[]} signal - The signal
 * @param {number[]} taper - The taper
 * @returns {numbr[]} - The tapered signal
 */
function applyTaper(signal, taper) {
  if (signal.length != taper.length) throw new Error('Signal and taper must have same length');
  var tapered = [];

  for (var i = 0; i < taper.length; i++) {
    tapered.push(taper[i] * signal[i]);
  }

  return tapered;
}

function multitaper(signal, sample_rate) {
  // Compute the DPSSs
  var tapers = (0, _dpss.dpss)(signal.length); // Apply tapers to signal

  var tapered_signals = tapers.map(function (taper) {
    return applyTaper(signal, taper);
  }); // Compute periodograms

  var psds = tapered_signals.map(function (tapered) {
    return (0, _periodogram.periodogram)(tapered, sample_rate);
  }); // Average estimates

  var avg = new Array(psds[0].estimates.length).fill(0);

  for (var p = 0; p < psds.length; p++) {
    for (var i = 0; i < psds[p].estimates.length; i++) {
      avg[i] += psds[p].estimates[i];
    }
  }

  for (var _i = 0; _i < avg.length; _i++) {
    avg[_i] /= psds.length;
  } // Return PSD


  return {
    estimates: avg,
    frequencies: psds[0].frequencies
  };
}