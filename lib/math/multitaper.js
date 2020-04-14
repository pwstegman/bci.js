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
    nw: 4,
    k: null,
    method: 'adapt',
    max_iterations: 2,
    _bk: null,
    // Used internally for adaptive multitaper recursion
    _values: false // Used internally for adaptive multitaper recursion

  }, options),
      nw = _Object$assign.nw,
      k = _Object$assign.k,
      method = _Object$assign.method,
      _bk = _Object$assign._bk,
      _values = _Object$assign._values,
      max_iterations = _Object$assign.max_iterations; // Default k (number of tapers)


  if (k === null) {
    k = Math.floor(nw * 2 - 1);
  } // In the event of adaptive (of _bk for the recursive part of adaptive), we'll
  // calculate the psd estimate a different way


  var vectors, values, psds;

  if (method != 'adapt' || _bk) {
    // Compute the DPSSs
    var tapers = (0, _dpss.dpss)(signal.length, nw, k, true);
    vectors = tapers.vectors;
    values = tapers.values; // Compute periodograms

    psds = vectors.map(function (taper) {
      return (0, _periodogram.periodogram)(signal, sample_rate, {
        window: taper
      });
    });
  } // Weighted average estimates


  var weights;

  if (_bk !== null) {
    weights = _bk; // Recursive step of adaptive multitaper
  } else if (method == 'unity') {
    weights = new Array(psds.length).fill(1);
  } else if (method == 'eigen') {
    weights = values;
  } else if (method == 'adapt') {
    // Begin initial estimate with K = 2 tapers and the eigen method
    var mt = multitaper(signal, sample_rate, {
      nw: nw,
      k: 2,
      method: 'eigen',
      _values: true
    });
    var frequencies = mt.frequencies;
    var S = mt.estimates;
    var _values2 = mt.values; // For now, doing 2 iterations

    for (var i = 0; i < max_iterations; i++) {
      var variance = 0;

      for (var _i = 0; _i < S.length; _i++) {
        variance += S[_i];
      }

      variance *= frequencies[1]; // Calculate weights b(k, f), See: Percival and Walden, 1993, p.368

      var bk = [];

      for (var _i2 = 0; _i2 < k; _i2++) {
        var b_weights = [];

        for (var j = 0; j < S.length; j++) {
          b_weights.push(S[j] / (S[j] * _values2[_i2] + (1 - _values2[_i2]) * variance));
        }

        bk.push(b_weights);
      } // Re-estimate spectrum with weights b(k, f)


      mt = multitaper(signal, sample_rate, {
        nw: nw,
        k: k,
        _bk: bk,
        _values: true
      });
      S = mt.estimates;
      _values2 = mt.values;
    }

    return {
      estimates: S,
      frequencies: frequencies
    };
  } else {
    throw new Error('Invalid method');
  }

  var avg = new Array(psds[0].estimates.length).fill(0); // If the weights are applied at the vector level

  if (!Array.isArray(weights[0])) {
    for (var p = 0; p < psds.length; p++) {
      for (var _i3 = 0; _i3 < psds[p].estimates.length; _i3++) {
        avg[_i3] += psds[p].estimates[_i3] * weights[p];
      }
    } // Sum the weights


    var sum_weights = 0;

    for (var _i4 = 0; _i4 < psds.length; _i4++) {
      sum_weights += weights[_i4];
    } // Divide by the sum to get an average


    for (var _i5 = 0; _i5 < avg.length; _i5++) {
      avg[_i5] /= sum_weights;
    }
  } // If the weights are applied at the frequency level (adaptive multitaper)
  else {
      for (var _p = 0; _p < psds.length; _p++) {
        for (var _i6 = 0; _i6 < psds[_p].estimates.length; _i6++) {
          avg[_i6] += psds[_p].estimates[_i6] * weights[_p][_i6];
        }
      } // Sum the weights at each frequency


      var weight_sums = new Array(weights[0].length).fill(0);

      for (var _i7 = 0; _i7 < weights.length; _i7++) {
        for (var _j = 0; _j < weights[0].length; _j++) {
          weight_sums[_j] += weights[_i7][_j];
        }
      } // Divide by the sums to get an average


      for (var _i8 = 0; _i8 < avg.length; _i8++) {
        avg[_i8] /= weight_sums[_i8];
      }
    }

  if (_values == true) {
    return {
      estimates: avg,
      frequencies: psds[0].frequencies,
      values: values
    };
  } // Return PSD


  return {
    estimates: avg,
    frequencies: psds[0].frequencies
  };
}