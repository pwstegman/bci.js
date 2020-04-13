"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multitaper = multitaper;

var _dpss = require("./dpss");

var _periodogram = require("./periodogram");

/**
 * Estimate the power spectral density using the multitaper method
 * @param {number[]} signal - The signal
 * @param {number} sample_rate - The sample rate
 * @param {object} options
 * @param {number} [options.nw=4] - The time-halfbandwidth. Default is 4.
 */
function multitaper(signal, sample_rate, options) {
  var _Object$assign = Object.assign({
    nw: 4
  }, options),
      nw = _Object$assign.nw; // Compute the DPSSs


  var tapers = (0, _dpss.dpss)(signal.length, nw); // Compute periodograms

  var psds = tapers.map(function (taper) {
    return (0, _periodogram.periodogram)(signal, sample_rate, {
      window: taper
    });
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